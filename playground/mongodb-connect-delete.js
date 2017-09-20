const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, db) => {
    if (error) {
        console.log("Unable to connect to mongoDB server");
        return;
    }

    console.log("Connected to MongoDB server")

    //deleteMany
    // db.collection("Todos").deleteMany({text: "eat lunch"}).then((resut)=>{
    //     console.log(resut);
    // })

    //deleteOne
    // db.collection("Todos").deleteOne({text:"eat lunch"}).then((results)=>{
    //     console.log(results);
    // });

    //findOneAndDelete
    // db.collection("Todos").findOneAndDelete({completed:false}).then((results)=>{
    //     console.log(results);
    // });

    db.collection("Users").deleteMany({ name: "Pedro" });
    db.collection("Users").findOneAndDelete({ _id: new ObjectID("59c1e1a57f0842ecbc160485") 
    }).then((resulst) => {
        console.log(resulst);
    });

    //db.close();
});