const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

let userDb = require("./user.json");


const userRouter = new express.Router();
const postRouter = new express.Router();
// REST API
// CRUD - create, read, update, delete
// HTTP request methods ->

app.use(function (req, res, next) {
    console.log("First middleware");
    console.log("Line no 15 " + req.body);
    req.user = "fsafasdfasdfasdf";
    next();
})

app.use(express.json());


app.use(function (req, res, next) {
    console.log("Second middleware");
    console.log("Line no 24 ");
    console.log(req.body);  
    console.log(req.user);
    let keys = Object.keys(req.body);
    if(keys.length == 0){
        res.status(400).json({
            status : "failure",
            message : "you should provide some data to signup"
        })
    }else
        next();
})

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
userRouter.post("/", createUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

postRouter.post("/", createPost); 
postRouter.route("/:id").get(getPost).patch(updatePost).delete(deletePost);

//Create -> POST
function createUser(req, res) {
    let user = req.body;
    // console.log(user);
    userDb.push(user);

    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDb));
    res.status(201).json({//201 for successful creation
        success: true,
        user: user
    })
}

//Read -> GET
function getUser(req, res) {
    // console.log(req.params);
    let { id } = req.params;

    let user;
    for (let i = 0; i < userDb.length; i++) {
        if (userDb[i].user_id == id) {
            user = userDb[i];
            break;
        }
    }
    console.log(user);

    if (user == undefined) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }

    res.status(200).json({
        success: true,
        user: user
    })
}

//Update -> PATCH
function updateUser(req, res) {
    // console.log(req.params);
    let { id } = req.params;

    let toUpdate = req.body;
    let user;
    for (let i = 0; i < userDb.length; i++) {
        if (userDb[i].user_id == id) {
            user = userDb[i];
            break;
        }
    }

    if (user == undefined) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }

    for (let key in toUpdate) {
        user[key] = toUpdate[key];
    }

    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDb));

    res.status(200).json({
        success: true,
        message: "user updated",
        user: user
    })
}

//Delete -> DELETE
function deleteUser(req, res) {
    // console.log(req.params);
    let { id } = req.params;

    let initialLen = userDb.length;
    userDb = userDb.filter(user => {
        return user.user_id != id;
    })

    if (initialLen == userDb.length) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }

    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDb));
    res.status(200).json({
        success: true,
        message: "user deleted"
    })
}

//=========================POST=============================

function createPost(req, res) {
    let user = req.body;
    // console.log(user);
    userDb.push(user);

    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDb));
    res.status(201).json({//201 for successful creation
        success: true,
        user: user
    })
}

function getPost(req, res) {
    // console.log(req.params);
    let { id } = req.params;

    let user;
    for (let i = 0; i < userDb.length; i++) {
        if (userDb[i].user_id == id) {
            user = userDb[i];
            break;
        }
    }
    console.log(user);

    if (user == undefined) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }

    res.status(200).json({
        success: true,
        user: user
    })
}

function updatePost(req, res) {
    // console.log(req.params);
    let { id } = req.params;

    let toUpdate = req.body;
    let user;
    for (let i = 0; i < userDb.length; i++) {
        if (userDb[i].user_id == id) {
            user = userDb[i];
            break;
        }
    }

    if (user == undefined) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }

    for (let key in toUpdate) {
        user[key] = toUpdate[key];
    }

    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDb));

    res.status(200).json({
        success: true,
        message: "user updated",
        user: user
    })
}

function deletePost(req, res) {
    // console.log(req.params);
    let { id } = req.params;

    let initialLen = userDb.length;
    userDb = userDb.filter(user => {
        return user.user_id != id;
    })

    if (initialLen == userDb.length) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }

    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDb));
    res.status(200).json({
        success: true,
        message: "user deleted"
    })
}

app.listen(3000, function () {
    console.log("Server is listening at port 3000.");
})