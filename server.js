
//import http module
var http = require('http');
var fs = require('fs');
var url = require('url');

//defines a port on which we want to listen to
const PORT = 8888;

// Create a server as anymous object
http.createServer( function(request, response) {
   // Parse the request containing file name
   var pathname = url.parse(request.url).pathname;

   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");

   // Read the requested file content from file system
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else {
         //Page found
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});

         // Write the content of the file to response body
         response.write(data.toString());
      }
      // Send the response body
      response.end();
   });
   //Now we listen on a server port
}).listen(PORT, function(){
    //Callback triggered when server is successfully listening
    console.log("Server listening on: http://localhost:%s", PORT);
});
