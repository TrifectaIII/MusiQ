var players = document.querySelectorAll('.player');

// Takes a list of 4 names and populates the player section
// empty string represents no-player
var updatePlayers = function (plist) {
    for (let i=0; i < plist.length; i++) {
        if (plist[i] == ''){
            //if name empty, then seat empty
            players[i].querySelector('.player-name').innerHTML = 'Empty';
            players[i].classList.add('no-player')
            console.log(players[i].classList)
        } else {
            //if name exists, player exists
            //slice to only first 8 characters in name
            players[i].querySelector('.player-name').innerHTML = plist[i].slice(0,8);
            players[i].classList.remove('no-player')
            console.log(players[i].classList)
        };
    };
};

//Buttons to test visuals

var add_players = document.querySelector('.add-players');
var remove_players = document.querySelector('.remove-players');
add_players.addEventListener('click', function () {
    updatePlayers(['Derek','David','Dennis','Damien']);
});

remove_players.addEventListener('click', function () {
    updatePlayers(['','','','']);
});