# Anjana's Fury

## Description
A beat ‘em up game (based on Final Fight a 1989 arcade game) made with DOM manipulation, JavaScript and Canvas. If you press ‘select’ on character screen you will receive a surprise.

This is my Ironhack first module project.


## Data structure
- Class Game - controls game logic (Start, Pause, Game Over, Characters collisions...)
  - Properties: canvas, ctx, stage, player, timer, newEnemyTimer, enemies, controlsPressed, fps, state, cb
  - Methods:
    - gameStart (create the stage)
    - gamestatus (check when the game is over)
    - clear (clear canvas)
    - drawElements (draw player, enemies, items, stage...)
    - refresh (clear and draw canvas)
    - gamePause
    - gameResume
    - gameContinue
    - gameChangePhase
    - gameOver
    - youWin
    - moveEnemies
    - generateControls
    - checkCollisions (checks all collisions)
    - checkItemCollisions
    - checkEnemyCollisions
    - collisions (check side collisions)
    - createPlayer
    - createStage
    - createEnemy
- Class Stage - Define each Stage of the game
  - Properties: name, phases, currentPhase, position (x, y), item, timeout, totalEnemiesLeft
  - Methods:
    - createItem
    - updateTimeout
    - drawStage
    - parallax (creates parallax effect to the background)
    - canMoveX (controls x axis limits)
    - canmoveY (controls y axis limits)
    - removeItem (when taken by player)
- Class Player - Define the character choosen by the player
  - Properties: name, health, strength, speed, sprites, initial position (x, y)
  - Methods:
    - drawPlayer (draw the player on the canvas)
    - changeSprite (change the sprite: walking, idle...)
    - moveRight
    - moveLeft
    - moveUp
    - moveDown
    - punch
    - kick
    - hook
    - take
    - receiveDamage
    - isDead
- Class Enemy - Define the random enemy created by game
  - Properties: name, health, strength, speed, reward, sprites, initial position (x, y).
  - Methods:
    - drawEnemy (draw the enemy on the canvas)
    - changeSprite (change the sprite: walking, idle...)
    - move
    - chasePlayer (method to chase Player along the stage)
    - checkDirection (method to turn enemies to face to player)
    - attack
    - receiveDamage
    - isDead
- Class Item - Define como serán los objetos del juego
  - Properties: phaseXLimits, phaseYLimits, rewardPoints, rewardHealth, obstacleSprite, rewardSprite, sprite, position (x, y), health.
  - Methods:
    - randomSprite (select one random reward item)
    - randomPosition (draw item randomly on stage)
    - receiveDamage
    - checkStatus (show reward when item is broken)
- Class Sprite - This class defines how the sprites will be drawn on canvas
  - Properties: url, src, sSize, dSize, speed, frames, currentFrame, framesCount, loop.
  - Methods:
    - updateSprite (updates sprite to make the move)
    - drawSprite (draw any sprite)



## States y States Transitions

- **Start screen**: show logo, then intro with music and pressing any valid key, shows character select screen
- **Game screen**: shows the Stage with player, enemies and rewards drawn on the canvas. Also shows player and stage stats on DOM.
- **Game Over screen**: shows player game over animation with DOM, and two buttons with **restart** and **resume** options.
- **You Win screen**: shows player happy!!!


### [Deploy](https://jdej.github.io/AnjanasFury/)


### [Trello](https://trello.com/invite/b/OvucErTG/3226cb0fe22c1e9d01ebe6b6e9d76459/anjanas-fury)


### [Slides](https://slides.com/jdej/deck)
