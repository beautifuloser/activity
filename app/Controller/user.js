module.exports = {
    user : function (req, res, next) {
        var ret = {};
        ret.user = {
            "_id": {
                "$oid": "57578825254b6cc54a154492"
            },
            "openid": "oLRLgvlz8TBFGD6FvzKBxn9mNn_I",
            "nickname": "kev",
            "sex": "1",
            "city": "",
            "province": "Shanghai",
            "country": "CN",
            "headimgurl": "http://wx.qlogo.cn/mmopen/7JYu0VpqZgD1OrcKcw2aD8uNGiaNNzQYOrFlxsUoEt3yYEnvgj6h3qT239dnwT8517hs4es0LI4ytAGFpUQNwdLf96vKNRv8v/132",
            "createdAt": {
                "$date": "2016-06-08T02:51:17.515Z"
            },
            "updatedAt": {
                "$date": "2016-06-08T02:51:17.515Z"
            }
        };
        ret.retvalue = true;
        console.log(JSON.stringify(ret));
        res.end(JSON.stringify(ret));
    }
}