var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity : 'post',
    connection : 'mongo',
    schema : true,
    attributes : {
        title : {
            type : 'string',
            required : true
        },
        auther : {
            type : 'string',
            required : true
        },
        tag : {
            type : 'string',
            required : true
        },
        content : {
            type : 'string',
            required : 'true'
        },
        isHot:'boolean',
        isTop:'boolean',
        createTime : 'date',
        lastModifyTime : 'date'
    },
    beforeCreate : function(v,cb){
        v.createTime = new Date();
        return cb();
    }
});