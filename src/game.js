class Game{
  constructor (canvas, ctx, playerName){
    this.canvas = canvas;
    this.ctx = ctx;
    this.playerName = playerName; //Name of the player
    this.stage = this.createStage('slum'); //default stage
    this.player = this.createPlayer(this.playerName);
    this.timer = new Timer(this.stage.timeout);
    this.enemies = []; //enemies array in screen
    this.objects = []; //objects array in screen
    this.controlsPressed = [];
    this.fps = undefined; //canvas animation id
    this.state = 'stopped'; //game state: [stopped, running, paused]
    this.cb = {pause: undefined, resume: undefined, gameOver: undefined, stats: undefined}; //callbacks object of main.js
  }

  gameStart (pause, resume, gameOver, updateStats){ //cb of main
    this.state = 'running';
    this.cb.pause = pause;
    this.cb.resume = resume;
    this.cb.gameOver = gameOver;
    this.cb.updateStats = updateStats;
    this.timer.start();
    this.refresh();
  }

  gameStatus(){
    //time and player health check
    if ((this.timer.timeLeft <= 0)||(this.player.health <= 0)){
      this.gameOver();
    }else{
      
      //item check
      this.stage.item.checkStatus();
  
      //collision checks
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
    if (this.stage.item){
      this.stage.item.sprite.drawSprite(this.ctx, this.stage.item.x, this.stage.item.y);
    }
  
    //drawEnemies

    

    //drawPlayer
    this.player.drawPlayer(this.ctx);

    //updateStats
    this.cb.updateStats(2, 2341, this.timer.timeLeft);
  }

  refresh (){
    this.currentTs = new Date();
    this.delta = (this.currentTs - (this.lastTs || this.currentTs)) || 16.6;
    this.lastTs = this.currentTs;
    this.clear();
    this.checkItemCollisions(this.player, this.stage.item);
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

  gameOver (){
    this.state = 'stopped';
    this.fps = window.cancelAnimationFrame(this.fps);
    this.fps = undefined;
    this.clear();
    this.timer.stop(); 
    this.cb.gameOver();
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
        this.stage.parallax(this.player.x, this.player.vel);
      }
      if (this.controlsPressed[68]) {
        this.player.moveRight(this.stage, this.delta);
        this.stage.parallax (this.player.x, this.player.vel);
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

  checkItemCollisions(player, item){
    let playerTotalWitdh = player.x + player.sprite.dSize.width;
    let playerTotalHeight = player.y + player.sprite.dSize.height;
    let playerAxis = player.x + Math.floor(player.sprite.dSize.width / 2); //Player sprite center axis
    let itemTotalWitdh = item.x + item.sprite.dSize.width;
    let itemTotalHeight = item.y + item.sprite.dSize.height + 10;
    let touchable = true; //flag para comprobar que no estoy encima o debajo del objeto y dejar que lo golpee
    let collisionBorder = undefined; //controlo por donde estoy colisionando con el objeto

    if (player.x < itemTotalWitdh && 
        playerTotalWitdh > item.x && 
        player.y + 200 < itemTotalHeight &&
        playerTotalHeight > item.y + 200){
      
      if ((playerAxis > item.x) && playerAxis < itemTotalWitdh && ((playerTotalHeight + 20) >= itemTotalHeight)){ //estoy debajo
        player.y = item.y + 35;
        touchable = false;
        collisionBorder = 'under';
      }else if ((playerAxis > item.x) && playerAxis < itemTotalWitdh && (playerTotalHeight <= (itemTotalHeight - 20))){ //estoy encima
        player.y = item.y - 30;
        touchable = false;
        collisionBorder = 'over';
      }else if ((playerTotalWitdh > item.x) && (playerTotalWitdh < itemTotalWitdh)){ //estoy a la izquierda
        player.x = item.x - player.sprite.dSize.width - 1; //resto 1px para que no se quede justo pegado y poder seguir rompiendolo
        touchable = true;
        collisionBorder = 'left';
      }else if ((player.x < itemTotalWitdh) && (playerTotalWitdh > itemTotalWitdh)){ //estoy a la derecha
        player.x = item.x + item.sprite.dSize.width + 1; //sumo 1px para que no se quede justo pegado y poder seguir rompiendolo      
        touchable = true;
        collisionBorder = 'right';
      }

      //controlo si es un obstacle o una reward
      if (item.sprite === item.rewardSprite){
        if (touchable && (player.sprite === player.sprites.takeRight || player.sprite === player.sprites.takeLeft)){
          //borrar item
          //actualizar player stats
        }
      }else{
        //controlo que solo pueda romper el objeto si hago punch, kick o hook
        if (touchable && (player.sprite === player.sprites.punchRight || player.sprite === player.sprites.punchLeft ||
          player.sprite === player.sprites.kickRight || player.sprite === player.sprites.kickLeft ||
          player.sprite === player.sprites.hookRight || player.sprite === player.sprites.hookLeft)){
        
          item.receiveDamage (player.strength);            
        }
      }
    }
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
        player = new Player('cody', 5000, 50, 10, playerSprites, this.stage.phases[this.stage.currentPhase].x.minX + 65, this.stage.phases[this.stage.currentPhase].y.minY-170);
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
        player = new Player('haggar', 5000, 70, 5, playerSprites, this.stage.phases[this.stage.currentPhase].x.minX + 65, this.stage.phases[this.stage.currentPhase].y.minY-170);
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
          new Phase(1426, [st1P2l0], {minX: 60, maxX: 1380}, {minY: 450, maxY: 592}, 900,false),
          new Phase(2212, [st1P3l0, st1P3l1], {minX: 220, maxX: 2077}, {minY: 470, maxY: 592}, 780,false)
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

}