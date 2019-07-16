//setup socket io
var socket = io();

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

//on connection, ask for room
socket.on('connect',function () {
    socket.emit('get_room',room);
});

//set multiplayer link once room is created/joined
socket.on('set_link', function (room_name) {
    link.setLink(url.slice(0,url.lastIndexOf('/')+1)+'?room='+room_name);
    //also change url of clients browser to match room link
    history.pushState({},"",url.slice(0,url.lastIndexOf('/')+1)+'?room='+room_name);
});


// code for sending/recieving test messages to/from server
document.querySelector('.test-message').addEventListener('click', function() {
    socket.emit('test-message');
});
socket.on('test-message-recieved', function (id) {
    console.log('test-message-recieved',id);
});