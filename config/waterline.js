var Waterline = require('waterline');
var mongoAdapt = require('sails-mongo');
var config = require('./config');
var post = require('../app/Model/post');
var tag = require('../app/Model/tag');
var reply = require('../app/Model/reply');
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

orm.loadCollection(tag);
orm.loadCollection(post);
orm.loadCollection(reply);
exports.orm = orm;
exports.config = wlconfig;