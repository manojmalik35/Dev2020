const db = require("./connection");

//follow request sent && from follower UI
const createRequest = function(mappingObj){
    return new Promise(function(resolve, reject){
        db.query("INSERT INTO user_follower SET ?", mappingObj, function(err, result){
            if(err)
                reject(err);
            else
                resolve(mappingObj);
        })
    })
}

//from user UI
const acceptRequestQ = function(uid, follower_id){
    return new Promise(function(resolve, reject){
        db.query(`UPDATE user_follower SET is_pending=0 where uid="${uid}" && follower_id="${follower_id}"`, function(err, result){
            if(err)
                reject(err);
            else
                resolve(result);
        })
    })
}

//from user UI
const rejectRequestQ = function(uid, follower_id){
    return new Promise(function(resolve, reject){
        db.query(`DELETE FROM user_follower where uid="${uid}" && follower_id="${follower_id}" && is_pending=1`, function(err, result){
            if(err)
                reject(err);
            else
                resolve(result);
        })
    })
}

const getAllFollowers = function(uid){
    return new Promise(function(resolve, reject){
        db.query(`SELECT * FROM user_follower where uid="${uid}"`, function(err, result){
            if(err)
                reject(err);
            else
                resolve(result);
        })
    })
}

module.exports.createRequest = createRequest;
module.exports.acceptRequestQ = acceptRequestQ;
module.exports.rejectRequestQ = rejectRequestQ;
module.exports.getAllFollowers = getAllFollowers;