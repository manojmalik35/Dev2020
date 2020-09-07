const connection = require("./connection");
const { v4: uuidv4 } = require('uuid');

function create(userObj){
    
    userObj.uid = uuidv4();
    return new Promise(function(resolve, reject){
        var query = connection.query('INSERT INTO user SET ?', userObj, function(err, result) {
            if(err)
                reject(err);
            else
                resolve(userObj);
        });
    })
}

function getById(uid){
    return new Promise(function(resolve, reject){
        connection.query(`select * from user where uid="${uid}"`, function(err, result) {
            if(err)
                reject(err);
            else
                resolve(result[0]);
        });
    })
}

function updateById(uid, updateObj){

}

function deleteById(uid){
    return new Promise(function(resolve, reject){
        var query = connection.query(`delete from user where uid="${uid}"`, function(err, result) {
            if(err)
                reject(err);
            else
                resolve(result);
        });
    })
}


module.exports.create = create;
module.exports.getById = getById;
module.exports.updateById = updateById;
module.exports.deleteById = deleteById;