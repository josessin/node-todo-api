const {ObjectID} = require("mongodb");

const {mongoose}=require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");

var id ="59c3390e59cdd32264559016";

if(!ObjectID.isValid(id)){
    console.log("Id not valid");
    return;
}
//query by id (no need to cenvert id into new Object(id))
Todo.find({
    _id: id
}).then((todos)=>{
    console.log("Todos",todos);
});

//find one (better if we are looking for only one)
Todo.findOne({
    _id: id
}).then((todo)=>{
    console.log("Todo",todo);
});

Todo.findById(id).then((todo)=>{
    if(!todo){
        return console.log("ID not found");
    }
    console.log("Todo By ID",todo);
}).catch((e)=> console.log(e));

