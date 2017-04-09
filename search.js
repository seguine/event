var request = require('superagent');//tiré d'un exemple du cour
const KEY = "AIzaSyBHflujUuIfiNrhUijCmGSaK66HH9f_Zh0";
const CX = "011833532475212249794:i6p1ikoytvy"; //google Custom Search ID
var url = "https://www.googleapis.com/customsearch/v1";

request.get(url).query({
  key: KEY,
  cx: CX,
  q:"april", //search expression
  num: 10
}).end(function(err, data){
  console.log(data.body);
});
