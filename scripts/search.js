var request = require('superagent');//tiré d'un exemple du cour
var $
const KEY = "AIzaSyBHflujUuIfiNrhUijCmGSaK66HH9f_Zh0";
const CX = "011833532475212249794:i6p1ikoytvy"; //google Custom Search ID
var url = "https://www.googleapis.com/customsearch/v1";

// request.get(url).query({
//   key: KEY,
//   cx: CX,
//   type: "Event",
//   q:"ottawa", //search expression
//   num: 10
// }).end(function(err, data){
//   console.log(data.body);
// });
//
url = "https://kgsearch.googleapis.com/v1/entities:search";

request.get(url).query({
  key: KEY,
  types: "Event",
  query:"Senators", //search expression
  limit: 1,
  indent: true

}).end(function(err, response){
  console.log(response.body.itemListElement.detailedDescription);


  var json;
  json = response.body.itemListElement.detailedDescription;
  console.log(json);
  //console.log(json);
  // for(i in json){
  //   console.log(JSON.stringify(i['name']));
  // }
});

// $.getJSON(service_url + '?callback=?', params, function(response) {
//   $.each(response.itemListElement, function(i, element) {
//     $('<div>', {text:element['result']['name']}).appendTo(document.body);
//   });
// });
