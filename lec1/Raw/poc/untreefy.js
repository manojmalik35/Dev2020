let fs = require("fs");
let path = require("path")
let uniqid = require("uniqid")

function checkWhetherFile(path_string){
    return fs.statSync(path_string).isFile();
}

function childReader(path_string){
    let children = fs.readdirSync(path_string);
    return children;
}

function untreefy(src,dest,obj){
    if(checkWhetherFile(src)){
        let newName = uniqid();
        let oldName = path.basename(src);

        fs.copyFileSync(src, path.join(dest,newName));
        obj.isFile = true;
        obj.oldName = oldName;
        obj.newName = newName;
    }else{
        
        obj.name = path.basename(src);
        obj.isFile = false;
        obj.children = [];

        let children = childReader(src);
        for(let i = 0; i < children.length; i++){
            let chobj = {};
            let childPath = path.join(src, children[i]);
            untreefy(childPath, dest, chobj);
            obj.children.push(chobj);
        }
    }
}

let input = process.argv.slice(2);
let src = input[0];
let dest = input[1];

let root = {};
untreefy(src, dest, root);

fs.writeFileSync(path.join(dest,"metadata.json"), JSON.stringify(root));
console.log("Data copied");
