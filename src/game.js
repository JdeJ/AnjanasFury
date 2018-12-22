class Game{
  constructor (){
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.minX = 300;
    this.maxX = 700;
    this.minY = 400;
    this.maxY= 600;
    this.player = new Player(100, 100);
    this.characters = [];
    this.controlsPressed = [];
    this.fps = undefined;
  }

  gameStart (){
    this.generateControls();
    this.characters.push(this.player);
    this.characters.push(new Enemy(80,80));
    this.fps = setInterval(this.refresh.bind(this), 20);
  }

  refresh (){
    this.generateControls();
    this.clear();
    this.characters.forEach((character) => this.drawCharacter(character));
  }

  clear (){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawCharacter (character){
    this.ctx.fillStyle = character.color;
    this.ctx.fillRect(character.x, character.y, character.width, character.height);
  }

  gamePause(){
    clearInterval(this.fps);
    this.fps = undefined;
  }

  gameOver (){
    clearInterval(this.fps);
  }

  generateControls (){
    document.onkeydown = (e) => {
      console.log(e.keyCode)
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
      console.log('START');
    }
  }

}