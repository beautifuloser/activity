module.exports = {
    get : function (req, res, next) {
        var topicID = req.params.id;
        req.models.topic.findOne({where:{id:topicID}}).exec(function (err, topic) {
            var ret = {};
            if (!err){
                ret.retvalue = true;
                ret.topic = topic;
            }else{
                ret.retvalue = false;
            }
            res.end(JSON.stringify(ret));
        });
    },
    put : function (req, res, next) {

    },
    delete : function (req, res, next) {

    },
    post : function (req, res, next) {
        var openid = req.body.openid.replace(/\\/g,"")+"";
        var ret = {}
        var topicObj = {
            title:req.body.title,
            content:req.body.content,
            author_openid :req.body.openid
        }
        req.models.user.findOne({openid:req.body.openid}).exec(function (err, user) {
            if (!err){
                console.log(JSON.stringify(user)+"================find user");
                //var saveUser = {
                //    openid:user.openid,//用户唯一标识
                //    nickname: user.nickname,
                //    headimgurl:user.headimgurl
                //}
                topicObj.author = JSON.stringify(user);
                console.log(JSON.stringify(topicObj)+"=======topicobj")
                req.models.topic.create(topicObj).exec(function (err, topic) {
                    if (!err){
                        ret.retvalue = true;
                        ret.topic = topic;
                    }else{
                        ret.retvalue = false;
                        ret.topic = err;
                    }
                    res.end(JSON.stringify(ret));
                });
            }
        });
    },
    topics: function (req, res, next) {
        var type = req.query.type;
        switch(type)
        {
            case 'all':
                req.models.topic.find().exec(function (err, topics) {
                    var ret = {};
                    if (!err){
                        ret.retvalue = true;
                        ret.topics = JSON.stringify(topics);
                        res.end(JSON.stringify(ret));
                    }else{
                        ret.retvalue = false;
                        res.end(JSON.stringify(ret));
                    }
                });
                break;
            case 'hot':
                req.models.topic.find().where({hot:true}).exec(function (err, topics) {
                    var ret = {};
                    if (!err){
                        ret.retvalue = true;
                        ret.topics = JSON.stringify(topics);
                    }else{
                        ret.retvalue = false;
                    }
                    res.end(JSON.stringify(ret));
                });
                break;
            case 'my':
                req.models.topic.find().where({author_openid:req.session.user.openid}).exec(function (err, topics) {
                    console.log(JSON.stringify(topics));
                    var ret ={};
                    if (!err){
                        ret.retvalue = true;
                        ret.topics = JSON.stringify(topics);
                    }else {
                        ret.retvalue = false;
                    }
                    res.end(JSON.stringify(ret));
                });
                break;
            case 'join':
                console.log("join");
                break;
        }
    },
    join : function (req, res, next) {
        var topicID = req.body.topicID;
        var ret = {};
        var joinObj = {};
        req.models.join.update({topicID:topicID},joinObj, function (err,result) {
            if (!err){
                ret.retvalue = true;

            }else{
                ret.retvalue = false;
            }
        });
        //var
        res.end(JSON.stringify(ret));
    },
    removejoin : function (req, res, next) {

    }
}