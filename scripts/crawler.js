var express = require('express');
var path = require('path');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var app = express();

/* 1-Le crawler cherche pour un terme dans le code html.
  2- Cheche pour tous les liens href et les insèrent dans pagesToVisit
  3- Visite tous les liens et cherche pour le terme
*/

//J'ai juste chercher toutes les balises qui sont des schemas
var SCHEMA = "script[type='application/ld+json']";
var SEARCH_WORD = "Event";
var MAX_PAGES_TO_VISIT = 25;
var SITELIST = [
  "http://www.algonquinsa.com/event",
  //"http://www.ottawa2017.ca/events",
  //"https://nac-cna.ca/en/event",
  //"https://www.tdplace.ca/event",
      "http://www.warmuseum.ca/exhibitions",
  //"https://www.ticketmaster.ca",
  "http://www.bandsintown.com",
  "http://www.electrostub.com/events",
  "http://www.historymuseum.ca/exhibitions"

];
var START_URL;
var found = 0;
var pagesVisited = {};
var json = {"event": []};
var pagesToVisit = [];
var url;
var baseUrl;

var prepareUrl = function(){
  START_URL = SITELIST.shift();
  pagesToVisit.push(START_URL);
  console.log("START_URL = " + START_URL);
  numPagesVisited = 0;
  url = new URL(START_URL);
  baseUrl = url.protocol + "//" + url.hostname;
}
prepareUrl();
crawl();

function crawl() {
  if(numPagesVisited >= MAX_PAGES_TO_VISIT) {
    console.log("Reached max limit of number of pages to visit.");
    if (SITELIST.length > 0){
    prepareUrl();

  } else {
    writeFile(json);
    return;
  }
  }
  var nextPage = pagesToVisit.shift();

  if (nextPage in pagesVisited) {
    // We've already visited this page, so repeat the crawl
    crawl();
  } else {
    // New page we haven't visited
    visitPage(nextPage, crawl);
  }
}

function visitPage(url, callback) {

  if (url === undefined){
    console.log("url is undefined");
    numPagesVisited++;
    callback();
    return;
  }

  // Add page to our set
  pagesVisited[url] = true;
  numPagesVisited++;


  // Make the request
  console.log("Visiting page " + url);
  request(url, function(error, response, body) {
     // Check status code (200 is HTTP OK)
     console.log("Status code: " + response.statusCode);
     if(response.statusCode !== 200) {
       callback();
       return;
     }
     // Parse the document body
     var $ = cheerio.load(body);

     var isWordFound = searchForWord($, SEARCH_WORD);
     var isSchemaFound = searchForSchema($, SCHEMA);

     if(isSchemaFound) {

       console.log('Schema ' + SCHEMA + ' found at page ' + url);
       console.log('Found count: ' + found);
       //console.log($(SEARCH_WORD).text());

       function isArray(ob) {
         return ob.constructor === Array;
       }

       try {
       var jsontemp = JSON.parse($(SCHEMA).text());

       //Vérifier si l'élement DOM est un schema de type "Event"
       if (isArray(jsontemp)){
         //Si l'objet retourné est un Array on vérifie si c'Est un event
         if (jsontemp[0]["@type"] == "Event") {
           json.event.push(jsontemp[0]);
         } else {
           console.log("not event");
         }
       } else if(jsontemp["@type"] == "Event"){
           json.event.push(jsontemp);
       } else {
           console.log("non-compatible");
         }
       } catch(err){
         console.log(err);
       }
     }

     if(isWordFound){
       console.log("Word "+ SEARCH_WORD + " found")
     }
     collectInternalLinks($);
     // In this short program, our callback is just calling crawl()
     callback();
  });
}


function searchForWord($, word) {
  var bodyText = $('html > body').text().toLowerCase();
  return(bodyText.indexOf(word.toLowerCase()) !== -1);
}

function searchForSchema($, schema) {

  if ($(schema).length !== -1 && $(schema).text() !== "") {
    found++;
    return true;
  }
  else {
    return false;
  }
}

function collectInternalLinks($) {
  //var allRelativeLinks = [];
  var allAbsoluteLinks = [];

  // var relativeLinks = $("a[href^='/']");
  // relativeLinks.each(function() {
  //     allRelativeLinks.push($(this).attr('href'));
  //
  //     pagesToVisit.push(START_URL+$(this).attr('href'));
  //
  // });

  var absoluteLinks = $("a[href^='http']");
  absoluteLinks.each(function() {
      allAbsoluteLinks.push($(this).attr('href'));
      var str = $(this).attr('href');
      if (str.indexOf(START_URL) !== -1){
        pagesToVisit.push($(this).attr('href'));
      }
  });

  //console.log("Found " + allRelativeLinks.length + " relative links");
  console.log("Found " + allAbsoluteLinks.length + " absolute links");
}

var writeFile = function(json){

fs.writeFile('json/eventlist.json',"var liste = " + JSON.stringify(json) , function (err) {
    if (err)
        return console.log(err);
    console.log('json > eventlist.json');
});
}
