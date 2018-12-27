class Player{

  constructor (width, height){
    this.health = 100;
    this.strength = 30;
    this.width = width;
    this.height = height;
    this.x = 50;
    this.y = 400;
    this.speedX = 20;
    this.speedY = 20;
    this.color = 'green';
    this.img = new Image();
  }

  moveRight (){
    this.x+=this.speedX;
  }

  moveLeft (){
    this.x-=this.speedX;
  }

  moveUp (){
    this.y-=this.speedY;
  }

  moveDown(){
    this.y+=this.speedY;
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