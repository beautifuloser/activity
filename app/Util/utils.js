var request = require('request');
var config = require('../config/config');
module.exports = {
    "userInfo": function (req,res,next) {
        if (req.query.code !== undefined){
            //url中code不为空
            var code = req.query.code;

        }
        next();
    }
}

var getAccess_token = function (code) {
    return new Promise(function (resolve,reject) {
        request.p
    });
}