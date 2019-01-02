class Game{
  constructor (canvas, ctx, name){
    this.canvas = canvas;
    this.ctx = ctx;
    this.name = name; //Name of the player
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
    this.stage = this.newStageCB(1);
    this.player = this.newPlayer(this.name);
    this.refresh();
  }

  clear (){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawElements (){

    //drawStage
    this.stage.drawStage(this.ctx, this.player.x, this.player.y);

    //drawPlayer
    this.player.still(this.ctx);

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
        this.player.still(this.ctx);
      });
  
      if (this.controlsPressed[87]) {
        this.player.moveUp(this.ctx, this.stage);
      }
      if (this.controlsPressed[83]) {
        this.player.moveDown(this.ctx, this.stage);
      }
      if (this.controlsPressed[65]) {
        this.player.moveLeft(this.ctx, this.stage);
        this.stage.parallax(this.player.x, this.player.vel);
      }
      if (this.controlsPressed[68]) {
        this.player.moveRight(this.ctx, this.stage);
        this.stage.parallax (this.player.x, this.player.vel);
      }
      if (this.controlsPressed[65] && this.controlsPressed[68]){
        //doing nothing
      }

      if (this.controlsPressed[74]) {
        console.log('Punch');
      }
      if (this.controlsPressed[75]) {
        console.log('Kick');
      }
      if (this.controlsPressed[76]) {
        console.log('Hook');
      }
      if (this.controlsPressed[73]) {
        console.log('Take');
      } 
    }
  }

  newStageCB (stageNumber){
    let stage;
    switch (stageNumber){
      case 1:
        stage = new Stage('Slum', [st1P1, st1P2, st1P3], this.newStageCB);
        break;
      case 2:
        stage = new Stage('Subway', [st2P1, st2P2], this.newStageCB);
        break;
    }

    return stage;
  }

  newPlayer (name){ //name of the player
    let player;
    switch (name){
      case 'cody':
        player = new Player('cody', 'img/cody.png', 100, 50, 10, this.stage.phases[this.stage.currentPhase].x.minX + 65, this.stage.phases[this.stage.currentPhase].y.minY-170);
        break;
      case 'haggar':
        player = new Player('haggar', 'img/haggar.png', 100, 70, 5, this.stage.phases[this.stage.currentPhase].x.minX + 65, this.stage.phases[this.stage.currentPhase].y.minY-170);
        break;
    }
    return player;
  }

}