class Player{

  constructor (name,  health, strength, vel, sprites, x, y){
    this.name = name;
    this.health = health;
    this.strength = strength;
    this.vel = vel;
    this.x = x; //x position on canvas
    this.y = y; //y position on canvas
    this.sprites = sprites; //object with all player sprites
    this.direction = 'right'; //default direction
    this.sprite = this.sprites.stillRight; // default sprite
  }

  drawPlayer (ctx){
    this.sprite.updateSprite();
    this.sprite.drawSprite(ctx, this.x, this.y);
  }

  changeSprite (action){
    //Creates sprite's string with the action parameter and the direction of the player
    let newSprite = action + this.direction.charAt(0).toUpperCase() + this.direction.slice(1);
    this.sprite = this.sprites[newSprite];
  }

  still (){
    this.changeSprite('still');
  }

  moveRight (stage, delta){
    let x = this.x + this.vel;
    if(stage.canMoveX(x, this.sprite)){
      this.x += this.vel * delta / 16.6;
      this.direction = 'right';
      this.changeSprite('go');
    }
  }

  moveLeft (stage){
    let x = this.x - this.vel;
    if(stage.canMoveX(x, this.sprite)){
      this.x -= this.vel;
      this.direction = 'left';
      this.changeSprite('go');
    }
  }

  moveUp (stage){
    let y = this.y - this.vel;

    if(stage.canMoveY(y, this.sprite)){
      this.y -= this.vel;
      this.changeSprite('go');
    }
  }

  moveDown(stage){
    let y = this.y + this.vel;

    if(stage.canMoveY(y, this.sprite)){
      this.y+=this.vel;
      this.changeSprite('go');
    }
  }

  punch (){
    this.changeSprite('punch');
  }

  kick (){
    this.changeSprite('kick');
  }

  hook (){
    this.changeSprite('hook');
  }

  take (){
    this.changeSprite('take');
  }

  receiveDamage (){
    this.changeSprite('damage');
  }

  death (){
    this.changeSprite('die');
    // if (this.direction === 'right'){
    //   this.dieRight.drawSprite(ctx, this.x + 50, this.y + 50);
    // }else{
    //   this.dieLeft.drawSprite(ctx, this.x + 50, this.y + 50);
    // }
  }

}