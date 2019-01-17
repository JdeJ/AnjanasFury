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
    console.log(`${this.direction} -> EnemyX= ${this.x} / EnemyY= ${this.y}`);
    this.sprite.updateSprite();
    this.sprite.drawSprite(ctx, this.x, this.y);
  }

  getRandom (min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  move (stage, delta, player){

    if (this.movementAdjust <= 20){
      this.movementAdjust++;
    }else{
      this.movementAdjust = 0;
      if (this.direction === 'right'){
        this.moveRight(stage, delta);
      }else{
        this.moveLeft(stage, delta);
      }
    }

    


    // let x;

    // if (this.direction === 'right'){
    //   x = this.x + this.vel;
    // }else{
    //   x = this.x - this.vel;
    // }

    // if(stage.canMoveX(x, this.sprite)){
    //   this.direction === 'right'? this.moveRight(stage, delta) : this.moveLeft(stage, delta);
    // }

    this.changeSprite('go');
  }

  moveRight (stage, delta){
    this.x += this.vel * delta / 16.6;
    this.direction = 'right';
  }

  moveLeft (stage, delta){
    this.x -= this.vel * delta / 16.6;
    this.direction = 'left';
  }

  moveUp (stage){
    let y = this.y - this.vel;
  }

  moveDown (stage){
    let y = this.y - this.vel;
  }

  changeSprite (action){
    //Creates sprite's string with the action parameter and the direction of the player
    let newSprite = action + this.direction.charAt(0).toUpperCase() + this.direction.slice(1);
    this.sprite = this.sprites[newSprite];
  }
}