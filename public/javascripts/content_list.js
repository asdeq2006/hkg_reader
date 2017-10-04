var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");



//var url = "http://www.wunderground.com/weather-forecast/zmw:00000.1.59358";
var content_list={
  id:[],
  author:[],
  title:[],
  messageID:[],
  totalpage:null,
  get_title: function (res, page, callback){
    var url = "http://forum.hkgolden.com/topics.aspx?type=BW&page="+page;
    request(url, function (error, response, body) {
      if (!error) {
        // 用 cheerio 解析 html 資料
        var $ = cheerio.load(body);
        // 篩選有興趣的資料
        for(var i=1;i<=30;i++){
        //  if($('#Thread_No'+i > "span").attr('class')!=null){
        //    var title = $("#Thread_No" + i).children("td").eq(1).children("a").eq(0).html();
        //  }
          var title = $("#Thread_No" + i).children("td").eq(1).children("a").eq(0).html();
          var author = $("#Thread_No" + i).attr("username");
          var message=$("#Thread_No" + i).children("td").eq(1).children("a").attr("href");
          if(message!=null){
            var messageNum=message.split("=");
            //message=deCFEmail(message);
          }else{
            var messageNum="";
          }
          //console.log("No." + i + " Title: " + title + "Author: " + author);
          content_list.id[i-1]=i;
          content_list.author[i-1]=author;
          content_list.title[i-1]=title;
          content_list.messageID[i-1]=messageNum[2];
        }
        callback(res, content_list, page);

      } else {
        console.log("擷取錯誤：" + error);
      }
    });
  }
}
module.exports=content_list;
