const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");

const { app } = require("./../server");
const { Todo } = require("./../models/todo");
//dummies todos
const todos = [{
    _id: new ObjectID(),
    text: "First test todo"
}, {
    _id: new ObjectID(),
    text: "Second test todo"
}];

//this happens before each test
beforeEach((done) => {
    Todo.remove({}).then(() => {
        //seed database for testing
        Todo.insertMany(todos);
        //then, send the done to mocha
    }).then(() => done()).catch((e) => {
        console.log("Error seeding database", e);
    });
});

describe("POST /todos", () => {
    it("should create a new todo", (done) => {
        var text = "Test todo text";
        //send a request to app
        request(app)
            .post("/todos")
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {

                if (err) {
                    return done(err);
                }
                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));

            })
    })

    it("Should not creaate todo with invalid body data", (done) => {
        //send a request to app
        request(app)
            .post("/todos")
            .send({})
            .expect(400)
            .end((err, res) => {

                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));

            })
    })
})

describe("GET /todos", () => {
    it("should get all todos", (done) => {
        request(app)
            .get("/todos")
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    })
})

describe("GET /todos/:id", () => {
    it("should return todo doc", (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it("should return 404 if todo not found", (done) => {

        var newId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${newId}`)
            .expect(404)
            .end(done);
    });

    it("should return 400 if non-object ids", (done) => {
        var badId = "asfasfa!\"·$";
        request(app)
            .get(`/todos/${badId}`)
            .expect(404)
            .end(done);
    });
});

describe("DELETE /todos/:id", () => {
    it("should remove a todo", (done) => {
        var newId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${newId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(newId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(newId).then((todo) => {
                    expect(todo).toBeNull();

                    done();
                }).catch((e) => done(e));
            })

    });

    it("should return 404 if todo not found", (done) => {

        var newId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${newId}`)
            .expect(404)
            .end(done);
    });

    it("should return 404 if object id is invalid", (done) => {
        var badId = "asfasfa!\"·$";
        request(app)
            .get(`/todos/${badId}`)
            .expect(404)
            .end(done);
    });
});