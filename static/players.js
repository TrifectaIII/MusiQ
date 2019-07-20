//global object for players framework
var players = {};

players.playerbars = document.querySelectorAll('.player');

// Takes a list of 4 names and populates the player section
// empty string represents no-player
players.updatePlayers = function (name_list,score_list) {
    for (let i = 0; i < name_list.length; i++) {
        if (name_list[i] == ''){
            //if name empty, then seat empty
            players.playerbars[i].querySelector('.player-name').innerHTML = 'Empty';
            players.playerbars[i].querySelector('.player-score').innerHTML = '-';
            players.playerbars[i].classList.add('wait-player');
        } else {
            //if name exists, player exists
            //slice to only first 8 characters in name
            players.playerbars[i].querySelector('.player-name').innerHTML = name_list[i].slice(0,8);
            players.playerbars[i].querySelector('.player-score').innerHTML = score_list[i];
            players.playerbars[i].classList.remove('wait-player');
        };
    };
};

//starts game to hide missing player slots
players.startPlayers = function () {
    for (let i = 0; i < players.playerbars.length; i++) {
        players.playerbars[i].classList.add('started');
    };
};

//ends game to reveal missing player slots
players.finishPlayers = function () {
    for (let i = 0; i < players.playerbars.length; i++) {
        players.playerbars[i].classList.remove('started');
    };
};

//takes list of 4 booleans to display whether or not each player got the question right
players.judgePlayers = function (bool_list) {
    players.unjudgePlayers();
    for (let i = 0; i < players.playerbars.length; i++) {
        if (!players.playerbars[i].classList.contains('wait-player')) {
            if (bool_list[i]) {
               players.playerbars[i].classList.add('right');
            } else {
                players.playerbars[i].classList.add('wrong');
            };
        };
    };
};

//unjudge all players to revert to default colors
players.unjudgePlayers = function () {
    for (let i = 0; i < players.playerbars.length; i++) {
        players.playerbars[i].classList.remove('right');
        players.playerbars[i].classList.remove('wrong');
    };
};

//places players at end of game wtih gold/silver/bronze
players.placePlayers = function (score_list) {
    players.unplacePlayers();

    for (let i = 0; i < score_list.length; i++) {
        players.playerbars[i].classList.add('fourth-place');
    };

    first = Math.max(...score_list);
    for (let i = 0; i < score_list.length; i++) {
        if (score_list[i] == first) {
            players.playerbars[i].classList.add('first-place');
            players.playerbars[i].classList.remove('fourth-place');
            score_list[i] = -1;
        };
    };

    second = Math.max(...score_list);
    for (let i = 0; i < score_list.length; i++) {
        if (score_list[i] == second) {
            players.playerbars[i].classList.add('second-place');
            players.playerbars[i].classList.remove('fourth-place');
            score_list[i] = -1;
        };
    };

    third = Math.max(...score_list);
    for (let i = 0; i < score_list.length; i++) {
        if (score_list[i] == third) {
            players.playerbars[i].classList.add('third-place');
            players.playerbars[i].classList.remove('fourth-place');
        };
    };
};

//removes placing
players.unplacePlayers = function () {
    for (let i = 0; i < players.playerbars.length; i++) {
        players.playerbars[i].classList.remove('fourth-place');
        players.playerbars[i].classList.remove('third-place');
        players.playerbars[i].classList.remove('second-place');
        players.playerbars[i].classList.remove('first-place');
    };
};

// unjudge, finish and unplace all players
players.resetPlayers = function () {
    players.unjudgePlayers();
    players.unplacePlayers();
    players.finishPlayers();
};

//reset players at start just in case
players.resetPlayers();






//Buttons to test visuals
//////////////////////////////////////////////////////////////////////

var add_players = document.querySelector('.add-players');
var start_game = document.querySelector('.start-game');
var judge_players = document.querySelector('.judge-players');
var reset_players = document.querySelector('.reset-players');
var place_players = document.querySelector('.place-players');

add_players.addEventListener('click', function () {
    players.updatePlayers(['Derek','David','Dennis','Denise'],
                  [12,14,16,18]);
});

start_game.addEventListener('click', players.startPlayers);

judge_players.addEventListener('click', function () {
    players.judgePlayers([true,false,true,false]);
});

reset_players.addEventListener('click', players.resetPlayers);

place_players.addEventListener('click', function () {
    players.placePlayers([2,4,3,1]);
});