//setup socket io
var socket = io();

// ROOMS + NAME
/////////////////////////////////////////////////////////////////////////////

//Look for Room
var room;
var url = window.location.href;

//If no room in url, tell server to create new one
var roomIndex = url.search('room=');
if (roomIndex == -1){
    room = 'NEW';
} else {
    room = url.slice(roomIndex+5);
};

//on connection, ask for room, then ask for name
socket.on('connect',function () {
    socket.emit('join_room',room);
    entry.askFor('name');
    //send name to server
    entry.close.addEventListener('acceptEntry', function () {
        let name = entry.getEntered();
        socket.emit('set_name', name);
    });
});

//set multiplayer link once room is created/joined
socket.on('set_link', function (room_name) {
    link.setLink(url.slice(0,url.lastIndexOf('/')+1)+'?room='+room_name);
    //also change url of clients browser to match room link
    history.pushState({},"",url.slice(0,url.lastIndexOf('/')+1)+'?room='+room_name);
});

//when room is full
socket.on('cannot_join', function () {
    alert('Cannot Join Game: Room Full');
});

// PLAYERS
/////////////////////////////////////////////////////////////////////////////

// updates players
socket.on('player_info', function (names,scores) {
    players.updatePlayers(names,scores);
});