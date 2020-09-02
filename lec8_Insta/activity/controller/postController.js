let postDb = require("../model/post.json");

module.exports.createPost = function createPost(req, res) {
    let post = req.body;
    // console.log(post);
    postDb.push(post);

    fs.writeFileSync(path.join(__dirname, "post.json"), JSON.stringify(postDb));
    res.status(201).json({//201 for successful creation
        success: true,
        post : post
    })
}

module.exports.getPost = function getPost(req, res) {
    // console.log(req.params);
    let { id } = req.params;

    let post;
    for (let i = 0; i < postDb.length; i++) {
        if (postDb[i].post_id == id) {
            post = postDb[i];
            break;
        }
    }
    console.log(post);

    if (post == undefined) {
        return res.status(404).json({
            status: "failure",
            message: "post not found"
        })
    }

    res.status(200).json({
        success: true,
        post: post
    })
}

module.exports.updatePost = function updatePost(req, res) {
    // console.log(req.params);
    let { id } = req.params;

    let toUpdate = req.body;
    let post;
    for (let i = 0; i < postDb.length; i++) {
        if (postDb[i].post_id == id) {
            post = postDb[i];
            break;
        }
    }

    if (post == undefined) {
        return res.status(404).json({
            status: "failure",
            message: "post not found"
        })
    }

    for (let key in toUpdate) {
        post[key] = toUpdate[key];
    }

    fs.writeFileSync(path.join(__dirname, "post.json"), JSON.stringify(postDb));

    res.status(200).json({
        success: true,
        message: "post updated",
        post: post
    })
}

module.exports.deletePost = function deletePost(req, res) {
    // console.log(req.params);
    let { id } = req.params;

    let initialLen = postDb.length;
    postDb = postDb.filter(post => {
        return post.post != id;
    })

    if (initialLen == postDb.length) {
        return res.status(404).json({
            status: "failure",
            message: "post not found"
        })
    }

    fs.writeFileSync(path.join(__dirname, "post.json"), JSON.stringify(postDb));
    res.status(200).json({
        success: true,
        message: "post deleted"
    })
}