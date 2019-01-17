class Enemy{

  constructor (name,  health, strength, vel, sprites, x, y){
    this.name = name;
    this.health = health;
    this.strength = strength;
    this.vel = vel;
    this.sprites = sprites; //object with all player sprites
    this.direction = this.getRandom(0, 1) === 0 ? 'left' : 'right';
    this.sprite = (this.direction === 'right')? this.sprites.goRight : this.sprites.goLeft;
    this.x = (this.direction === 'right') ? -100 : 1100;
    this.y = (this.getRandom(y.minY, y.maxY))-this.sprite.dSize.height;
    this.movementAdjust = 0;
  }

  drawEnemy (ctx){
    this.sprite.updateSprite();
    this.sprite.drawSprite(ctx, this.x, this.y);
  }

  getRandom (min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  move (stage, delta, player){

    this.chasePlayer(player, delta);
    
    console.log(`${this.direction} -> X=${this.x} / Y=${this.y}`);
    // if (this.movementAdjust <= 20){
    //   this.movementAdjust++;
    // }else{
    //   this.movementAdjust = 0;
    //   this.chasePlayer(player, delta);
    // }

    // if (this.movementAdjust <= 20){
    //   this.movementAdjust++;
    // }else{
    //   this.movementAdjust = 0;
    //   if (this.direction === 'right'){
    //     this.moveRight(delta);
    //   }else{
    //     this.moveLeft(delta);
    //   }
    // }

    this.changeSprite('go');
  }

  moveRight (delta){
    this.x += this.vel * delta / 16.6;
    this.direction = 'right';
  }

  moveLeft (delta){
    this.x -= this.vel * delta / 16.6;
    this.direction = 'left';
  }

  moveUp (){
    let y = this.y - this.vel;
  }

  moveDown (){
    let y = this.y - this.vel;
  }

  chasePlayer(player, delta){
     
    // subtract (= difference vector)
    var dx = player.x - this.x;
    var dy = player.y - this.y;
    
    // normalize (= direction vector)
    // (a direction vector has a length of 1)
    var length = Math.sqrt(dx * dx + dy * dy);
    if (length) {
      dx /= length;
      dy /= length;
    }
    
    // move
    // delta is the elapsed time in seconds
    // SPEED is the speed in units per second (UPS)
    this.x += dx;
    this.y += dy;
    
  }

  changeSprite (action){
    //Creates sprite's string with the action parameter and the direction of the player
    let newSprite = action + this.direction.charAt(0).toUpperCase() + this.direction.slice(1);
    this.sprite = this.sprites[newSprite];
  }
}