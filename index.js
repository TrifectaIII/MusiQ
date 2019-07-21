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

//object to hold all game.Room objects
var rooms = {};

//handle incoming socket connections
io.sockets.on('connection', function (socket) {

	//log a new connection
	console.log('a new user connected. ID: ',socket.id);

	//place socket in room
    socket.on('join_room', function (roomName){
		
		//if no room specified
        if (roomName == 'NEW') {
			let newName;
			let isnew = false;
			//generate completely new room name
			while (!isnew) {
				newName = Math.floor(Math.random() * 10000000).toString();
				isnew = true;
				for (let room in rooms){
					if (room == newName) {
						isnew = false;
					};
				};
			};
			//add room to rooms
			rooms[newName] = new game.Room(newName,io);

			console.log(socket.id,'is joining',newName);
			//add socket to room
			rooms[newName].add(socket);
			socket.emit('set_link', newName);
			
		//if room specified
        } else {
			//check if room already exists
			let isnew = true;
			for (let room in rooms) {
				if (room == roomName) {
					isnew = false;
				}
			}
			//if not, create it
			if (isnew) {
				rooms[roomName] = new game.Room(roomName,io);
			}
			
			console.log(socket.id,'is joining',roomName);
			//add socket to room
			rooms[roomName].add(socket);
            socket.emit('set_link', +roomName);
        };
	});
});

//update loop
setInterval(function () {
	for (let room in rooms) {
		let gameRoom = rooms[room];
		// gameRoom.update(); //comment back in to update in loop

		// cull empty rooms
		if (gameRoom.isEmpty()){
			delete rooms[room];
		};
	};
}, 60);//this is interval in MS