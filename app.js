var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/', function(req, res){
    res.send("hello")
})

app.listen('8081')

console.log('server a http://localhost:8081');

exports = module.exports = app;
