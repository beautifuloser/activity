var express = require('express');
var topic = require('../app/Controller/topic');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/topic',topic.get);
router.delete('/topic/:id',topic.delete);
module.exports = router;
