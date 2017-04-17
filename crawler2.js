var Crawler = require("crawler");
var url = require('url');

var URL_LIST = [
    //"http://www.algonquinsa.com/event",
    "http://www.ottawa2017.ca/events",
    //"https://nac-cna.ca/en/event",
    //"https://www.tdplace.ca/event",
        "http://www.warmuseum.ca/exhibitions",
    //"https://www.ticketmaster.ca",
    "http://www.bandsintown.com",
    "http://www.electrostub.com/events",
    "http://www.historymuseum.ca/exhibitions"
];

var START_URL;
var internalLinks = [];

function suivant(){
  START_URL = URL_LIST.shift();
}

function collectInternalLinks($) {

  var absoluteLinks = $("a[href^='http']");
  var relevent = [];

  absoluteLinks.each(function() {
      var str = $(this).attr('href');
      if (str.indexOf(START_URL) !== -1){
        relevent.push($(this).attr('href'));
      }
  });
  console.log(relevent.length);
  return relevent;
}

var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        } else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log($("title").text());
            internalLinks = collectInternalLinks($);
            var SCHEMA = "script[type='application/ld+json']";
            console.log($(SCHEMA).text());

            // function isArray(ob) {
            //   return ob.constructor === Array;
            // }
            //
            // try {
            // var jsontemp = JSON.parse($(SCHEMA).text());
            //
            // //Vérifier si l'élement DOM est un schema de type "Event"
            // if (isArray(jsontemp)){
            //   //Si l'objet retourné est un Array on vérifie si c'Est un event
            //   if (jsontemp[0]["@type"] == "Event") {
            //     //json.event.push(jsontemp[0]);
            //     console.log(jsontemp[0]);
            //   } else {
            //     console.log("not event");
            //   }
            // } else if(jsontemp["@type"] == "Event"){
            //     json.event.push(jsontemp);
            //     console.log(jsontemp);
            // } else {
            //     console.log("non-compatible");
            //   }
            // } catch(err){
            //   console.log(err);
            // }
        }
        done();
    }
});

for (u in URL_LIST){

suivant();

c.queue(START_URL);

c.queue(internalLinks);

}

// // Queue URLs with custom callbacks & parameters
// c.queue([{
//     uri: 'http://parishackers.org/',
//     jQuery: false,
//
//     // The global callback won't be called
//     callback: function (error, res, done) {
//         if(error){
//             console.log(error);
//         }else{
//             console.log('Grabbed', res.body.length, 'bytes');
//         }
//         done();
//     }
// }]);

// Queue some HTML code directly without grabbing (mostly for tests)
// c.queue([{
//     html: '<p>This is a <strong>test</strong></p>'
// }]);
