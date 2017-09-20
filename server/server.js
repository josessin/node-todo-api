var express = require("express");
var bodyParser = require("body-parser");

var {mongoose}=require("./db/mongoose.js");
var {mongoose} = require("./db/mongoose.js");
var {Todo} = require("./models/todo.js");
var {User}=require("./models/user.js");

var app = express();

app.post("/todos",(req,res)=>{

})

app.listen(3000,()=>{
    console.log("Server started on port 3000");
})