
var elist = liste.event;

for (e in elist){

try {
  var html =
  "<div id='name'>"+elist[e]['name']+"</div>"+
  "<div id='image'><img src="+elist[e]['image']+" width='150px'></div>"+
  "<div id='description'>"+elist[e]['description']+"</div>"+
  "<div id='date'>"+elist[e]['startDate']+"</div>"+
  "<div id='address'>"+
        elist[e]['location']['address']['streetAddress']+", "+
        elist[e]['location']['address']['addressLocality']+", "+
        elist[e]['location']['address']['addressRegion']+", "
        elist[e]['location']['address']['postalCode']+
  "</div>"+
  "<div id='lien'><a href="+elist[e]['url']+">Infos</a></div>";

  $('#res').append(html);

} catch(err)

}
