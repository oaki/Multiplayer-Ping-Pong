// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

var Player = require('./Player.js');
var PlayersCollection = require('./PlayersCollection.js')();
var racket = require('./Racket.js');


server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (username) {
        // we store the username in the socket session for this client
        //socket.username = username;

        var newPlayer = Player();
        newPlayer.setName(username);
        newPlayer.setRacket(racket());

        PlayersCollection.addPlayer(newPlayer);

        socket.emit('login', {
            numUsers: PlayersCollection.getCount(),
            username: newPlayer.getName(),
            id: newPlayer.getId()
        });
        //// echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: newPlayer.getName(),
            numUsers: PlayersCollection.getCount(),
            team: newPlayer.getTeam()
        });

        socket.on('move racket', function (data) {

            var player = PlayersCollection.getPlayerById(data.id);
            //console.log(player);
            var r = player.getRacket();

            r.setX(data.x);
            r.setY(data.y);

            socket.broadcast.emit('show racket', {
                'id': data.id,
                'x': data.x,
                'y': data.y
            });
        });

        socket.on('how played', function (data) {
            console.log('who is turn', data);

            socket.broadcast.emit('who is turn', {
                'userId': PlayersCollection.getWhoIsTurn(data.userId)
            });
        });

        socket.on('ball position', function (data) {
            //console.log(data);

            socket.broadcast.emit('ball position', {
                'x': data.x,
                'y': data.y,
            });
        });

        // when the user disconnects.. perform this
        socket.on('disconnectUser', function (data) {

            PlayersCollection.removeById(data.id);

            //@todo remove racket

            //  // echo globally that this client has left
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: PlayersCollection.getCount()
            });
            socket.disconnect();
        });
    });


});
