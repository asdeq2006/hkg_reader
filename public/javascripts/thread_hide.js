var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");
var Nightmare= require('nightmare');
var nightmare = Nightmare({
    show: false,
    pollInterval: 50
});


//var url = "http://www.wunderground.com/weather-forecast/zmw:00000.1.59358";
var thread_content={
  get_thread: function (res,message_id, callback){
    var url = "http://forum.hkgolden.com/view.aspx?type=BW&message="+message_id;
    var body=[];
    console.log(message_id);
    nightmare
      .goto(url)
      .wait('body')
      .evaluate(function(data){
        data=document.querySelector('body').innerHTML;
        return data;
      },body)
      .then(function(body){
        var hkgcontent={
          id:[],
          author:[],
          content:[]
        };
        var $ = cheerio.load(body);
        for(var i=0;i<=30;i++){
          var content = $(".ContentGrid").eq(i).html();
          var author = $("table.repliers").eq(i).children("tr").attr("username");
          hkgcontent.id[i]=i;
          hkgcontent.author[i]=author;
          hkgcontent.content[i]=content;
        }
        callback(res, hkgcontent);
      })
      .catch(function(error){
        console.error('Search failed:',error);
      });
  }
}
module.exports=thread_content;
