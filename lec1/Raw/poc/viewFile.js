let fs = require("fs");
let path = require("path")

function checkWhetherFile(path_string){
    return fs.statSync(path_string).isFile();
}

function childReader(path_string){
    let children = fs.readdirSync(path_string);
    return children;
}

function flatFile(src){
    if(checkWhetherFile(src)){
        let arr = src.split("/").slice(7);
        console.log(arr.join("/") + "*");
    }else{
        let arr = src.split("/").slice(7);
        console.log(arr.join("/"));
        
        let children = childReader(src);
        for(let i = 0; i < children.length; i++){
            let childPath = path.join(src, children[i]);
            flatFile(childPath);
        }
    }
}

function treeView(src, indent){
    if(checkWhetherFile(src)){
        console.log(indent + path.basename(src) + "*");
    }else{
        let myName = path.basename(src);
        console.log(indent + myName);
        
        let children = childReader(src);
        for(let i = 0; i < children.length; i++){
            let childPath = path.join(src, children[i]);
            treeView(childPath, indent + "   ");
        }
    }
}

let input = process.argv.slice(2);
let src = input[0];

flatFile(src);
treeView(src,"");