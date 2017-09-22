const {ObjectID} = require("mongodb");

const {mongoose}=require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");

//removes all (the objects are not returned)

//romve one

//Todo.findOneAndRemove({_id:"59c46d897ca3a010568e2dbb"}).then...;
Todo.findByIdAndRemove("59c46d897ca3a010568e2dbb").then((todo)=>{
    console.log(todo);
})

// Todo.remove({}).then((result)=>{
//     console.log(result); 
//  });
 