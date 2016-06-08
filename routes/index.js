var express = require('express');
var topic = require('../app/Controller/topic');
var user = require('../app/Controller/user');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/topic',topic.get);
router.delete('/topic/:id',topic.delete);
router.get('/user',user.user);
//router.get('/user',user.user);
module.exports = router;
