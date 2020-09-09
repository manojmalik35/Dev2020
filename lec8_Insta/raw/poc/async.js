let fs = require("fs");
 
async function fReader(){
    console.log("Before file read");
    let contentPromise = await fs.promises.readFile("f1.txt");
    console.log("After File read started");
    return contentPromise;
}

let content = fReader();
console.log(content);
console.log("After fn call");