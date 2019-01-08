class Item{

  constructor (phaseXLimits, phaseYLimits){
    this.phaseXLimits = phaseXLimits; //Object with the min and max X position of the phase
    this.phaseYLimits = phaseYLimits; //Object with the min and max Y position of the phase
    this.obstacleSprite = this.randomSprite(obstaclesSprites); 
    this.rewardSprite = this.randomSprite(rewardsSprites);
    this.sprite = this.obstacleSprite; //Sprite drawed in canvas
    this.x = 575; //object random x position
    this.y = undefined; //Object random y position
    this.health = 250;
    this.randomPosition();
    // this.updatePosition();
    this.changed = false;
  }

  //random obstacle sprite
  randomSprite (spritesObj){
    let keys = Object.keys(spritesObj);
    return spritesObj[keys[Math.floor(Math.random() * keys.length)]];
  }

  //random obstacle position
  randomPosition (){
    //this.x = Math.floor(Math.random() * (this.phaseXLimits.x.maxX - this.phaseXLimits.x.minX + 1)) + this.phaseXLimits.x.minX;
    //this.y = Math.floor(Math.random() * (this.phaseYLimits.y.maxY - this.phaseYLimits.y.minY + 1)) + this.phaseYLimits.y.minY;
    this.y = this.phaseYLimits.y.minY - this.sprite.dSize.height;
  }

  //updates item position based on his sprite width
  updatePosition (){
    this.x -= this.sprite.dSize.width;
    this.y -= this.sprite.dSize.height;
  }

  receiveDamage (damage){
    this.health -= damage;
    console.log(this.health);
    this.checkStatus();
  }

  //checks if item has to change sprite to reward
  checkStatus (){
    if (this.health <= 0){
      this.sprite = this.rewardSprite;
      this.updatePosition();
    }else {
      if(this.health <= (this.health / 2) && !this.changed){
        this.sprite.changeSprite();
        this.updatePosition();
      }
      
    }
  }

}