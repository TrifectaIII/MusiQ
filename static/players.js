var players = document.querySelectorAll('.player');

// Takes a list of 4 names and populates the player section
// empty string represents no-player
var updatePlayers = function (player_list,score_list) {
    for (let i = 0; i < player_list.length; i++) {
        if (player_list[i] == ''){
            //if name empty, then seat empty
            players[i].querySelector('.player-name').innerHTML = 'Empty';
            players[i].querySelector('.player-score').innerHTML = '-';
            players[i].classList.add('wait-player');
        } else {
            //if name exists, player exists
            //slice to only first 8 characters in name
            players[i].querySelector('.player-name').innerHTML = player_list[i].slice(0,8);
            players[i].querySelector('.player-score').innerHTML = score_list[i];
            players[i].classList.remove('wait-player');
        };
    };
};

var startPlayers = function () {
    for (let i = 0; i < players.length; i++) {
        players[i].classList.add('started');
    };
}

var finishPlayers = function () {
    for (let i = 0; i < players.length; i++) {
        players[i].classList.remove('started');
    };
}

//Buttons to test visuals

var add_players = document.querySelector('.add-players');
var remove_players = document.querySelector('.remove-players');
var start_game = document.querySelector('.start-game');
var end_game = document.querySelector('.end-game');

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