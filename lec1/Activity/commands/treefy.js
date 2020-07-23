let fs = require("fs");
let path = require('path');

module.exports.treefy = function () {
    let src = arguments[0], dest = arguments[1];
    let root = require(path.join(src, "metadata.json"));
    treefy_Logic(src, dest, root);
    console.log("Data copied");
}

function treefy_Logic(src, dest, node) {
    if (node.isFile) {
        let placeOfNewNameFile = path.join(src, node.newName);
        let placeWhereToCreate = path.join(dest, node.oldName);
        fs.writeFileSync(placeWhereToCreate, placeOfNewNameFile);
    } else {

        let dirPath = path.join(dest, node.name);

        if (!fs.existsSync(dirPath))
            fs.mkdirSync(dirPath);

        for (let i = 0; i < node.children.length; i++) {
            let childNode = node.children[i];

            treefy_Logic(src, dirPath, childNode);
        }
    }
}


