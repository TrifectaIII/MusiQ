var players = document.querySelectorAll('.player');

// Takes a list of 4 names and populates the player section
// empty string represents no-player
var updatePlayers = function (name_list,score_list) {
    for (let i = 0; i < name_list.length; i++) {
        if (name_list[i] == ''){
            //if name empty, then seat empty
            players[i].querySelector('.player-name').innerHTML = 'Empty';
            players[i].querySelector('.player-score').innerHTML = '-';
            players[i].classList.add('wait-player');
        } else {
            //if name exists, player exists
            //slice to only first 8 characters in name
            players[i].querySelector('.player-name').innerHTML = name_list[i].slice(0,8);
            players[i].querySelector('.player-score').innerHTML = score_list[i];
            players[i].classList.remove('wait-player');
        };
    };
};

//starts game to hide missing player slots
var startPlayers = function () {
    for (let i = 0; i < players.length; i++) {
        players[i].classList.add('started');
    };
}

//ends game to reveal missing player slots
var finishPlayers = function () {
    for (let i = 0; i < players.length; i++) {
        players[i].classList.remove('started');
    };
}

//takes list of 4 booleans to display whether or not each player got the question right
var judgePlayers = function (bool_list) {
    for (let i = 0; i < players.length; i++) {
        if (!players[i].classList.contains('wait-player')) {
            if (bool_list[i]) {
                players[i].classList.add('right');
            } else {
                players[i].classList.add('wrong');
            };
        };
    };
}

//unJudge all players to revert to default colors
var unJudgePlayers = function () {
    for (let i = 0; i < players.length; i++) {
        players[i].classList.remove('right');
        players[i].classList.remove('wrong');
    };
}

//Buttons to test visuals

var add_players = document.querySelector('.add-players');
var remove_players = document.querySelector('.remove-players');
var start_game = document.querySelector('.start-game');
var end_game = document.querySelector('.end-game');
var judge_players = document.querySelector('.judge-players');
var unjudge_players = document.querySelector('.unjudge-players');

add_players.addEventListener('click', function () {
    updatePlayers(['Derek','David','Dennis',''],
                  [12,14,16,18]);
});

remove_players.addEventListener('click', function () {
    updatePlayers(['','','',''],
                  [0,0,0,0]);
});

start_game.addEventListener('click', startPlayers);

end_game.addEventListener('click', finishPlayers);

judge_players.addEventListener('click', function () {
    console.log('doing it');
    judgePlayers([true,false,true,false]);
});

unjudge_players.addEventListener('click', unJudgePlayers);