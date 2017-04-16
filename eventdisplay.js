//var cheerio = require('cheerio');
//var $ = cheerio.load(body);
var elist = liste.event;

for (e in elist){
  var html = "<div>"+elist[e]['name']+"</div>";
  $('#res').append(html);
}
