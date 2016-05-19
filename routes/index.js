var express = require('express');
var post = require('../app/Controller/post');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/posts',post.get);
router.delete('/posts/:id',post.delete);
module.exports = router;
