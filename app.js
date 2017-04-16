var express = require('express');
var path = require('path');
var fs = require('fs');
var request = require('request');
var url = require('url');
var cheerio = require('cheerio');
var app = express();

const PORT = 8081;

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
  console.log("request for events.html");
  res.sendFile(__dirname+"/events.html");
      });

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/json', express.static(path.join(__dirname, 'json')));

app.listen(PORT);

console.log('server a http://localhost:'+PORT);

exports = module.exports = app;
