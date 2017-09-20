const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (error,db)=>{
    if(error){
        console.log("Unable to connect to mongoDB server");
        return;
    }

    console.log("Connected to MongoDB server")

    // db.collection("Todos").find({
    //     _id: new ObjectID("59c1d0de6e0b920ce0c64d31")
    // }).toArray().then((docs)=>{
    //     console.log("Todos");
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log("Unable to fetch Todos", err);
    // });

    
    // db.collection("Todos").find().count().then((count)=>{
    //     console.log("Todos count: " + count);
    // },(err)=>{
    //     console.log("Unable to fetch Todos", err);
    // });

    db.collection("Users").find({name: "Pedro"}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{

    });

    //db.close();
});