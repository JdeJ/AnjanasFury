class Game{
  constructor (canvas, ctx, playerName){
    this.canvas = canvas;
    this.ctx = ctx;
    this.playerName = playerName; //Name of the player
    this.player = undefined;
    this.stage = undefined;
    this.enemies = []; //enemies array in screen
    this.objects = []; //objects array in screen
    this.controlsPressed = [];
    this.fps = undefined; //canvas animation id
    this.state = 'stopped'; //game state: [stopped, running, paused]
    this.cb = {pause: undefined, resume: undefined, gameOver: undefined, stats: undefined}; //callbacks object of main.js
  }

  gameStart (pause, resume, gameOver){ //cb of main
    this.state = 'running';
    this.cb.pause = pause;
    this.cb.resume = resume;
    this.cb.gameOver = gameOver;
    this.stage = this.newStageCB(2);
    this.player = this.newPlayer(this.playerName);
    this.refresh();
  }

  clear (){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawElements (){

    //drawStage
    this.stage.drawStage(this.ctx, this.player.x, this.player.y);

    //drawPlayer
    this.player.drawPlayer(this.ctx);

    //drawEnemies

    //drawObjects
  }

  refresh (){
    this.clear();
    this.drawElements();
    this.generateControls();
    this.fps = window.requestAnimationFrame(this.refresh.bind(this));
  }

  gamePause (){
    this.state = 'paused';
    //detengo el canvas
    this.fps = window.cancelAnimationFrame(this.fps);
    this.fps = undefined;
    //llamo al cb de main.js para que añada la pantalla de pausa al DOM
    this.cb.pause();
  }

  gameResume (){
    //llamo al cb de main.js para que borre la pantalla de pause del DOM
    this.cb.resume();
    this.state = 'running';
    //arranco el canvas de nuevo
    this.refresh();
  }

  gameOver (){
    this.state = 'stopped';
    this.fps = window.cancelAnimationFrame(this.fps);
    this.fps = undefined;
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
        this.player.moveUp(this.stage);
      }
      if (this.controlsPressed[83]) {
        this.player.moveDown(this.stage);
      }
      if (this.controlsPressed[65]) {
        this.player.moveLeft(this.stage);
        this.stage.parallax(this.player.x, this.player.vel);
      }
      if (this.controlsPressed[68]) {
        this.player.moveRight(this.stage);
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

  newStageCB (stageNumber){
    let stage;
    switch (stageNumber){
      case 1:
        stage = new Stage('Slum', [st1P1, st1P2, st1P3]);
        break;
      case 2:
        stage = new Stage('Subway', [st2P1, st2P2]);
        break;
    }

    return stage;
  }

  newPlayer (playerName){
    let player;
    switch (playerName){
      case 'cody':
        player = new Player('cody', 100, 50, 10, this.stage.phases[this.stage.currentPhase].x.minX + 65, this.stage.phases[this.stage.currentPhase].y.minY-170);
        break;
      case 'haggar':
        player = new Player('haggar', 100, 70, 5, this.stage.phases[this.stage.currentPhase].x.minX + 65, this.stage.phases[this.stage.currentPhase].y.minY-170);
        break;
    }
    return player;
  }

}