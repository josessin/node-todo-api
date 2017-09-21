var express = require("express");
var bodyParser = require("body-parser");

var {mongoose}=require("./db/mongoose.js");
var {mongoose} = require("./db/mongoose.js");
var {Todo} = require("./models/todo.js");
var {User}=require("./models/user.js");

var app = express();

app.use(bodyParser.json());
//save a todo to the database route
app.post("/todos",(req,res)=>{
    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
})
//get all todos from the database route
app.get("/todos",(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({
            todos
        })
    },(e)=>{
        res.status(400).send(e);
    });
});

app.listen(3000,()=>{
    console.log("Svr started on port 3000");
})

module.exports = {app};