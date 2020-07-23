let viewFile = require("./commands/viewFile")
let treefyFile = require("./commands/treefy")
let untreefyFile = require("./commands/untreefy")
let helpFile = require("./commands/help")

let input = process.argv.slice(2);
let cmd = input[0];

switch (cmd) {
    case "help":
        helpFile.help();
        break;
    case "treefy":
        treefyFile.treefy(input[1], input[2]);
        break;
    case "untreefy":
        untreefyFile.untreefy(input[1], input[2]);
        break;
    case "view":
        viewFile.view(input[1], input[2]);
        break;
    default:
        console.log("Wrong command");
}
