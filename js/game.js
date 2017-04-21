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

var movementSpeed = 500;

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
var bulletNumber = 0;
var weapon;


// UI
var playerHealthBar;

var CONNECTED = false;


var bullets;

var fireRate = 100;
var nextFire = 0;

var enemies;

var text;


Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function () {
    // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL ;


   

    // map
    game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
    game.load.image('sprite', 'assets/sprites/smallplane.png');

    // weapons
    game.load.image('arrow', 'assets/sprites/bullet.png');

    game.load.image('land', 'assets/sprites/land.png');

    game.load.image('cloudBig', 'assets/sprites/cloud1.png');
    game.load.image('cloudMid', 'assets/sprites/cloud2.png');
    game.load.image('cloudSmall', 'assets/sprites/cloud3.png');

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
    Game.playerMap[id].anchor.set(0.5, 0.5);

    Game.playerMap[id].playerId = id;

    // is local player
    if (id == CurrentPlayerId) {
        game.camera.follow(Game.playerMap[id], Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        // physics
        game.physics.arcade.enable(Game.playerMap[id]);
        game.physics.enable(Game.playerMap[id], Phaser.Physics.ARCADE);

        Game.playerMap[id].body.collideWorldBounds = true;

        Game.playerMap[id].body.allowRotation = false;
    }
    else
    {
        enemies.add(Game.playerMap[id]);
    }
};

function fire() {

    
    if (game.time.now > nextFire && bullets.countDead() > 0) {

        bulletNumber++;

        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        if ((bulletNumber % 2) == 0) {
            bullet.reset(Game.playerMap[CurrentPlayerId].x - 15, Game.playerMap[CurrentPlayerId].y - 15);
        }
        else
        {
            bullet.reset(Game.playerMap[CurrentPlayerId].x + 15, Game.playerMap[CurrentPlayerId].y + 15);
        }

        game.physics.arcade.moveToPointer(bullet, 2000);

        bullet.rotation = game.physics.arcade.angleToPointer(bullet);


        /*
        game.physics.arcade.moveToXY(
            bullet,
            game.input.x, // target x position
            game.input.y, // keep y position the same as we are moving along x axis
            2000);
        */
    }
    
}



Game.sendMovement = function ()
{
    if (CurrentPlayerId != null && CONNECTED)
    {
		Client.sendClick(
		Game.playerMap[CurrentPlayerId].position.x,
        Game.playerMap[CurrentPlayerId].position.y,
        Game.playerMap[CurrentPlayerId].rotation);
	}	
}

Game.movePlayer = function(id,x,y,rotation) {
    if (id != CurrentPlayerId && CONNECTED) // if is not local
	{
		Game.playerMap[id].position.x = x;
        Game.playerMap[id].position.y = y;
        Game.playerMap[id].rotation = rotation;
	}
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

Game.changeHealth = function (data) {
    playerHealth = data.health;
};




// collision handlers













function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function processHandler(player, veg) {

    Client.sendTakeDamagePlayer(20, veg.playerId);
    console.log(veg.playerId);

    return true;

}

function collisionHandler(player, veg) {

    return true;

    /*
    if (veg.frame == 17) {
        veg.kill();
    }
    */
}