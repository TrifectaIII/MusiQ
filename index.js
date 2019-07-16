// SETUP
////////////////////////////////////////////////////////////////////

var express = require('express');
var app = express();
var serv = require('http').Server(app);
var io = require('socket.io')(serv);
var non_repl_port = 8000;

// HTTP SERVER
////////////////////////////////////////////////////////////////////

//Start Server
serv.listen(process.env.PORT || non_repl_port);
console.log("Server started @ http://localhost:8000/");

//route main page in index
app.get('/',function(req, res) {
	res.sendFile(__dirname + '/static/index.html');
});
//Serve static files
app.use('/static',express.static(__dirname + '/static'));

// SOCKET HANDLING
////////////////////////////////////////////////////////////////////

//handle incoming socket connections
io.sockets.on('connection', function (socket) {

	//log a new connection
	console.log('a new user connected. ID: ',socket.id);

	//place socket in room
    socket.on('get_room', function (room){
		console.log(socket.id,'is joining',room);
		
		//if no room specified
        if (room == 'NEW') {
            let newRoom = Math.floor(Math.random() * 10000).toString();
            socket.join(newRoom);
			socket.emit('set_link', newRoom);
			
		//if room specified
        } else {
            socket.join(room);
            socket.emit('set_link', +room);
        }
        
	});
	
	// for test messages between clients in room
	socket.on('test-message', function () {
		for (let room in socket.rooms){
			io.sockets.in(room).emit('test-message-recieved',socket.id);
		}
	});
});