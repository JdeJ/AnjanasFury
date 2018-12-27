class Game{
  constructor (canvas, ctx){
    this.canvas = canvas;
    this.ctx = ctx;
    this.minX = 300;
    this.maxX = 700;
    this.minY = 400;
    this.maxY= 600;
    this.player = new Player(100, 100);
    this.characters = []; //array de characteres en pantalla
    this.controlsPressed = [];
    this.fps = undefined; //guarda el id de la animacion del canvas
    this.state = 'stopped'; //estado del programa: [stopped, running, paused]
    this.cb = {pause: undefined, resume: undefined, gameOver: undefined}; //objeto que guardará los callbacks del main.js
  }

  gameStart (pause, resume, gameOver){
    this.state = 'running';
    this.cb.pause = pause;
    this.cb.resume = resume;
    this.cb.gameOver = gameOver;
    this.characters.push(this.player);
    this.characters.push(new Enemy(80,80));
    this.refresh();
  }

  clear (){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawCharacter (character){
    this.ctx.fillStyle = character.color;
    this.ctx.fillRect(character.x, character.y, character.width, character.height);
  }

  refresh (){
    this.clear();
    this.characters.forEach((character) => this.drawCharacter(character));
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
      });
  
      if (this.controlsPressed[87]) {
        this.player.moveUp();
      }
      if (this.controlsPressed[83]) {
        this.player.moveDown();
      }
      if (this.controlsPressed[65]) {
        this.player.moveLeft();
      }
      if (this.controlsPressed[68]) {
        this.player.moveRight();
      }
      if (this.controlsPressed[74]) {
        console.log('Punch');
        //pruebo la pantalla de gameover la pulsar punch (J)
        this.gameOver();
      }
      if (this.controlsPressed[75]) {
        console.log('Kick');
      }
      if (this.controlsPressed[76]) {
        console.log('Take');
      }
      if (this.controlsPressed[73]) {
        console.log('Trhow');
      } 
    }
  }

}