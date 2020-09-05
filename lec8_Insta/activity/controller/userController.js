let userModel = require("../model/userModel");

module.exports.createUser = async function createUser(req, res) {
    try {
        let userObj = req.body;
        // console.log(user);

        let user = await userModel.create(userObj);
        res.status(201).json({//201 for successful creation
            success: true,
            user: user
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message : err.message
        })
    }
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
module.exports.deleteUser = async function deleteUser(req, res) {
    // console.log(req.params);
    
    try {
        let { id } = req.params;

        let result = await userModel.deleteById(id);
        res.status(201).json({//201 for successful creation
            success: true,
            result : result
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message : err.message
        })
    }
}