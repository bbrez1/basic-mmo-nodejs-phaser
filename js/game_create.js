Game.create = function () {
    Game.playerMap = {};



    var testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    testKey.onDown.add(Client.sendTest, this);



    // WORLD AND GRAPHICS
    game.world.setBounds(0, 0, 1920, 1920);

    var map = game.add.tilemap('map');
    map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file

    var layer;
    for (var i = 0; i < map.layers.length; i++) {
        layer = map.createLayer(i);
    }



    // PHYSICS
    game.physics.startSystem(Phaser.Physics.ARCADE);
    group = game.add.physicsGroup();



    //var bigCircle = Game.drawCircle();


    // KEYS
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    sprintKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);

    inventoryKeyOne = game.input.keyboard.addKey(Phaser.Keyboard.ONE);


    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(10, 'arrow');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);




    sssprite = game.add.sprite(200, 300, 'sprite');
    game.physics.arcade.enable(sssprite);
    sssprite.body.immovable = true;
    group.add(sssprite);
    // MAP GENERATION



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
