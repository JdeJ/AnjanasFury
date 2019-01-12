class Enemy{

  constructor (name,  health, strength, vel, sprites){
    this.name = name;
    this.health = health;
    this.strength = strength;
    this.vel = vel;
    this.x = 600; //x position on canvas
    this.y = 290; //y position on canvas
    this.sprites = sprites; //object with all player sprites
    this.direction = 'left'; //default direction
    this.sprite = this.sprites.goLeft; // default sprite
    this.lives = 3; //default lives
    this.score = 0; //default score
  }

  drawEnemy (ctx){
    this.sprite.updateSprite();
    this.sprite.drawSprite(ctx, this.x, this.y);
  }

}