class Game{
  constructor (canvas, ctx){
    this.canvas = canvas;
    this.ctx = ctx;
    this.minX = 300;
    this.maxX = 700;
    this.minY = 400;
    this.maxY= 600;
    this.player = new Player(100, 100);
    this.characters = [];
    this.controlsPressed = [];
    this.fps = undefined;
    this.pause = undefined;
    this.resume = undefined;
  }

  gameStart (pause, resume){
    this.pause = pause;
    this.resume = resume;
    //this.generateControls();
    this.characters.push(this.player);
    this.characters.push(new Enemy(80,80));
    //this.fps = setInterval(this.refresh.bind(this), 70);
    //this.fps = window.requestAnimationFrame(this.refresh.bind(this));
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
    this.generateControls();
    this.clear();
    this.characters.forEach((character) => this.drawCharacter(character));
    this.fps = window.requestAnimationFrame(this.refresh.bind(this));
  }

  gamePause (){
    // clearInterval(this.fps);
    // this.fps = undefined;
    //generateControls();
    this.fps = window.cancelAnimationFrame(this.fps);
    this.pause();
  }

  gameResume (){
    //this.fps = setInterval(this.refresh.bind(this), 70);
    this.resume();
    //this.refresh();
  }

  gameOver (){
    clearInterval(this.fps);
  }

  generateControls (){

    //Tengo que controlar el pause así, con window.addEventListener no me funciona
    document.onkeydown = (e) => {
      if (e.keyCode === 32){
        if (this.fps){
          this.gamePause();
        }else{
          this.gameResume();
          this.refresh();
        }
      }
    };

    window.addEventListener('keydown', (pressed) => {
      this.controlsPressed[pressed.keyCode] = true;
      console.log (pressed.keyCode);
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
      this.player.color = 'yellow';
    }
    if (this.controlsPressed[75]) {
      console.log('Kick');
    }
    if (this.controlsPressed[76]) {
      console.log('Take');
    }
    if (this.controlsPressed[73]) {
      console.log('Launch');
    }
    if (this.controlsPressed[32]) {
      if (this.fps){
        console.log('Paused');
      }else{
        console.log('Resumed');
      }
    }
  }

}