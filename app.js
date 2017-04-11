var express = require('express');
var path = require('path');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

const PORT = 8081;

evenements = [
    {
        nom: "poisson d'avril",
        date: "2017/04/01",
        categorie: "fete",
        descriptions: "on fait des farces",
        lien: "http://www.poisson.com",
    },
    {
        nom: "noel",
        date: "2017/12/25",
        categorie: "fete",
        descriptions: "j'mange dla tourtiere",
        lien: "http://www.noel.com"
    },
]

app.get('/', function(req, res){
  res.sendFile(__dirname+"/index.html");
    /*text = '<script src="muse_manifest.xml"></script>';
    text += "<img src=\"/static/cat.jpg\"><br>";
    text += "<img src=\"/images/blank.gif\"><br>";
    text += "<img src=\"/images/canada-day-fireworks-ottawa-river-crop-u961.jpg\"><br>";
    text += "<img src=\"/images/u183-r.png\"><br>";
    text += "<img src=\"/images/u183-r.png\"><br>";
    text += "<img src=\"/images/u183-r.png\"><br>";
    text += "Liste d'evenements:<br>";
    text += "<table>";
    for (i = 0; i < evenements.length; i++) {
        text += "<tr>" + "<td><b>" + evenements[i].date + "</b></td>";
        text += "<td><a href=\"" + evenements[i].lien + "\">" + evenements[i].nom + "</a></tr></tr>";
    }
    text += "</table>";
    res.send(text);*/
})

app.get('/events', function(req, res){

  url = "http://www.algonquinsa.com/event/free-movie-night-moonlight/";

  request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);

            var json;

            json = JSON.parse($('script[type="application/ld+json"]').html());
            json = json[0];

            res.send(json.location.address);
          }
        });
      });

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

app.listen(PORT);

console.log('server a http://localhost:'+PORT);

exports = module.exports = app;
