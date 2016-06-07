var request = require('request');
var config = require('../../config/config');
module.exports = {
    "userInfo": function (req,res,next) {
        if (req.query.code !== undefined){
            //url中code不为空
            var code = req.query.code;
            getAccess_token(req,res,code);
        }
        next();
    }
}
/**
 * 利用redirect_url中code获取用户信息的方法
 * 本来想写成promise方法,最后不知道为什么又写成了callback...
 *
 * */
var getAccess_token = function (req,res,code) {
    var oauth2Url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid="+config.appid+"&secret="+config.appSecret+"&code="+code+"&grant_type=authorization_code";
    request(oauth2Url, function (err, response, body) {
        if(!err && response.statusCode==200){
            console.log(body);
            var oauth2Obj = JSON.parse(body);
            var userinfoUrl = "https://api.weixin.qq.com/sns/userinfo?access_token="+oauth2Obj.access_token+"&openid="+oauth2Obj.openid;
            request(userinfoUrl, function (err, response, body) {
                if (!err&&response.statusCode == 200){
                    var userInfoObj = JSON.parse(body);
                    req.models.user.create(userInfoObj, function (err, user) {
                        if (!err){
                            console.log("用户:"+user.nickname+"保存成功!");
                        }else{
                            console.log("用户信息保存失败:"+err);
                        }
                    });
                }
            });
        }
    });
}