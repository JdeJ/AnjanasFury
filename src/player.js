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
    this.lives = 3; //default lives
    this.score = 0; //default score
    this.spriteBlocked = false; //blocks sprite for some animations
  }

  drawPlayer (ctx){
    this.sprite.updateSprite();
    this.sprite.drawSprite(ctx, this.x, this.y);
  }

  changeSprite (action){
    if (!this.spriteBlocked){
      //Creates sprite's string with the action parameter and the direction of the player
      let newSprite = action + this.direction.charAt(0).toUpperCase() + this.direction.slice(1);
      this.sprite = this.sprites[newSprite];
    }
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

  moveLeft (stage, delta){
    let x = this.x - this.vel;
    if(stage.canMoveX(x, this.sprite)){
      this.x -= this.vel * delta / 16.6;
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

  receiveDamage (damage){
    this.changeSprite('damage');
    this.spriteBlocked = true;
    this.animationTimeout(500);
    this.health -= damage;
    return this.isDead() ? false : true; //devuelve true si lo ha dañado y false si esta muerto
  }

  //checks if enemy has dead
  isDead (){
    if (this.health <= 0){
      this.dead();
      return true;
    }
    return false;
  }

  dead (){
    //actualiza el sprite
    this.changeSprite('damage');
  }

  animationTimeout (timeout){
    setTimeout(() => {
      this.spriteBlocked = false;
    }, timeout);
  }

}