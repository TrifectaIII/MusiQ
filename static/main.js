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

//when room is full, notify player and start new lobby
socket.on('cannot_join', function () {
    alert('Cannot Join Game: Room full or game in progress. Joining new lobby instead.');
    window.location.href = window.location.href.slice(0,url.lastIndexOf('/')+1);
});

// GAME MESSAGES
/////////////////////////////////////////////////////////////////////////////

//clicking the start button tells server to start the game (no argument)
quiz.start.addEventListener('click', function () {
    socket.emit('start_game'); // SERVER RELEVANT
    console.log('sent message to start_game');
});

// updates player info (requires namelist and scorelist)
socket.on('player_info', players.updatePlayers); // SERVER RELEVANT

//set answered players
socket.on('round_info', quiz.setRound);

// displays which choices were right or wrong
// displays whether or not each player got it right or wrong
// (requires a list of booleans for each)
socket.on('judge', function (choice_bools,player_bools) { // SERVER RELEVANT
    quiz.judgeQuiz(choice_bools);
    players.judgePlayers(player_bools);
    players.resetAnswered(); //resets all answered
});

// updates score of client (requires an int)
socket.on('individual_score', quiz.setScore); // SERVER RELEVANT

//resets game by showing start button again (scorelist)
socket.on('restart_game', function (scorelist) { // SERVER RELEVANT
    quiz.showStart();
    players.finishPlayers();
    players.unjudgePlayers();
    quiz.resetQuiz();
    players.placePlayers(scorelist);
});

//lets player know who has chosen so far
socket.on('answered', function (answeredlist) {
    players.setAnswered(answeredlist);
});

var chosen = true;

// starts a new question (requires list of choices, song, and what to prompt user for)
socket.on('ask_question', function(song, askfor, choices) { // SERVER RELEVANT
    players.startPlayers();
    players.unjudgePlayers(); //removes judging from players
    players.unplacePlayers(); //removes placing
    players.resetAnswered(); //resets all answered
    quiz.resetQuiz(); //resets quiz to default
    quiz.setChoices(choices); // sets choices for new question
    chosen = false; //marked new question as not chosen
    quiz.askFor(askfor); // set prompt
    quiz.showQuiz();//show the quiz
    //execute song play
    myp5.loadsong(song); 
    timer.startTimerCallback(function() {
        console.log('nothing chosen in time :(');
        //let server know that no choice was made by sending empty string
        socket.emit('choice',''); // SERVER RELEVANT
    });
});

// loop to check whether or not something has been chosen
setInterval(function () {
    if ((quiz.getChoice() != undefined) && (!chosen)) {
        // something chosen, so stop timer
        timer.resetTimer();
        chosen = true;
        console.log('I picked',quiz.getChoice());
        // send choice made to server as string (use quiz.getChoiceIndex() for index instead)
        socket.emit('choice',quiz.getChoice()); // SERVER RELEVANT
    };
}, 100);

// for testing only
//////////////////////////////////////////////////////////////////////
set_choices.addEventListener('click', function () {
    chosen = false;
});