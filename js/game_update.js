Game.update = function () {

    // if local player is set
    if (CurrentPlayerId != null && Game.playerMap[CurrentPlayerId] != null && CONNECTED) {
        Game.playerMap[CurrentPlayerId].rotation = game.physics.arcade.angleToPointer(Game.playerMap[CurrentPlayerId]);

        text.x = Math.floor(Game.playerMap[CurrentPlayerId].x);
        text.y = Math.floor(Game.playerMap[CurrentPlayerId].y - 50);

        playerHealthBar.setPosition(Game.playerMap[CurrentPlayerId].x, Game.playerMap[CurrentPlayerId].y + 50);


        if (game.physics.arcade.distanceBetween(Game.playerMap[CurrentPlayerId], game.input.mousePointer) > 20) {
            game.physics.arcade.moveToPointer(Game.playerMap[CurrentPlayerId], movementSpeed);
        }

        Game.sendMovement();
    }

    if (game.input.activePointer.isDown) {
        fire();
    }


    if (sprintKey.isDown) {
        movementSpeed = 800;
    }
    else
    {
        movementSpeed = 500;
    }



    if (inventoryKeyOne.isDown) {
        Client.sendTakeDamage(-0.2);
    }

    //game.physics.moveToObject(displayObject, objectToFollow, speed, maxTime)

        //Game.playerMap[CurrentPlayerId].rotation = game.physics.arcade.moveToPointer(Game.playerMap[CurrentPlayerId], 60, game.input.activePointer, 500);






    
    if (game.physics.arcade.overlap(bullets, enemies, collisionHandler, processHandler, this)) {
        //Client.sendTakeDamage(0.2);
    }
    
    /*
    if (game.physics.arcade.overlap(Game.playerMap[CurrentPlayerId], group, collisionHandler, processHandler, this)) {
        //playerHealth -= 0.2;
        //playerHealthBar.setPercent(playerHealth);
        Client.sendTakeDamage(0.2);
    }
    */

    playerHealthBar.setPercent(playerHealth);

}