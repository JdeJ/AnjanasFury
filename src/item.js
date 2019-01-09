class Item{

  constructor (phaseXLimits, phaseYLimits){
    this.phaseXLimits = phaseXLimits; //Object with the min and max X position of the phase
    this.phaseYLimits = phaseYLimits; //Object with the min and max Y position of the phase
    this.obstacleSprite = this.randomSprite(obstaclesArray); 
    this.rewardSprite = this.randomSprite(rewardsArray);
    this.sprite = this.obstacleSprite; //Sprite default drawed in canvas
    this.x = 575; //object random x position
    this.y = undefined; //Object random y position
    this.health = 250;
    this.randomPosition();
    // this.updatePosition();
    this.changed = false;
  }

  //random obstacle sprite
  randomSprite (itemArray){

    let item = itemArray[Math.floor(Math.random() * itemArray.length)];

    switch (item){
      case 'radio':
        return new Sprite('img/items.png',{x:115,y:7},{width:29, height:16},{width:69, height:38},0,1,false);
        break;
      case 'dollar':
      return new Sprite('img/items.png',{x:164,y:7},{width:32, height:11},{width:63, height:22},0,1,false);
        break;
      case 'gold':
        return new Sprite('img/items.png',{x:9,y:7},{width:32, height:12},{width:69, height:26},0,1,false);
        break;
      case 'hat':
        return new Sprite('img/items.png',{x:56,y:7},{width:24, height:13},{width:57, height:34},0,1,false);
        break;
      case 'hamburguer':
        return new Sprite('img/items.png',{x:164,y:33},{width:31, height:15},{width:55, height:26},0,1,false);
        break;
      case 'barbeque':
        return new Sprite('img/items.png',{x:115,y:33},{width:32, height:22},{width:49, height:34},0,1,false);
        break;
      case 'pizza':
        return new Sprite('img/items.png',{x:9,y:33},{width:30, height:14},{width:62, height:29},0,1,false);
        break;
      case 'pineapple':
        return new Sprite('img/items.png',{x:56,y:33},{width:32, height:16},{width:55, height:28},0,1,false);
        break;
      case 'bidon':
        return new Sprite('img/items.png',{x:30,y:177},{width:32, height:62},{width:115, height:222},0,2,false);
        break;
      case 'tyres':
        return new Sprite('img/items.png',{x:122,y:178},{width:34, height:52},{width:146, height:222},0,1,false);
        break;
      case 'box':
        return new Sprite('img/items.png',{x:197,y:172},{width:48, height:80},{width:133, height:222},0,2,false);
        break;
      }

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