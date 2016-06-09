var waterline = require('waterline');

module.exports = waterline.Collection.extend({
    identity : 'reply',
    connection : 'mongo',
    schema : true,
    attributes : {
        content: 'string' ,
        topic_id:   'string' ,
        author_id:   'string'  ,
        reply_id:   'string'  ,
        create_at:  'string'
    }
});