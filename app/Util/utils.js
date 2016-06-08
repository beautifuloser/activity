var request = require('request');
var config = require('../../config/config');
module.exports = {
    "userInfo": function (req,res,next) {
        console.log("调用userinfo");
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
            var oauth2Obj = JSON.parse(body);
            var userinfoUrl = "https://api.weixin.qq.com/sns/userinfo?access_token="+oauth2Obj.access_token+"&openid="+oauth2Obj.openid;
            request(userinfoUrl, function (err, response, body) {
                if (!err&&response.statusCode == 200){
                    var userInfoObj = JSON.parse(body);
                    //转换头像url
                    userInfoObj.headimgurl = userInfoObj.headimgurl.slice(0,userInfoObj.headimgurl.length-1)+config.headImgSize;
                    req.models.user.find()
                        .where({openid:userInfoObj.openid}).exec(function (err, user) {
                        //用户在数据库中存在
                        if (!err){
                            if (!req.session.user){
                                //把用户信息放入session中
                                req.session.user = userInfoObj;
                            }
                            if (user){
                                //如果用户已经存在,更新用户信息

                                req.models.user.update({openid:userInfoObj.openid},userInfoObj, function (err,result) {
                                    if (!err){
                                        console.log("更新成功!"+userInfoObj.openid);
                                    }else{
                                        console.log("更新失败!"+userInfoObj.openid);
                                    }
                                })
                            }else{
                                //用户不存在,创建新用户
                                req.models.user.create(userInfoObj, function (err, user) {
                                    if (!err){
                                        console.log("用户:"+user.nickname+"保存成功!");
                                    }else{
                                        console.log("用户信息保存失败:"+err);
                                    }
                                });
                            }
                        }else{
                            console.log("query error! openid="+userInfoObj.openid);
                        }
                    });
                }
            });
        }
    });
}