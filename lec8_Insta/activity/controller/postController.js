const postModel = require("../model/postModel");

module.exports.createPost = async function createPost(req, res) {
    
    try {
        let postObj = req.body;
        // console.log(user);

        let post = await postModel.create(postObj);
        res.status(201).json({//201 for successful creation
            success: true,
            post : post
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports.getPost = async function getPost(req, res) {
    try {
        // console.log(req.params);
        let { id } = req.params;

        let post = await postModel.getById(id);
        if (post == undefined) {
            return res.status(404).json({
                status: "failure",
                message: "post not found"
            })
        }

        res.status(200).json({
            success: true,
            post : post
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

