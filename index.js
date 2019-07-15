var express = require('express');
var app = express();
var serv = require('http').Server(app);
var io = require('socket.io')(serv,{});
var default_port = 8000;

//route main page in index
app.get('/',function(req, res) {
	res.sendFile(__dirname + '/static/index.html');
});

//Serve static files
app.use('/static',express.static(__dirname + '/static'));


//Start Server
serv.listen(process.env.PORT || default_port);
console.log("Server started @ http://localhost:8000/");

