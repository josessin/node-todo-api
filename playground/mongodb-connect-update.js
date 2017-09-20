const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, db) => {
    if (error) {
        console.log("Unable to connect to mongoDB server");
        return;
    }

    console.log("Connected to MongoDB server")

    // db.collection("Todos").findOneAndUpdate({
    //     _id: new ObjectID("59c1e0157f0842ecbc160400")
    // },{
    //     $set:{
    //         completed:true
    //     }
    // },{
    //     returnOriginal: false
    // }).then((resul)=>{
    //     console.log(resul);
    // })

    db.collection("Users").findOneAndUpdate({
        _id: new ObjectID("59c1d24e34cf902f20edf366")
    },
        {
            $set: {
                name: "Pablo"
            },
            $inc: {
                age: 1
            }
        }, {
            returnOriginal: false
        }).then((resul) => {
            console.log(resul);
        })

    //db.close();
});