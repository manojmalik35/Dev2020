let fs = require("fs");

console.log("Before")
fs.readFile("f1.txt", function(err, data){

    console.log(data + " ");
    console.log("Finally finished")
})

console.log("Move to next work")