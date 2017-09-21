var express = require("express");
var bodyParser = require("body-parser");
var { ObjectID } = require("mongodb");

var { mongoose } = require("./db/mongoose.js");
var { mongoose } = require("./db/mongoose.js");
var { Todo } = require("./models/todo.js");
var { User } = require("./models/user.js");

var app = express();

app.use(bodyParser.json());
//save a todo to the database route
app.post("/todos", (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
})
//get all todos from the database route
app.get("/todos", (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

//get a todo by id route
app.get("/todos/:id", (req, res) => {
    //acces de :id throguh the req
    var id = req.params.id;
    //validate id
    if (!ObjectID.isValid(id)) {
        console.log("GET /todos/:id: Requested id is invalid");
        res.status(404).send();
        return;
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            console.log("GET /todos/:id: No object with the given id");
            res.status(404).send();
            return;
        }

        res.send({todo});

    }).catch((e) => {
        console.log(e);
        res.status(400).send();
    })

});

app.listen(3000, () => {
    console.log("Svr started on port 3000");
})



module.exports = { app };