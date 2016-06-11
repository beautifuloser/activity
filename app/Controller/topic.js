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
        var topicObj = {
            title:req.body.title,
            content:req.body.content
        }
        req.models.topic.create(topicObj).exec(function (err, result) {
            var ret = {}
            if (!err){
                ret.retvalue = true;
            }else{
                ret.retvalue = false;
            }
            res.end(JSON.stringify(ret));
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
                    }else{
                        ret.retvalue = false;
                    }
                    res.end(JSON.stringify(ret));
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
                break;
            case 'join':
                console.log("join");
                break;
        }
    }
}