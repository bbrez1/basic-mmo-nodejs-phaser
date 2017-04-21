/**
 * Created by Jerome on 03-03-16.
 */
/*
 * Author: Jerome Renaux
 * E-mail: jerome.renaux@gmail.com
 */

var Game = {};

// Local Player Variables
var CurrentPlayerId;
var LocalPlayer;
var PlayerMoved = false;

var movementSpeed = 4;

// Collision Groups
var group;

// Keyboard setup
var upKey;
var downKey;
var leftKey;
var rightKey;
var sprintKey;

var inventoryKeyOne;

// Some sprites
var sssprite;
var ssspriteTo;

// Local Player Stuff
var playerHealth = 100;


// UI
var playerHealthBar;


var bullets;

var fireRate = 1500;
var nextFire = 0;



var text;


Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function () {
    // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL ;

    // map
    game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
    game.load.image('sprite', 'assets/sprites/human.png');

    // weapons
    game.load.image('arrow', 'assets/sprites/arrow.png');

    game.time.advancedTiming = true;

};

Game.getCoordinates = function(layer,pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

Game.getCoordinatesXY = function(x, y){
    Client.sendClick(x, y);
};

Game.addNewPlayer = function(id,x,y){
	
    Game.playerMap[id] = game.add.sprite(x, y, 'sprite');
    Game.playerMap[id].anchor.set(0.5);

    // is local player
    if (id == CurrentPlayerId) {
        game.camera.follow(Game.playerMap[id], Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        // physics
        game.physics.arcade.enable(Game.playerMap[id]);
        Game.playerMap[id].body.collideWorldBounds = true;

        console.log('physics enabled on ' + id);

    }
};

function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0) {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(Game.playerMap[CurrentPlayerId].x - 8, Game.playerMap[CurrentPlayerId].y - 8);

        game.physics.arcade.moveToPointer(bullet, 800);
        bullet.rotation = game.physics.arcade.angleToPointer(bullet);
    }

}





Game.sendMovement = function ()
{
	if(CurrentPlayerId != null)
    {
		Client.sendClick(
		Game.playerMap[CurrentPlayerId].position.x,
		Game.playerMap[CurrentPlayerId].position.y);		
	}	
}

Game.movePlayer = function(id,x,y) {
	if(id != CurrentPlayerId) // if is not local
	{
		Game.playerMap[id].position.x = x;
		Game.playerMap[id].position.y = y;
	}
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

Game.changeHealth = function (data) {
    playerHealth = data.health;
    console.log(data.health);
};




// collision handlers
















function processHandler(player, veg) {

    return true;

}

function collisionHandler(player, veg) {

    if (veg.frame == 17) {
        veg.kill();
    }

}