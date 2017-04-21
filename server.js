//TODO: add package.json
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

server.lastPlayderID = 0;
server.playersList = [];

server.listen(process.env.PORT || 80, function(){
    console.log('Listening on ' + +server.address().ip + server.address().port);
});

io.on('connection',function(socket){

	console.log('client connected: ' + socket.id);	
	
    socket.on('newplayer', function () {

        // player information
        socket.player = {
            id: socket.id,
            rotation: 0,
            x: randomInt(100, 400),
            y: randomInt(100, 400)
        };

        socket.playerInventory =
        [
            { type: 'sword', name: 'DA BOMBZOR', damage: '10' },
            { type: 'axe', name: 'DA BOMBZOR', damage: '5' }
        ];

        socket.playerInformation = {
            id: socket.id,
            health: 100
        };



        socket.emit('allplayers',getAllPlayers());
        socket.broadcast.emit('newplayer', socket.player);


        // PLAYER MOVEMENT
        socket.on('click',function(data){
            //console.log(socket.player.id + ' move to ' + data.x + ', ' + data.y);
            socket.player.x = data.x;
            socket.player.y = data.y;
            socket.player.rotation = data.rotation;
            io.emit('move', socket.player);
        });


        // PLAYER TAKES DAMAGE
        socket.on('takedamage', function (data) {
            socket.playerInformation.health -= data.d;
            socket.playerInformation.id = data.p;

            console.log(data.d + " takes " + data.p + " damage");

            // send new health to player
            //io.to(socket.id).emit('healthChange', socket.playerInformation);
            io.emit('healthChange', socket.playerInformation);

            if (socket.playerInformation.health <= 0)
            {
                console.log("JUST DIED");
                io.emit('remove', data.p);
            }

        });

        socket.on('disconnect', function(){
            io.emit('remove', socket.player.id);
        });
    });

    socket.on('test', function(){
        console.log(socket.playerInventory);
    });

});

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
