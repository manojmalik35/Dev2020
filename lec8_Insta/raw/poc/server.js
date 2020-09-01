const express = require("express");
const app = express();
// public folder that can be used by any client
app.use(express.static("public"));


app.listen(3000, function(){
    console.log("Server started at port 3000");
});