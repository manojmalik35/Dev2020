let fs = require("fs");
let path = require('path');

function treefy(src, dest, node){
    if(node.isFile){
        let placeOfNewNameFile = path.join(src, node.newName);
        let placeWhereToCreate = path.join(dest, node.oldName);
        fs.writeFileSync(placeWhereToCreate, placeOfNewNameFile);
    }else{

        let dirPath = path.join(dest, node.name);

        if(!fs.existsSync(dirPath))
            fs.mkdirSync(dirPath);

        for(let i = 0; i < node.children.length; i++){
            let childNode = node.children[i];

            treefy(src, dirPath, childNode);
        }
    }
}

let input = process.argv.slice(2);
let src = input[0];
let dest = input[1];

let root = require(path.join(src, "metadata.json"));
treefy(src, dest, root);
console.log("Data copied");
