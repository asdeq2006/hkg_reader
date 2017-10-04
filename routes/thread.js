var express = require('express');
var router = express.Router();
var thread_content = require('../public/javascripts/thread.js');
var url = require("url");

var display=function (res, thread_content){
  res.render('thread', { thread_content: thread_content });
};

/* GET home page. */
router.get('/', function(req, res, next) {
  var message_id=req.query.message;
  console.log('Started Get.');
  thread_content.get_thread(res, message_id,display);
});

module.exports = router;
