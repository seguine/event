var express = require('express');
var path = require('path');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

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
    text = "<img src=\"/static/cat.jpg\"><br>"
    text += "Liste d'evenements:<br>"
    text += "<table>"
    for (i = 0; i < evenements.length; i++) {
        text += "<tr>" + "<td><b>" + evenements[i].date + "</b></td>"
        text += "<td><a href=\"" + evenements[i].lien + "\">" + evenements[i].nom + "</a></tr></tr>";
    }
    text += "</table>"
    res.send(text)
})

app.use('/static', express.static(path.join(__dirname, 'static')))

app.listen('8081')

console.log('server a http://localhost:8081');

exports = module.exports = app;
