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

//unJudge all players to revert to default colors
players.unJudgePlayers = function () {
    for (let i = 0; i < players.playerbars.length; i++) {
        players.playerbars[i].classList.remove('right');
        players.playerbars[i].classList.remove('wrong');
    };
};

//Buttons to test visuals

var add_players = document.querySelector('.add-players');
var remove_players = document.querySelector('.remove-players');
var start_game = document.querySelector('.start-game');
var end_game = document.querySelector('.end-game');
var judge_players = document.querySelector('.judge-players');
var unjudge_players = document.querySelector('.unjudge-players');

add_players.addEventListener('click', function () {
    players.updatePlayers(['Derek','David','Dennis',''],
                  [12,14,16,18]);
});

remove_players.addEventListener('click', function () {
    players.updatePlayers(['','','',''],
                  [0,0,0,0]);
});

start_game.addEventListener('click', players.startPlayers);

end_game.addEventListener('click', players.finishPlayers);

judge_players.addEventListener('click', function () {
    players.judgePlayers([true,false,true,false]);
});

unjudge_players.addEventListener('click', players.unJudgePlayers);