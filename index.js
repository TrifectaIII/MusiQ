// SETUP
////////////////////////////////////////////////////////////////////

//include game.js file
var game = require(__dirname+'/game.js');

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

//object to hold all rooms
var rooms = {};

//handle incoming socket connections
io.sockets.on('connection', function (socket) {

	//log a new connection
	console.log('a new user connected. ID: ',socket.id);

	//place socket in room
    socket.on('join_room', function (get_room){
		console.log(socket.id,'is joining',get_room);
		
		//if no room specified
        if (get_room == 'NEW') {
			let newRoom;
			let isnew = false;
			//generate completely new room name
			while (!isnew) {
				newRoom = Math.floor(Math.random() * 10000000).toString();
				isnew = true;
				for (let room in rooms){
					if (room == newRoom) {
						isnew = false;
					};
				};
			};
			//add room to rooms
			rooms[newRoom] = new game.Room(newRoom);
			// rooms[newRoom] = newRoom;
			rooms[newRoom].addSocket(socket);
			// socket.join(newRoom);
			socket.emit('set_link', newRoom);
			
		//if room specified
        } else {
			//check if room already exists
			let isnew = true;
			for (let room in rooms) {
				if (room == get_room) {
					isnew = false;
				}
			}
			//if not, create it
			if (isnew) {
				rooms[get_room] = new game.Room(get_room);
				// rooms[get_room] = get_room;
			}
			rooms[get_room].addSocket(socket);
			// socket.join(get_room);
            socket.emit('set_link', +get_room);
        };
	});
});

setInterval(function () {
	for (let room in rooms) {
		gameRoom = rooms[room];
		gameRoom.updateSockets();
	};
}, 60);