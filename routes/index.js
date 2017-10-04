var express = require('express');
var router = express.Router();
var content_list = require('../public/javascripts/content_list.js');
var url = require("url");

var display=function (res, content_list, page){
  res.render('index', { content_list: content_list, pages: parseInt(page) });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.query.page){
    var page="1";
  }
  else{
    var page=req.query.page;
  }
  content_list.get_title(res, page, display);

});

module.exports = router;
