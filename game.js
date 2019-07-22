var fs = require("fs");
var content = fs.readFileSync("songs.json");
var jsonContent = JSON.parse(content);

var rapTitles = [];
var rapArtists = [];
var popTitles = [];
var popArtists = [];
var rbTitles = [];
var rbArtists = []
var kpopTitles = [];
var kpopArtists = [];
var altTitles = [];
var altArtists = [];
var indieTitles = [];
var indieArtists = [];
var classicTitles = [];
var classicArtists = [];

// Appends songs from songs.json to their appropriate genre
for (var key in jsonContent){
    if (jsonContent[key]["genre"] == "Rap"){
    rapTitles.push(jsonContent[key]["title"]); 
    rapArtists.push(jsonContent[key]["artist"]);
    } else if (jsonContent[key]["genre"] == "Pop"){
    popTitles.push(jsonContent[key]["title"]); 
    popArtists.push(jsonContent[key]["artist"]);
    } else if (jsonContent[key]["genre"] == "R&B"){
    rbTitles.push(jsonContent[key]["title"]);
    rbArtists.push(jsonContent[key]["artist"]);
    } else if (jsonContent[key]["genre"] == "KPOP"){
    kpopTitles.push(jsonContent[key]["title"]);
    kpopArtists.push(jsonContent[key]["artist"]);
    } else if (jsonContent[key]["genre"] == "Alternative"){
    altTitles.push(jsonContent[key]["title"]);
    altArtists.push(jsonContent[key]["artist"]);
    } else if (jsonContent[key]["genre"] == "Indie"){
    indieTitles.push(jsonContent[key]["title"]);
    indieArtists.push(jsonContent[key]["artist"]);
    } else if (jsonContent[key]["genre"] == "Classical"){
    classicTitles.push(jsonContent[key]["title"]);
    classicArtists.push(jsonContent[key]["artist"]);
    };
};


function gen_question (){
    var songPath = Object.keys(jsonContent)[Math.floor(Math.random()*Object.keys(jsonContent).length)];
    var category = Object.keys(jsonContent[songPath])[Math.floor(Math.random()*2)];
    var genre = jsonContent[songPath]["genre"];
    // genre = 'Classical'; //testing
    var answer = jsonContent[songPath][category];
    var choices = [];
    var rand_spot = Math.floor(Math.random()*4);
    var booleans = [false, false, false, false];

    if (category == "title"){
        var question = "song";  
    } else if (category == "artist"){
        var question = "artist";
    } else {
        var question = 'ERROR';
    };

    
    // Inserts answer choices into a list based on genre
    var insert = function (list){
        while (choices.length < 4){     
            var choice = list[Math.floor(Math.random()*list.length)]
            if (choices.indexOf(choice) === -1 && choice != undefined){
            // console.log(choice);
            choices.push(choice);
            };
        };
        if (choices.indexOf(answer) === -1){
            choices[rand_spot] = answer;
            booleans[rand_spot] = true;
        } else {
            booleans[choices.indexOf(answer)] = true;
        };
    };
    
    
    switch(genre){
    case "Rap":
        if (category == "title"){
        insert(rapTitles);
        } else {
        insert(rapArtists);
        };
        break;
    case "Pop":
        if (category == "title"){
        insert(popTitles);
        } else{
        insert(popArtists);
        };
        break;
    case "R&B":
        if (category == "title"){
        insert(rbTitles);
        } else {
        insert(rbArtists);
        };
        break;
    case "KPOP":
        if (category == "title"){
        insert(kpopTitles);
        } else {
        insert(kpopArtists);
        };
        break;
    case "Alternative":
        if (category == "title"){
        insert(altTitles);
        } else {
        insert(altArtists);
        };
        break;
    case "Indie":
        if (category == "title"){
        insert(indieTitles);
        } else {
        insert(indieArtists);
        };
        break;
    case "Classical":
        if (category == "title"){
        insert(classicTitles);
        } else {
        insert(classicArtists);
        };
        break;
    default:
        console.log("Could not generate choices");
    };

    var obj = {};
    obj.path = songPath;
    obj.question = question;
    obj.choices = choices;
    obj.answer = answer;
    obj.bools = booleans;

    return obj;
};

