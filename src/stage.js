class Stage{
  constructor (name, phasesSprites){
    this.name = name;
    this.phases = phasesSprites;//Array with his phases
    this.currentPhase = 0;
    this.x = 0;
    this.y = 0;
    this.item = this.createItem();
    this.timeout = timeouts[this.name][this.currentPhase];
    this.totalEnemiesLeft = availableEnemies[this.name][this.currentPhase]; //lefting enemies
  }

  createItem (){
    return new Item(this.phases[this.currentPhase], this.phases[this.currentPhase]);
  }
  
  drawStage (ctx){
    this.phases[this.currentPhase].sprites[0].drawSprite(ctx, this.x/2, this.y/2);
    if (this.phases[this.currentPhase].sprites.length > 1){
      this.phases[this.currentPhase].sprites[1].drawSprite(ctx, this.x, this.y);
    }
  }

  parallax (playerX, vel){
    if (playerX >=700 && this.x > -(this.phases[this.currentPhase].x.maxX - canvas.width)){
      this.x -= vel/1.5;
      if (this.item)
        this.item.x -= vel/1.5;
    }else if (playerX <= 250 && this.x < 0){
      this.x += vel/1.5;
      if (this.item)
        this.item.x += vel/1.5;
    }
  }

  canMoveX (x, sprite){ //x position of player and his sprite
    let right = this.phases[this.currentPhase].maxCanvasX - (sprite.dSize.width/2);

    //controls right bounds
    if ((x >= this.phases[this.currentPhase].x.minX) && x <= right && x <= this.phases[this.currentPhase].x.maxX){
      return true;
    }

    //controls left bounds
    if ((x >= this.phases[this.currentPhase].x.minX) && x <= right && x >= this.phases[this.currentPhase].x.minX){
      return true;
    }

    return false;
  }

  canMoveY (y, sprite){ //y position of player and his sprite
    let top = this.phases[this.currentPhase].y.minY - sprite.dSize.height;
    let bottom = this.phases[this.currentPhase].y.maxY - sprite.dSize.height;

    if (y >= top && y <= bottom){
      return true;
    }
    
    return false;
  }

  //removes item after takeLeft or takeRight event
  removeItem(){
    this.item = undefined;
  }

}