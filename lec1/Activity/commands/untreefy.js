let fs = require("fs");
let path = require("path")
let uniqid = require("uniqid")

module.exports.untreefy = function () {
    let src = arguments[0], dest = arguments[1];
    let root = {};
    untreefy_Logic(src, dest, root);

    fs.writeFileSync(path.join(dest, "metadata.json"), JSON.stringify(root));
    console.log("Data copied");
}

function checkWhetherFile(path_string) {
    return fs.statSync(path_string).isFile();
}

function childReader(path_string) {
    let children = fs.readdirSync(path_string);
    return children;
}

function untreefy_Logic(src, dest, obj) {
    if (checkWhetherFile(src)) {
        let newName = uniqid();
        let oldName = path.basename(src);

        fs.copyFileSync(src, path.join(dest, newName));
        obj.isFile = true;
        obj.oldName = oldName;
        obj.newName = newName;
    } else {

        obj.name = path.basename(src);
        obj.isFile = false;
        obj.children = [];

        let children = childReader(src);
        for (let i = 0; i < children.length; i++) {
            let chobj = {};
            let childPath = path.join(src, children[i]);
            untreefy_Logic(childPath, dest, chobj);
            obj.children.push(chobj);
        }
    }
}




