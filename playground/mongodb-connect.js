//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (error,db)=>{
    if(error){
        console.log("Unable to connect to mongoDB server");
        return;
    }

    console.log("Connected to MongoDB server")

    // db.collection("Todos").insertOne({
    //     text: "Something to do",
    //     completed: false
    // },(err,res)=>{
    //     if(err){
    //         return console.log("Unable to insert todo ", err);
    //     }

    //     console.log(JSON.stringify(res.ops,undefined,2));
    // })

    // db.collection("Users").insertOne({
    //     name: "Jose",
    //     age: 31,
    //     location: "Mendoza"
    // },(err,res)=>{
    //     if(err){
    //         return console.log("Unable to insert user",err);
    //     }

    //     console.log(res.ops);
    // })

    db.close();
});