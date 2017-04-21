Game.update = function () {

    // if local player is set
    if (CurrentPlayerId != null && Game.playerMap[CurrentPlayerId] != null) {
        Game.playerMap[CurrentPlayerId].rotation = game.physics.arcade.angleToPointer(Game.playerMap[CurrentPlayerId]);

        text.x = Math.floor(Game.playerMap[CurrentPlayerId].x);
        text.y = Math.floor(Game.playerMap[CurrentPlayerId].y - 50);

        playerHealthBar.setPosition(Game.playerMap[CurrentPlayerId].x, Game.playerMap[CurrentPlayerId].y + 50);
    }

    if (game.input.activePointer.isDown) {
        fire();
    }


    if (sprintKey.isDown) {
        movementSpeed = 5;
    }
    else
    {
        movementSpeed = 3;
    }



    if (inventoryKeyOne.isDown) {
        Client.sendTakeDamage(-0.2);
    }




    if (upKey.isDown) {
        Game.playerMap[CurrentPlayerId].position.y -= movementSpeed;
        PlayerMoved = true;
    }
    else if (downKey.isDown) {
        Game.playerMap[CurrentPlayerId].position.y += movementSpeed;
        PlayerMoved = true;
    }

    if (leftKey.isDown) {
        Game.playerMap[CurrentPlayerId].position.x -= movementSpeed;
        PlayerMoved = true;
    }
    else if (rightKey.isDown) {
        Game.playerMap[CurrentPlayerId].position.x += movementSpeed;
        PlayerMoved = true;
    }

    if (PlayerMoved) {
        Game.sendMovement();
        PlayerMoved = false;
    }

    /*
    if (game.physics.arcade.overlap(Game.playerMap[CurrentPlayerId], sssprite, collisionHandler, processHandler, this)) {
        console.log('boom');
    }*/

    if (game.physics.arcade.overlap(Game.playerMap[CurrentPlayerId], group, collisionHandler, processHandler, this)) {
        //playerHealth -= 0.2;
        //playerHealthBar.setPercent(playerHealth);
        Client.sendTakeDamage(0.2);
    }

    playerHealthBar.setPercent(playerHealth);

}