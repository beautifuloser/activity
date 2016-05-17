var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity : 'tags',
    connection : 'mongo',
    schema : true,
    attributes : {
        tag : 'string'
    }
});