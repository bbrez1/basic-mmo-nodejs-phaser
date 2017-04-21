/**
 * Created by Jerome on 03-03-17.
 */

var Client = {};
Client.socket = io.connect(); // By default to localhost?

Client.socket.on('connect', function () {

    CurrentPlayerId = Client.socket.id;
    console.log(CurrentPlayerId);

});

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};

Client.askNewPlayer = function(){
    Client.socket.emit('newplayer');
};

Client.sendClick = function(x,y,rotation){
  Client.socket.emit('click',{x:x,y:y,rotation:rotation});
};

Client.socket.on('newplayer',function(data){
    Game.addNewPlayer(data.id,data.x,data.y);
});

Client.socket.on('allplayers',function(data){
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y);
    }

    CONNECTED = true;

});

Client.socket.on('move', function (data) {
    Game.movePlayer(data.id, data.x, data.y, data.rotation);
});

Client.socket.on('remove', function (id) {
    Game.removePlayer(id);
});




// player

Client.socket.on('healthChange', function (data) {
    if (data.id == CurrentPlayerId)
        Game.changeHealth(data);
});

/*
Client.sendTakeDamage = function (damage) {
    Client.socket.emit('takedamage', damage);
};*/

Client.sendTakeDamagePlayer = function (damage, playerId) {
    Client.socket.emit('takedamage', { d: damage, p: playerId});
};