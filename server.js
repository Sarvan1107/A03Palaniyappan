var express = require('express');  // require express
var app = express();  // create a request handler function
var server = require('http').createServer(app);  // use our app to create a server
var io = require('socket.io')(server); // pass in our http app server to get a Socket.io server
var path = require('path');
var ejs =  require('ejs');
var bodyParser =  require('body-parser');
var logger = require("morgan");

app.get('/', function(req, res){
  app.use(express.static(path.join(__dirname)));
  res.sendFile(path.join(__dirname, '../A03Palaniyappan/assets', 'Home.html'));
});

app.use(express.static(__dirname+'/assets'))
app.set("assets", path.resolve(__dirname, "assets")); // path to views
app.set("view engine", "ejs");

// manage our entries
var entries = [];
app.locals.entries = entries;

// set up the logger
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// on a GET request to default page, do this.... 
app.get('/', function(req, res){
      res.render('home.html');
});


app.get('/guestbook', function(req,res){
  res.render('gbindex');

});

app.post('/guestbook', function(req,res){
  res.render('gbindex');

});

// http POST (INSERT)
app.post("/new-entry", function (request, response) {
  if (!request.body.title || !request.body.body) {
    response.status(400).send("Entries must have a title and a body.");
    return;
  }
  entries.push({
    title: request.body.title,
    content: request.body.body,
    published: new Date()
  });
  console.log(entries.length);
  response.redirect("/guestbook");
  
 
});

app.get("/new-entry", function (request, response) {
  response.render("new-entry");
});

app.use(function (request, response) {
  response.status(404).render("404");
});

// Listen for an app request on port 1234
server.listen(1234, function(){
  console.log('listening on http://127.0.0.1:1234/');
});