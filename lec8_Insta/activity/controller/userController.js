let userDb = require("../model/user.json");

module.exports.createUser = function createUser(req, res) {
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
module.exports.getUser = function getUser(req, res) {
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
module.exports.updateUser = function updateUser(req, res) {
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
module.exports.deleteUser = function deleteUser(req, res) {
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