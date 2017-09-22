const {SHA256} = require("crypto-js");
const jwt = require("jsonwebtoken");

var data = {
    id: 10
};

var token = jwt.sign(data, "secret321");
console.log(token);

var decoded = jwt.verify(token,"secret321");
console.log("decoded: " + decoded);
//hashing

// var message = "I am user number 3";
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };
// var token ={
//     data: data,
//     hash: SHA256(JSON.stringify(data)+"secretsomething").toString()
// }

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data)+ "secretsomething").toString();

// if(resultHash === token.hash){
//     console.log("data was not changed");
// }else{
//     console.log("data was changed. Do not trust");
// }