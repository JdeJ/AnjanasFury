class Enemy{

  constructor (width, height){
    this.health = 100;
    this.strength = 10;
    this.img = new Image();
    this.color = 'black';
    this.width = width;
    this.height = height;
    this.x = 650;
    this.y = 400;
    this.speedX = 10;
    this.speedY = 10;
  }

  moveRight (){
    this.x+=this.speedX;
  }

  moveLeft (){
    this.x-=this.speedX;
  }

  moveUp (){
    this.y+=this.speedY;
  }

  moveDown(){
    return this.speedY;
  }

  attack (){
    return this.strength;
  }

  receiveDamage (damage){
    this.health -= damage;
  }

  death (){

  }

}