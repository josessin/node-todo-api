const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlenght: 1,
        unique: true,
        validate: {
            // validator: (valueTovalidate)=>{
            //     return validator.isEmail(valueTovalidate)
            // },
            validator: validator.isEmail, //same as above
            message: "{VALUE} is not a valid emal.",
            isAsync:false
        }
    },
    password: {
        type: String,
        require: true,
        minLenght: 6
    },
    tokens: [{
        acces: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject,["_id","email"]);
};

UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var acces = "auth";
    var token = jwt.sign({
        _id: user._id.toHexString(),
        acces: acces
    },"abc123");

    user.tokens.push({acces,token});
    return user.save().then(()=>{
        return token;
    });
};

var User = mongoose.model("User", UserSchema);

module.exports = { User };