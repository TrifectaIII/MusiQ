function Room (name, io) {
    this.name = name;
    this.sockets = [undefined,undefined,undefined,undefined];
    this.names = ['','','',''];
    this.scores = [0,0,0,0];
    this.started = false;
    this.io = io;

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
    this.add = function (socket) {
        //add socket only if an empty slot exists and game hasnt started
        let joined = false;
        let spot = 0;
        if (!this.started) {
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
        };

        if (joined) {
            //when player successfully joins lobby, setup
            // this.names[spot] = socket.id.toString();
            this.names[spot] = 'Player '+(spot+1).toString();

            this.update();//update when new person joins

            let self = this;

            //wipe player slot on Disconnect
            socket.on('disconnect', function () {
                self.names[spot]  = '';
                self.scores[spot] = 0;
                self.sockets[spot] = undefined;
                self.update(); //update when somebody disconnects
            });

            //sets name of player
            socket.on('set_name', function (name) {
                self.names[spot] = name;
                self.update();//update when somebody sets their name
            });
        } else {
            //when player is trying to join full lobby
            socket.emit('cannot_join');
        };
    };

    // function which relays gamestate to all clients in room
    this.update = function () {

        // emit player info
        this.io.sockets.in(this.name).emit('player_info', this.names, this.scores);

        //emit individual scores to each socket
        for (let i = 0; i < this.sockets.length; i++) {
            if (!(this.sockets[i] === undefined)){
                this.sockets[i].emit('individual_score',this.scores[i]);
            };
        };
    };
};

module.exports = {
    Room:Room,
};