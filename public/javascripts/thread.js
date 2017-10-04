var request = require("request");
var cheerio = require("cheerio");
var cheerio2=require("cheerio");
var fs = require("fs");

function handle_icon(content_html){
  var icon=cheerio2.load(content_html);
  var img=[];
  icon('img').each(function(i, elememt){
    var img_src=icon(this).attr('src');
    if(img_src.startsWith("/faces/")==true){
      new_src="http://forum.hkgolden.com"+img_src;
      icon(this).attr("src", new_src);
    }
  });
  return icon.html();
};

//var url = "http://www.wunderground.com/weather-forecast/zmw:00000.1.59358";
var thread_content={
  body:[],
  id:[],
  author:[],
  comment:[],
  title:[],
  get_thread: function (res,message_id, callback){
    var headers = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0'
      };
    var url = "http://forum.hkgolden.com/view.aspx?type=BW&message="+message_id;
    request({url:url, headers:headers}, function (error, response, body) {
      if (!error) {

        // 用 cheerio 解析 html 資料
        var $ = cheerio.load(body);
        thread_content.body=body;
        thread_content.title=$("meta[name='title']").attr('content');
        // 篩選有興趣的資料
        for(var i=0;i<=30;i++){
          var raw_comment = $(".ContentGrid").eq(i).html();
          if (raw_comment!=null){
            var comment=handle_icon(raw_comment);
          }else{
            var comment=raw_comment;
          }
          var author=$(".repliers").eq(i).children("tr").attr('username');
          //console.log("No." + i + " Title: " + title + "Author: " + author);
          thread_content.id[i]=i+1;
          thread_content.author[i]=author;
          thread_content.comment[i]=comment;
        }
        thread_content.author[0]=$("meta[name='author']").attr('content');
        callback(res, thread_content);

      } else {
        console.log("擷取錯誤：" + error);
      }
    });
  }
}
module.exports=thread_content;
