class Game{
  constructor (canvas, ctx, playerName){
    this.canvas = canvas;
    this.ctx = ctx;
    this.playerName = playerName; //Name of the player
    this.stage = new Stage('slum'); //default stage
    this.player = this.createPlayer(this.playerName);
    this.timer = new Timer(44);
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

      //game state check

      
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

    //drawPlayer
    this.player.drawPlayer(this.ctx);

    //drawEnemies

    //drawObjects
    if (this.stage.item){
      this.stage.item.sprite.drawSprite(this.ctx, this.stage.item.x, this.stage.item.y);
    }

    //updateStats
    this.cb.updateStats(2, 2341, this.timer.timeLeft);
  }

  refresh (){
    this.clear();
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
    //
    //arranco el canvas de nuevo
    this.gameStatus();
    //arranco el timer
    this.timer.start();
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

  createPlayer (playerName){
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