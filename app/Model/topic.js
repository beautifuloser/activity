var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity : 'topic',
    connection : 'mongo',
    schema : true,
    attributes : {
        title : {
            type : 'string',
            required : true
        },
        content : {
            type : 'string',
            required : true
        },
        author : {
            open_id : 'string',
            author_name : 'string',
            avatar_url : 'string'
        },
        tag : {
            type : 'string',
        },
        joined:'array',
        last_reply_at : 'string',
        reply_count :'number',
        hot:'boolean',
        top:'boolean',
        //createTime : 'date',
        join:'array'
    },
    //beforeCreate : function(v,cb){
    //    v.createTime = new Date();
    //    return cb();
    //}
});