function Room (name, io) {
    this.io = io;

    //name of room
    this.name = name;

    //list containing all player sockets
    this.sockets = [undefined,undefined,undefined,undefined];

    //list of player names
    this.names = ['','','',''];

    //list of player scores
    this.scores = [0,0,0,0];

    //tracks if game has started yet
    this.started = false;

    //list of booleans to keep track f which player got their qustion right
    this.corrects = [false,false,false,false];

    //tracks who has already answered
    this.answered = [false,false,false,false]; 

    //round tracker
    this.round = 1;

    //how many rounds there are
    this.totalround = 5; 

    //the correct answer for the current question
    this.correct_answer = undefined;

    this.choice_timer;

    this.judge_timer;

    this.reset_timer;

    this.question_active = false;

    this.question_bools = [false,false,false,false];


    this.resetRoom = function () {
        //reset room data
        clearTimeout(this.reset_timer);
        clearTimeout(this.judge_timer);
        clearTimeout(this.choice_timer);
        this.question_active = false;
        this.scores = [0,0,0,0];
        this.started = false;
        this.corrects = [false,false,false,false];
        this.answered = [false,false,false,false]; 
        this.round = 1;
    };

    //checks if room is empty
    this.isEmpty = function () {
        let empty = true;
        for (let i = 0; i < this.sockets.length; i++){
            if(!(this.sockets[i] === undefined)) {
                empty = false;
            };
        };
        return empty;
    };

    //check if everyone has answered
    this.check_answered = function(){
        for( let i = 0; i <this.sockets.length; i++){
            if ((!(this.sockets[i] === undefined)) && (this.answered[i]== false)){
                return false;
            };
        };
        return true;
    };

    //send new question to all players in room
    this.sendQuestion = function () {
        if (!this.question_active) {
            
            //generate new question
            var qobj = gen_question();

            //set trackers
            this.correct_answer = qobj.answer;
            this.question_bools = qobj.bools;
            this.corrects = [false,false,false,false];
            this.answered = [false,false,false,false];
            this.question_active = true;

            //emit message
            this.io.sockets.in(this.name).emit('ask_question', qobj.path, qobj.question, qobj.choices);
            this.update();

            var thisRoom = this;
            //fallback timer in case of disconnects / new connects
            this.choice_timer = setTimeout(function () {
                thisRoom.sendJudge();
            }, 1000*21);//time in MS after which server will force judging
        };
    };

    //judges choices and players
    this.sendJudge = function () {
        if (this.question_active) {
            clearTimeout(this.choice_timer);
            this.question_active = false;

            this.io.sockets.in(this.name).emit('judge',this.question_bools,this.corrects);
            this.update();

            //after judging, wait a bit then send next question or finish game
            if (this.round == this.totalround){
                var thisRoom = this;
                this.reset_timer = setTimeout(function () {
                    thisRoom.io.sockets.in(thisRoom.name).emit('restart_game', thisRoom.scores);

                    //reset room data
                    thisRoom.resetRoom();
                },1000 * 3);
            }else{
                this.round +=1;
                var thisRoom = this;
                this.judge_timer = setTimeout(function () {
                    thisRoom.sendQuestion();
                }, 1000 * 3);//time in MS to wait until next question
            }
        };
    };

    //updates all player info and scores
    this.update = function () {
        // emit player info to room
        this.io.sockets.in(this.name).emit('player_info', this.names, this.scores);

        //emit round info to room
        this.io.sockets.in(this.name).emit('round_info', this.round, this.totalround);

        //emit individual scores to each socket
        for (let i = 0; i < this.sockets.length; i++) {
            if (!(this.sockets[i] === undefined)){
                this.sockets[i].emit('individual_score',this.scores[i]);
            };
        };
    };

    //adds new socket to room
    this.add = function (socket) {
        //add socket only if an empty slot exists and game hasnt started
        let joined = false;
        let spot = 0;
        // if (!this.started) {
            for (let i = 0; i < this.sockets.length; i++){
                if (this.sockets[i] === undefined) {
                    this.sockets[i] = socket;
                    joined = true;
                    spot = i;
                    //join socketsio room
                    socket.join(this.name);
                    break;
                };
            };
        // };

        if (joined) {
            if (this.started) {
                socket.emit('game_started');
            };

            //when player successfully joins lobby, setup
            this.names[spot] = 'Player '+(spot+1).toString();

            this.update();//update when new person joins
            
            //scoping variable
            let thisRoom = this;

            //wipe player slot on Disconnect
            socket.on('disconnect', function () {
                thisRoom.names[spot]  = '';
                thisRoom.scores[spot] = 0;
                thisRoom.sockets[spot] = undefined;
                thisRoom.update(); //update when somebody disconnects
                if (thisRoom.question_active) {
                    thisRoom.answered[spot] = true;
                    if (thisRoom.check_answered()){
                        thisRoom.sendJudge();
                    };
                };
                if (thisRoom.isEmpty()) {
                    //reset room data
                    thisRoom.resetRoom();
                };
            });

            //sets name of player
            socket.on('set_name', function (name) {
                thisRoom.names[spot] = name;
                thisRoom.update();//update when somebody sets their name
            });

            //when game starts, immediately generate and send a question
             socket.on('start_game',function(){
             	if (!(thisRoom.started)){
	                thisRoom.started = true;
	                thisRoom.sendQuestion();
            	}

            });

            //when client sends back their choice
            socket.on('choice',function(choice){
                if ((!(thisRoom.answered[spot]))&&(thisRoom.question_active)){
                    //check if this socket got it correct
                    if (choice == thisRoom.correct_answer){
                        //give points
                        thisRoom.scores[spot] += 1;
                        //mark them as correct
                        thisRoom.corrects[spot] = true;
                    };

                    //mark this socket as answered
                    thisRoom.answered[spot] = true;
                    thisRoom.io.sockets.in(thisRoom.name).emit('answered', thisRoom.answered);
                    // did everyone answer?
                    if (thisRoom.check_answered()){
                        thisRoom.sendJudge();
                    };
                };
            });

        } else {
            //when player is trying to join full lobby
            socket.emit('cannot_join');
        };
    };
};

module.exports = {
    Room:Room,
};