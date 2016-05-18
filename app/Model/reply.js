var waterline = require('waterline');

module.exports = waterline.Collection.extend({
    identity : 'reply',
    connection : 'mongo',
    schema : true,
    attributes : {
        post:'string',
        fromUser : 'string',
        toUser : 'string',
        content : 'string'
    }
});