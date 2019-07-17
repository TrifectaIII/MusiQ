function Room (name) {
    this.name = name;
    this.sockets = [undefined,undefined,undefined,undefined];
    this.names = ['','','',''];
    this.scores = [0,0,0,0];
    this.started = false;

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

    //adds new socket to room
    this.addSocket = function (socket) {
        //add socket only if an empty slot exists and game hasnt started
        let joined = false;
        let spot = 0;
        if (!this.started) {
            for (let i = 0; i < this.sockets.length; i++){
                if (this.sockets[i] === undefined) {
                    this.sockets[i] = socket;
                    joined = true;
                    spot = i;
                    break;
                };
            };
        };

        if (joined) {
            //when player successfully joins lobby, setup
            this.names[spot] = socket.id.toString();

            let self = this;

            //wipe player on DC
            socket.on('disconnect', function () {
                self.names[spot]  = '';
                self.scores[spot] = 0;
                self.sockets[spot] = undefined;
            });

            //sets name of player
            socket.on('set_name', function (name) {
                self.names[spot] = name;
            });
        } else {
            //when player is trying to join full lobby
            socket.emit('cannot_join');
        };
    };

    // function which relays gamestate to all clients
    this.updateSockets = function () {
        for (let i = 0; i < this.sockets.length; i++) {
            let socket = this.sockets[i];
            if (!(socket === undefined)) {
                socket.emit('player_info', this.names, this.scores);
            };
        };
    };
};

module.exports = {
    Room:Room,
};