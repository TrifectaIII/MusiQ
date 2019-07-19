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
    window.location.href = window.location.href.slice(0,url.lastIndexOf('/')+1);
});

// GAME UPDATES
/////////////////////////////////////////////////////////////////////////////

// updates player info (requires namelist and scorelist)
socket.on('player_info', players.updatePlayers);

// displays which choices were right or wrong
// displays whether or not each player got it right or wrong
// (requires a list of booleans for each)
socket.on('judge', function (choice_bools,player_bools) {
    quiz.judgeQuiz(choice_bools);
    players.judgePlayers(player_bools);
});

// updates score of client (requires an int)
socket.on('individual_score', quiz.setScore);

var chosen = true;

// starts a new question (requires list of choices, song, and what to prompt user for)
socket.on('ask_question', function(song, askfor, choices) {
    quiz.resetQuiz();
    quiz.setChoices(choices);
    chosen = false;
    quiz.askFor(askfor);
    quiz.showQuiz();
    //execute song play
    timer.startTimerCallback(function() {
        console.log('nothing chosen in time :(');
        //emit picked nothing message
    });
});

// loop to check whether or not something has been chosen
setInterval(function () {
    if ((quiz.getChoice() != undefined) && (!chosen)) {
        chosen = true;
        console.log('I picked',quiz.getChoice());
        // emit picked message to server here
    };
}, 50);

// for testing only
set_choices.addEventListener('click', function () {
    chosen = false;
});