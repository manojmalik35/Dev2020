let fs = require("fs");

console.log("start")
//promise based function
let frPromise = fs.promises.readFile("f1.txt","utf-8");//file read promise
    
console.log(frPromise); 
frPromise.then(function(data){
    console.log("Inside then")
    console.log(data);
})

frPromise.catch(function(err){
    console.log("Inside catch");
    console.log(err.message);
})

console.log("Move to next work")