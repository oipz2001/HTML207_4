const http = require('http');

// create HTTP server

http.createServer((request,response) => {
    // write response
    response.write('<h1>Who read this massage is a buffallo<h1>');
    
    response.end();
}).listen(5000,() => {
    console.log('Server is running ...');
});