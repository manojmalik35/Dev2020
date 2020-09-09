const userModel = require("../model/userModel");
const userFollowerModel = require("../model/userFollowerModel");

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
            message: err.message
        })
    }
}

//Read -> GET
module.exports.getUser = async function getUser(req, res) {
    try {
        // console.log(req.params);
        let { id } = req.params;

        let user = await userModel.getById(id);
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
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports.getAllUsers = async function (req, res) {
    try {

        let users = await userModel.getAll();
        if (users.length == 0) {
            return res.status(404).json({
                status: "failure",
                message: "users not found"
            })
        }

        res.status(200).json({
            success: true,
            users: users
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

//Update -> PATCH
module.exports.updateUser = async function updateUser(req, res) {
    try {
        // console.log(req.params);
        let { id } = req.params;

        let toUpdate = req.body;
        await userModel.updateById(id, toUpdate);
        let user = await userModel.getById(id);

        res.status(200).json({
            success: true,
            message: "user updated",
            user: user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "user not updated"
        });;
    }
}

//Delete -> DELETE
module.exports.deleteUser = async function deleteUser(req, res) {
    // console.log(req.params);

    try {
        let { id } = req.params;

        let result = await userModel.deleteById(id);
        res.status(201).json({//201 for successful creation
            success: true,
            result: result
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


//Request
module.exports.handleRequest = async function (req, res) {
    try {

        // check user_id => public, private
        // if(public) isPending -> false
        // if(private) isPending -> true

        let reqObj = req.body;
        let { is_public } = await userModel.getById(reqObj.uid);
        if (is_public) reqObj.is_pending = false;
        else reqObj.is_pending = true;

        let mappingObj = await userFollowerModel.createRequest(reqObj);
        if (mappingObj.is_pending == false) {
            res.status(201).json({
                status: "accepted",
                message: "Your request has been accepted."
            })
        } else {
            res.status(201).json({
                status: "pending",
                message: "Your request is pending."
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports.acceptRequest = async function (req, res) {
    try {

        let { uid, follower_id } = req.params;
        await userFollowerModel.acceptRequestQ(uid, follower_id);
        let { username } = await userModel.getById(follower_id);
        res.status(201).json({
            success: true,
            message: `${username} started following you.`
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports.rejectRequest = async function (req, res) {
    try {

        let { uid, follower_id } = req.params;
        await userFollowerModel.rejectRequestQ(uid, follower_id);
        let { username } = await userModel.getById(follower_id);
        res.status(201).json({
            success: true,
            message: `${username} rejected.`
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports.getAllFollowers = async function (req, res) {
    try {

        let { uid } = req.params;
        let follIdArr = await userFollowerModel.getAllFollowers(uid);
        if (follIdArr.length == 0) {
            return res.status(201).json({
                success: true,
                message: "No followers found."
            })
        }

        async function helper(follObj){
            let { follower_id, is_pending } = follObj;
            let { username, p_img_url } = await userModel.getById(follower_id);
            return { username, p_img_url, is_pending };
        }

        let followersPromiseArr = follIdArr.map(helper);
        let followersArr = await Promise.all(followersPromiseArr);
        res.status(201).json({
            success: true,
            followers: followersArr
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}