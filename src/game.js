class Game{
  constructor (canvas, ctx, playerName){
    this.canvas = canvas;
    this.ctx = ctx;
    this.stage = this.createStage('slum'); //default stage
    this.player = this.createPlayer(playerName);
    this.timer = new Timer(this.stage.timeout);
    this.newEnemyTimer = new Timer(6); //new enemy every 6 seconds
    this.enemies = []; //enemies array in screen
    this.controlsPressed = [];
    this.fps = undefined; //canvas animation id
    this.state = 'stopped'; //game state: [stopped, running, paused]
    this.cb = {}; //callbacks object of main.js 
  }

  gameStart (pause, resume, gameOver, updateStats, statistics, removePlayerStats){ //cb of main
    this.state = 'running';
    this.cb.pause = pause;
    this.cb.resume = resume;
    this.cb.gameOver = gameOver;
    this.cb.updateStats = updateStats;
    this.cb.createStats = statistics;
    this.cb.removePlayerStats = removePlayerStats;
    this.timer.start();
    this.newEnemyTimer.start();
    this.refresh();
  }

  gameStatus(){
    //time and player health checks
    if ((this.timer.timeLeft <= 0)||(this.player.health <= 0)){
      this.gameOver();
    }else{
      
      //change phase/stage
      if ((this.player.x >= phasePass[this.stage.name][this.stage.currentPhase].x) &&
          (this.stage.x <= phasePass[this.stage.name][this.stage.currentPhase].stageX)&&
          (this.player.y > phasePass[this.stage.name][this.stage.currentPhase].minY) &&
          (this.player.y <= phasePass[this.stage.name][this.stage.currentPhase].maxY)){
            this.state = 'stopped';
            //Paso a la siguiente Phase
            if (this.stage.currentPhase < (this.stage.phases.length-1)){
              this.stage.currentPhase++;
              this.gameChangePhase(this.player.lives);
            }else if (this.stage.name === 'slum'){
              this.stage = this.createStage('subway');
              this.gameChangePhase(this.player.lives);
            }else{
              this.youWin();
            }
      }

      //item check
      if (this.stage.item){
        this.stage.item.checkStatus();
      }

      //new enemy check
      if (this.newEnemyTimer.timeLeft <= 0){
        if(this.stage.totalEnemiesLeft > 0){
          this.enemies.push(this.createEnemy());
          this.stage.totalEnemiesLeft--;
          this.newEnemyTimer.reset();
        }else{
          this.newEnemyTimer.stop();
        }
      }
  
      //refresh animation
      this.refresh();
    }

  }

  clear (){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawElements (){
    //drawStage
    this.stage.drawStage(this.ctx, this.player.x, this.player.y);

    //drawObjects
    if (this.stage.item)
      this.stage.item.sprite.drawSprite(this.ctx, this.stage.item.x, this.stage.item.y);
    
    // //drawEnemies
    if (this.enemies.length > 0)
      this.enemies.forEach((enemy)=>enemy.drawEnemy(this.ctx));

    //drawPlayer
    this.player.drawPlayer(this.ctx);

    //updateStats
    this.cb.updateStats(this.player.lives, this.player.score, this.timer.timeLeft);
  }

  refresh (){
    //calculo desviación en los fps por culpa de una bajada de rendimiento
    this.currentTs = new Date();
    this.delta = (this.currentTs - (this.lastTs || this.currentTs)) || 16.6;
    this.lastTs = this.currentTs;

    this.clear();

    // checkCollisions
    this.checkCollisions();

    if (this.stage.item)
      this.checkItemCollisions(this.player, this.stage.item);

    if (this.enemies.length > 0){
      this.moveEnemies();
    }
    
    this.drawElements();
    this.generateControls();
    this.fps = window.requestAnimationFrame(this.gameStatus.bind(this));
  }

  gamePause (){
    this.state = 'paused';
    //detengo el canvas
    this.fps = window.cancelAnimationFrame(this.fps);
    this.fps = undefined;
    //detengo el timer
    this.timer.stop();
    //llamo al cb de main.js para que añada la pantalla de pausa al DOM
    this.cb.pause();
  }

  gameResume (){
    //llamo al cb de main.js para que borre la pantalla de pause del DOM
    this.cb.resume();
    this.state = 'running';
    //arranco el timer
    this.timer.start();
    //arranco el canvas de nuevo
    this.gameStatus();
  }

  //Reinicio la phase despues de darle a CONTINUE
  gameContinue (lives){
    this.cb.resume();
    this.cb.createStats(this.player.name);
    this.gameChangePhase(lives);
  }

  gameChangePhase (lives){
    this.state = 'running';
    this.enemies = [];
    this.stage.createItem();
    this.player.x = this.stage.phases[this.stage.currentPhase].x.minX + 65;
    this.player.y = this.stage.phases[this.stage.currentPhase].y.minY - 170;
    this.stage.x = 0;
    this.stage.y = 0;
    this.player.lives = lives;
    this.stage.updateTimeout();
    this.timer = new Timer(this.stage.timeout);
    this.fps = window.cancelAnimationFrame(this.fps);
    this.fps = undefined;
    this.timer.start();
    this.newEnemyTimer.reset();
    this.gameStatus();
  }

  gameOver (){
    this.state = 'stopped';
    this.fps = window.cancelAnimationFrame(this.fps);
    this.fps = undefined;
    this.clear();
    this.timer.stop(); 
    this.cb.gameOver(this.player.name, this);
  }

  youWin (){
    console.log('You win!!!!!');
  }

  moveEnemies (){
    this.enemies.forEach((enemy)=>enemy.move(this.delta, this.player));
  }

  generateControls (){
    if(this.state === 'running'){
      // Controlando la PAUSA con document.onkeydown
      document.onkeydown = (e) => {
        if (e.keyCode === 32){
          if (this.fps){
            this.gamePause();
          }else{
            this.gameResume();
          }
        }
      };

      window.addEventListener('keydown', (pressed) => {
        this.controlsPressed[pressed.keyCode] = true;
      });
  
      window.addEventListener('keyup', (pressed) => {
        this.controlsPressed[pressed.keyCode] = false;
        this.player.still();
      });
  
      if (this.controlsPressed[87]) {
        this.player.moveUp(this.stage, this.delta);
      }
      if (this.controlsPressed[83]) {
        this.player.moveDown(this.stage, this.delta);
      }
      if (this.controlsPressed[65]) {
        this.player.moveLeft(this.stage, this.delta);
        this.stage.parallax(this.player.x, this.player.vel, this.enemies);
      }
      if (this.controlsPressed[68]) {
        this.player.moveRight(this.stage, this.delta);
        this.stage.parallax (this.player.x, this.player.vel, this.enemies);
      }
      if (this.controlsPressed[65] && this.controlsPressed[68]){
        this.player.still();
      }

      if (this.controlsPressed[74]) {
        this.player.punch();
      }
      if (this.controlsPressed[75]) {
        this.player.kick();
      }
      if (this.controlsPressed[76]) {
        this.player.hook();;
      }
      if (this.controlsPressed[73]) {
        this.player.take();
      } 
    }
  }

  checkCollisions (){
  
    //Checks Player-Item collision
    if (this.stage.item)
      this.checkItemCollisions(this.player, this.stage.item);

    //Checks Player-Enemies collision
    if(this.enemies.length > 0){
      this.enemies.forEach((enemy, index, enemiesArray)=> {
        this.checkEnemyCollisions(this.player, enemy)
        if (enemy.health <= 0)
          enemiesArray.splice(index, 1); //Borrar los enemigos con 0 de vida
      });
    }
    
  }

  checkItemCollisions (player, item){
    const collisionDirection = this.collisions(player, item);

    if (collisionDirection){

      switch (collisionDirection){
        case 'right':
          player.x = item.x + item.sprite.dSize.width + 1; //sumo 1px para que no se quede justo pegado  
          break;
        case 'left':
          player.x = item.x - player.sprite.dSize.width - 1; //resto 1px para que no se quede justo pegado 
          break;
        case 'over':
          player.y = item.y - 30;
          break;
        case 'under':
          player.y = item.y + 35;
          break;
      }

      if (collisionDirection === 'left' || collisionDirection === 'right'){
        //controlo si es un obstacle o una reward
        if (item.sprite === item.rewardSprite){
          if (player.sprite === player.sprites.takeRight || player.sprite === player.sprites.takeLeft){
            //update player stats
            if (this.stage.item){
              this.player.score += item.rewardPoints;
              this.player.health += item.rewardHealth;
              this.stage.removeItem();
            } 
          }
        }else{
          //controlo que solo pueda romper el objeto si hago punch, kick o hook
          if (player.sprite === player.sprites.punchRight || player.sprite === player.sprites.punchLeft ||
            player.sprite === player.sprites.kickRight || player.sprite === player.sprites.kickLeft ||
            player.sprite === player.sprites.hookRight || player.sprite === player.sprites.hookLeft){
          
            item.receiveDamage (player.strength);            
          }
        }
      }
    }
  }

  checkEnemyCollisions (player, enemy){
    const collisionDirection = this.collisions(player, enemy);

    if (collisionDirection){

      switch (collisionDirection){
        case 'right':
          enemy.x = player.x - player.sprite.dSize.width; 
          break;
        case 'left':
          enemy.x = player.x + enemy.sprite.dSize.width;
          break;
        case 'over':
          enemy.y = player.y + 30;
          break;
        case 'under':
          enemy.y = player.y - 35;
          break;
      }

      if (collisionDirection === 'left' || collisionDirection === 'right'){
        
        //controlo que solo pueda herir si hago punch, kick o hook
        if (player.sprite === player.sprites.punchRight || player.sprite === player.sprites.punchLeft ||
          player.sprite === player.sprites.kickRight || player.sprite === player.sprites.kickLeft ||
          player.sprite === player.sprites.hookRight || player.sprite === player.sprites.hookLeft){
        
          if (!enemy.receiveDamage (player.strength)){
            this.player.score += enemy.reward;
          }           
        }else{
          player.receiveDamage(enemy.attack());
        }
      }
    }else{
      enemy.changeSprite('go');
    }

  }

  //devuelve si están colisionando dos objetos y por donde
  collisions (obj1, obj2){

    let obj1TotalWitdh = obj1.x + obj1.sprite.dSize.width;
    let obj1TotalHeight = obj1.y + obj1.sprite.dSize.height;
    let obj1Axis = obj1.x + Math.floor(obj1.sprite.dSize.width / 2); //obj1 sprite center axis
    let obj2TotalWitdh = obj2.x + obj2.sprite.dSize.width;
    let obj2TotalHeight = obj2.y + obj2.sprite.dSize.height + 10;

    if (obj1.x < obj2TotalWitdh && 
        obj1TotalWitdh > obj2.x && 
        obj1.y + 200 < obj2TotalHeight &&
        obj1TotalHeight > obj2.y + 200){
      
      if ((obj1Axis > obj2.x) && obj1Axis < obj2TotalWitdh && ((obj1TotalHeight + 20) >= obj2TotalHeight)){ //estoy debajo
        return 'under';
      }else if ((obj1Axis > obj2.x) && obj1Axis < obj2TotalWitdh && (obj1TotalHeight <= (obj2TotalHeight - 20))){ //estoy encima
        return 'over';
      }else if ((obj1TotalWitdh > obj2.x) && (obj1TotalWitdh < obj2TotalWitdh)){ //estoy a la izquierda
        return 'left';
      }else if ((obj1.x < obj2TotalWitdh) && (obj1TotalWitdh > obj2TotalWitdh)){ //estoy a la derecha
        return 'right';
      }
    }

    return undefined;
  }

  //Instancio el player seleccionado en el DOM
  createPlayer (playerName){
    let player, playerSprites;
    switch (playerName){
      case 'cody':
        playerSprites = {
          stillRight: new Sprite('img/cody.png',{x:0,y:0},{width:54, height:93},{width:129, height:222},0,1,false),
          stillLeft: new Sprite('img/cody.png',{x:0,y:95},{width:54, height:93},{width:129, height:222},0,1,false),
          
          goRight: new Sprite('img/cody.png',{x:54,y:0},{width:62, height:95},{width:145, height:222},3,10,true),
          goLeft: new Sprite('img/cody.png',{x:54,y:95},{width:62, height:95},{width:145, height:222},3,10,true),
          
          punchRight: new Sprite('img/cody.png',{x:0,y:190},{width:85, height:90},{width:210, height:222},3,2,true),
          punchLeft: new Sprite('img/cody.png',{x:0,y:280},{width:85, height:90},{width:210, height:222},3,2,true),
          
          kickRight: new Sprite('img/cody.png',{x:502,y:190},{width:65, height:88},{width:164, height:222},3,3,true),
          kickLeft: new Sprite('img/cody.png',{x:502,y:278},{width:65, height:88},{width:164, height:222},3,3,true),
          
          hookRight: new Sprite('img/cody.png',{x:170,y:190},{width:83, height:111},{width:166, height:222},3,4,true),
          hookLeft: new Sprite('img/cody.png',{x:170,y:301},{width:83, height:111},{width:166, height:222},3,4,true),
          
          takeRight: new Sprite('img/cody.png',{x:443,y:412},{width:54, height:93},{width:129, height:222},5,1,false),
          takeLeft: new Sprite('img/cody.png',{x:443,y:505},{width:54, height:93},{width:129, height:222},5,1,false),
          
          dieRight: new Sprite('img/cody.png',{x:0,y:412},{width:97, height:96},{width:225, height:222},5,4,false),
          dieLeft: new Sprite('img/cody.png',{x:0,y:508},{width:97, height:96},{width:225, height:222},5,4,false),
          
          damageRight: new Sprite('img/cody.png',{x:388,y:412},{width:55, height:84},{width:148, height:222},0,1,false),
          damageLeft: new Sprite('img/cody.png',{x:388,y:496},{width:55, height:84},{width:148, height:222},0,1,false),
        };
        player = new Player('cody', 15000, 50, 10, playerSprites, this.stage.phases[this.stage.currentPhase].x.minX + 65, this.stage.phases[this.stage.currentPhase].y.minY-170);
        break;
      case 'haggar':
        playerSprites = { 
          stillRight: new Sprite('img/haggar.png',{x:0,y:0},{width:81, height:93},{width:193, height:222},0,1,false),
          stillLeft: new Sprite('img/haggar.png',{x:0,y:100},{width:81, height:93},{width:193, height:222},0,1,false),
          
          goRight: new Sprite('img/haggar.png',{x:81,y:0},{width:85, height:100},{width:189, height:222},4,8,true),
          goLeft: new Sprite('img/haggar.png',{x:81,y:100},{width:85, height:100},{width:189, height:222},4,8,true),
          
          punchRight: new Sprite('img/haggar.png',{x:0,y:200},{width:113, height:86},{width:291, height:222},4,2,true),
          punchLeft: new Sprite('img/haggar.png',{x:0,y:286},{width:113, height:86},{width:291, height:222},4,2,true),
          
          kickRight: new Sprite('img/haggar.png',{x:0,y:398},{width:123, height:93},{width:294, height:222},4,3,true),
          kickLeft: new Sprite('img/haggar.png',{x:0,y:491},{width:123, height:93},{width:294, height:222},4,3,true),
          
          hookRight: new Sprite('img/haggar.png',{x:226,y:200},{width:110, height:99},{width:247, height:222},4,4,true),
          hookLeft: new Sprite('img/haggar.png',{x:226,y:299},{width:110, height:99},{width:247, height:222},4,4,true),
          
          takeRight: new Sprite('img/haggar.png',{x:369,y:398},{width:81, height:93},{width:193, height:222},5,1,false),
          takeLeft: new Sprite('img/haggar.png',{x:369,y:491},{width:81, height:93},{width:193, height:222},5,1,false),
          
          dieRight: new Sprite('img/haggar.png',{x:75,y:584},{width:133, height:96},{width:308, height:222},5,2,false),
          dieLeft: new Sprite('img/haggar.png',{x:75,y:680},{width:133, height:96},{width:308, height:222},5,2,false),
          
          damageRight: new Sprite('img/haggar.png',{x:0,y:584},{width:75, height:96},{width:174, height:222},0,1,false),
          damageLeft: new Sprite('img/haggar.png',{x:0,y:680},{width:75, height:96},{width:174, height:222},0,1,false),
        };
        player = new Player('haggar', 15000, 70, 5, playerSprites, this.stage.phases[this.stage.currentPhase].x.minX + 65, this.stage.phases[this.stage.currentPhase].y.minY-170);
        break;
    }
    return player;
  }

  //Instancio el stage actual
  createStage (stageName){
    let phasesSprites;
    
    switch (stageName) {
      case 'slum':
        //stage backgrounds sprites
        const st1P1l0 = new Sprite('img/stage1.png',{x:0,y:0},{width:1296, height:160},{width:3038, height:375},0, 1);
        const st1P1l1 = new Sprite('img/stage1.png',{x:0,y:167},{width:1296, height:256},{width:3038, height:600},0, 1);
        const st1P2l0 = new Sprite('img/stage1.png',{x:1304,y:0},{width:608, height:256},{width:1426, height:600},0, 1);
        const st1P3l0 = new Sprite('img/stage1.png',{x:1918,y:257},{width:944, height:160},{width:2212, height:375},0, 1);
        const st1P3l1 = new Sprite('img/stage1.png',{x:1918,y:0},{width:944, height:256},{width:2212, height:600},0, 1);
        
        phasesSprites = [
          new Phase(3038, [st1P1l0, st1P1l1], {minX: 46, maxX: 2880}, {minY: 465, maxY: 592}, 860,false),
          new Phase(1426, [st1P2l0], {minX: 60, maxX: 1426}, {minY: 470, maxY: 592}, 900,false),
          new Phase(2212, [st1P3l0, st1P3l1], {minX: 220, maxX: 2077}, {minY: 490, maxY: 592}, 800,false)
        ];
        break;
    
      case 'subway':
        //stage backgrounds sprites
        const st2P1l0 = new Sprite('img/stage2.png',{x:0,y:0},{width:2512, height:256},{width:5888, height:600},0, 1);
        const st2P1l1 = new Sprite('img/stage2.png',{x:0,y:272},{width:2512, height:142},{width:5940, height:350},0, 1);
        const st2P2l0 = new Sprite('img/stage2.png',{x:0,y:426},{width:2400, height:255},{width:5647, height:600},0, 1);
        
        phasesSprites = [
          new Phase(5888, [st2P1l0], {minX: 270, maxX: 5880}, {minY: 453, maxY: 592}, 870,false),
          //new Phase(5888, [st2P1l0, st2P1l1], {minX: 400, maxX: 5908}, {minY: 453, maxY: 592}, 944,false)
          new Phase(5647, [st2P2l0], {minX: 39, maxX: 5600}, {minY: 452, maxY: 592}, 870,false)
        ];
        break;
    }

    return new Stage (stageName, phasesSprites);
  }

  createEnemy (){
    let enemy, enemySprites;
    const randomEnemy = enemiesArray[Math.floor(Math.random() * enemiesArray.length)];

    switch(randomEnemy){
      case 'axel':
        enemySprites = {
          goRight: new Sprite('img/axel.png',{x:0,y:0},{width:71, height:99},{width:159, height:222},3,6,true),
          goLeft: new Sprite('img/axel.png',{x:0,y:99},{width:71, height:99},{width:159, height:222},3,6,true),

          punchRight: new Sprite('img/axel.png',{x:426,y:0},{width:98, height:116},{width:187, height:222},3,3,true),
          punchLeft: new Sprite('img/axel.png',{x:426,y:116},{width:98, height:116},{width:187, height:222},3,3,true),

          kickRight: new Sprite('img/axel.png',{x:0,y:198},{width:99, height:94},{width:233, height:222},3,3,true),
          kickLeft: new Sprite('img/axel.png',{x:0,y:292},{width:99, height:94},{width:233, height:222},3,3,true),

          damageRight: new Sprite('img/axel.png',{x:297,y:198},{width:57, height:101},{width:125, height:222},0,1,false),
          damageLeft: new Sprite('img/axel.png',{x:297,y:299},{width:57, height:101},{width:125, height:222},0,1,false),
        };
        enemy = new Enemy('axel', 4000, 10, 9, 13000, enemySprites, this.stage.phases[this.stage.currentPhase].x, this.stage.phases[this.stage.currentPhase].y);
        break;
      
      case 'j':
        enemySprites = {
          goRight: new Sprite('img/j.png',{x:0,y:0},{width:64, height:92},{width:154, height:222},3,4,true),
          goLeft: new Sprite('img/j.png',{x:0,y:92},{width:64, height:92},{width:154, height:222},3,4,true),

          punchRight: new Sprite('img/j.png',{x:256,y:0},{width:88, height:88},{width:222, height:222},3,1,true),
          punchLeft: new Sprite('img/j.png',{x:256,y:88},{width:88, height:88},{width:222, height:222},3,1,true),

          kickRight: new Sprite('img/j.png',{x:344,y:0},{width:96, height:91},{width:233, height:222},3,2,true),
          kickLeft: new Sprite('img/j.png',{x:344,y:91},{width:96, height:91},{width:233, height:222},3,2,true),

          damageRight: new Sprite('img/j.png',{x:536,y:0},{width:50, height:93},{width:118, height:222},0,1,false),
          damageLeft: new Sprite('img/j.png',{x:536,y:93},{width:50, height:93},{width:118, height:222},0,1,false),
        };
        enemy = new Enemy('j', 3000, 5, 11, 12500, enemySprites, this.stage.phases[this.stage.currentPhase].x, this.stage.phases[this.stage.currentPhase].y);
        break;

      case 'oriber':
        enemySprites = {
          goRight: new Sprite('img/oriber.png',{x:0,y:0},{width:77, height:92},{width:185, height:222},2,4,true),
          goLeft: new Sprite('img/oriber.png',{x:0,y:92},{width:77, height:92},{width:185, height:222},2,4,true),

          punchRight: new Sprite('img/oriber.png',{x:0,y:184},{width:89, height:93},{width:235, height:222},2,3,true),
          punchLeft: new Sprite('img/oriber.png',{x:0,y:277},{width:89, height:93},{width:235, height:222},2,3,true),

          kickRight: new Sprite('img/oriber.png',{x:308,y:0},{width:103, height:97},{width:235, height:222},2,2,true),
          kickLeft: new Sprite('img/oriber.png',{x:308,y:97},{width:103, height:97},{width:235, height:222},2,2,true),

          damageRight: new Sprite('img/oriber.png',{x:267,y:194},{width:77, height:84},{width:203, height:222},0,1,false),
          damageLeft: new Sprite('img/oriber.png',{x:267,y:278},{width:77, height:84},{width:203, height:222},0,1,false),
        };
        enemy = new Enemy('oriber', 5000, 10, 11, 16000, enemySprites, this.stage.phases[this.stage.currentPhase].x, this.stage.phases[this.stage.currentPhase].y);
        break;
    }

    return enemy;
  }

}