var Waterline = require('waterline');
var mongoAdapt = require('sails-mongo');
var config = require('./config');
var post = require('../app/Model/post');
var tags = require('../app/Model/tags');
var orm = new Waterline();
var wlconfig = {
    adapters:{
        default:mongoAdapt,
        mongo:mongoAdapt
    },
    connections:{
        'mongo':{
            adapter:'mongo',
            url:config.mongoURI
        }
    }
}

orm.loadCollection(tags);
orm.loadCollection(post);
exports.orm = orm;
exports.config = wlconfig;