class Item{

  constructor (phaseXLimits, phaseYLimits){
    this.phaseXLimits = phaseXLimits; //Object with the min and max X position of the phase
    this.phaseYLimits = phaseYLimits; //Object with the min and max Y position of the phase
    this.obstacleSprite = this.randomSprite(obstaclesArray); 
    this.rewardSprite = this.randomSprite(rewardsArray);
    this.sprite = this.obstacleSprite; //Sprite default drawed in canvas
    this.x = undefined; //object random x position
    this.y = undefined; //Object random y position
    this.health = 2000;
    this.randomPosition();
    this.changed = false;
    this.rewardPoints = 0;
    this.rewardHealth = 0;
  }

  //random item sprite
  randomSprite (itemArray){

    let item = itemArray[Math.floor(Math.random() * itemArray.length)];

    switch (item){
      case 'radio':
        this.rewardPoints = 1000;
        return new Sprite('img/items.png',{x:0,y:0},{width:69, height:222},{width:69, height:222},0,1,false);
        break;
      case 'dollar':
        this.rewardPoints = 3000;
        return new Sprite('img/items.png',{x:69,y:0},{width:63, height:222},{width:63, height:222},0,1,false);
        break;
      case 'gold':
        this.rewardPoints = 10000;
        return new Sprite('img/items.png',{x:132,y:0},{width:69, height:222},{width:69, height:222},0,1,false);
        break;
      case 'hat':
        this.rewardPoints = 1000;
        return new Sprite('img/items.png',{x:201,y:0},{width:57, height:222},{width:57, height:222},0,1,false);
        break;
      case 'hamburguer':
        this.rewardPoints = 5000;
        this.rewardHealth = 1000;
        return new Sprite('img/items.png',{x:0,y:222},{width:55, height:222},{width:55, height:222},0,1,false);
        break;
      case 'barbeque':
        this.rewardPoints = 10000;
        this.rewardHealth = 2500;
        return new Sprite('img/items.png',{x:55,y:222},{width:49, height:222},{width:49, height:222},0,1,false);
        break;
      case 'pizza':
        this.rewardPoints = 5000;
        this.rewardHealth = 1000;
        return new Sprite('img/items.png',{x:104,y:222},{width:62, height:222},{width:62, height:222},0,1,false);
        break;
      case 'pineapple':
        this.rewardPoints = 3000;
        this.rewardHealth = 500;
        return new Sprite('img/items.png',{x:166,y:222},{width:55, height:222},{width:55, height:222},0,1,false);
        break;
      case 'bidon':
        this.rewardPoints = 1000;
        return new Sprite('img/items.png',{x:0,y:444},{width:115, height:222},{width:115, height:222},0,2,false);
        break;
      case 'tyres':
        this.rewardPoints = 1000;
        return new Sprite('img/items.png',{x:220,y:444},{width:146, height:222},{width:146, height:222},0,1,false);
        break;
      case 'box':
        this.rewardPoints = 1000;
        return new Sprite('img/items.png',{x:376,y:444},{width:133, height:222},{width:133, height:222},0,2,false);
        break;
      }

  }

  //random item position
  randomPosition (){
    this.x = Math.floor(Math.random() * ( (this.phaseXLimits.x.maxX - this.sprite.dSize.height) - this.phaseXLimits.x.minX + 1)) + this.phaseXLimits.x.minX;
    //this.y = Math.floor(Math.random() * (this.phaseYLimits.y.maxY - this.phaseYLimits.y.minY + 1)) + this.phaseYLimits.y.minY;
    this.y = this.phaseYLimits.y.minY - this.sprite.dSize.height;
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
      this.changed = false;
    }else {
      if(this.health <= (this.health / 2) && !this.changed){
        this.sprite.changeSprite();
        this.changed = true;
      }
      
    }
  }

}