let fs = require("fs");

function promiseMaker(path){
    return new Promise(function(resolve, reject){
        fs.readFile(path, function(err, data){
            if(err){
                reject(err);
            }else
                resolve(data);
        })
    })
}

let frPromise = promiseMaker("f1.txt");
console.log(frPromise); 
frPromise.then(function(data){
    console.log("Inside then")
    console.log(data + "");
})

frPromise.catch(function(err){
    console.log("Inside catch");
    console.log(err.message);
})

console.log("Move to next work")