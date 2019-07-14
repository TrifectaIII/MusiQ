var express = require('express')
var app = express()
var serv = require('http').Server(app);
var io = require('socket.io')(serv,{});
var port = 8000;



//route main page in index
app.get('/',function(req, res) {
	res.sendFile(__dirname + '/static/index.html');
});

//serve static files
app.use('/static',express.static(__dirname + '/static'));

serv.listen(port);
console.log("Server started @ http://localhost:8000/");