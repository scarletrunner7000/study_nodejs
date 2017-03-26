var http = require('http'),
    fs = require('fs'),
    ejs = require('ejs');
var settings = require('./settings');
console.log(settings);
var server = http.createServer();
var template = fs.readFileSync(__dirname + '/public_html/hello.ejs', 'utf-8');

var n = 0;
server.on('request', function(req, res) {
  n++;
  switch (req.url) {
    case '/about':
      var data = ejs.render(template, {
        title: "Hello",
        content: "<strong>World!</strong>",
        n: n,
      });
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
      break;
    case '/profile':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write("about me");
      res.end();
      break;
    default:
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write("wrong page");
      res.end();
      break;
  }

});
server.listen(settings.port, settings.host);
console.log("server listening ...");
