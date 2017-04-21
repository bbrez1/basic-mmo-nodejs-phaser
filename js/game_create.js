Game.create = function () {
    Game.playerMap = {};


    var testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    testKey.onDown.add(Client.sendTest, this);



    // WORLD AND GRAPHICS
    game.world.setBounds(0, 0, 5000, 5000);

    var map = game.add.tilemap('map');
    map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file

    game.stage.backgroundColor = "#94D5D9";


    /*
    var layer;
    for (var i = 0; i < map.layers.length; i++) {
        layer = map.createLayer(i);
    }
    */


    // PHYSICS
    game.physics.startSystem(Phaser.Physics.ARCADE);
    group = game.add.physicsGroup();

    enemies = game.add.physicsGroup();

    //var bigCircle = Game.drawCircle();


    // KEYS
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    sprintKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);

    inventoryKeyOne = game.input.keyboard.addKey(Phaser.Keyboard.ONE);




    for (i = 0; i < 100; i++) {
        var xx = getRandomInt(1, 5000);
        var yy = getRandomInt(1, 5000);
        var size = game.rnd.realInRange(1, 4);
        var rotation = game.rnd.realInRange(1, 360);
        var cloudVariation = getRandomInt(1, 5);

        var cloud = "cloudBig";

        if (cloudVariation == 3) {
            cloud = "cloudMid";
        }

        cloudSprite = game.add.sprite(xx, yy, cloud);

        cloudSprite.scale.setTo(size, size);
        cloudSprite.rotation = rotation;
    }







    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(1000, 'arrow');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('bulletAngleVariance', 10);


    /*
    sssprite = game.add.sprite(200, 300, 'sprite');
    game.physics.arcade.enable(sssprite);
    sssprite.body.immovable = true;
    group.add(sssprite);
    // MAP GENERATION
    */



    // MULTIPLAYER
     



    // PLAYER STUFF
    // HEALTHBAR
    var barConfig = {
        x: 70,
        y: 20,
        width: 80,
        height: 8,
        bg: {
            color: 'red'
        },
        bar: {
            color: 'green'
        },
        animationDuration: 1,
        flipped: false
    };
    playerHealthBar = new HealthBar(this.game, barConfig);
    //playerHealthBar.setPercent(50);
    //playerHealthBar.setFixedToCamera(true);



    var style = { font: "10px Arial", fill: "#fff", align: "center", stroke: "#000", strokeThickness: 4};

    text = game.add.text(0, 0, "THATGUY", style);
    text.anchor.set(0.5);

    // PLAYERS CONNECT
    Client.askNewPlayer();

};
