var express = require('express');
var topic = require('../app/Controller/topic');
var user = require('../app/Controller/user');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/topics',topic.topics);
router.get('/topic/:id',topic.get);

router.post('/topic',topic.post);

router.get('/user',user.user);
//router.get('/user',user.user);
router.get('/new', function (req, res, next) {
  res.render('post',{title:'发起活动'});
});
router.get('/listPage/:type', function (req, res, next) {
  res.render('listPage',{title:req.params.type});
});
router.get('/topicPage/:id', function (req, res, next) {
  res.render('topic',{title:req.params.id});
});

router.post('/join',topic.join);
router.post('/removejoin',topic.removejoin);

module.exports = router;
