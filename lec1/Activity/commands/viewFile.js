let fs = require("fs");
let path = require("path");

module.exports.view = function(){
    let src = arguments[0], mode = arguments[1];
    if(mode == "-f")
        flatFile(src);
    else
        treeView(src, "");
}


function checkWhetherFile(path_string){
    return fs.statSync(path_string).isFile();
}

function childReader(path_string){
    let children = fs.readdirSync(path_string);
    return children;
}

function flatFile(src){
    if(checkWhetherFile(src)){
        console.log(src + "*");
    }else{
        console.log(src);
        
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