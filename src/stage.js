class Stage{
  constructor (name, phases, newStageCB){
    this.name = name;
    this.phases = phases; //Array with his phases
    this.currentPhase = 2;
    this.newStageCB = newStageCB;
    this.x = 0;
    this.y = 0;
  }

  
  drawStage (ctx){

    if (this.phases[this.currentPhase].sprites.length > 1){
      this.phases[this.currentPhase].sprites[0].drawSprite(ctx, this.x/2, this.y/2);
    }
    
    this.phases[this.currentPhase].sprites[1].drawSprite(ctx, this.x, this.y);
  
  }

  parallax (playerX, vel){
    if (playerX >=600 && this.x > -(this.phases[this.currentPhase].x.maxX - canvas.width)){
      this.x -= vel;
    }else if (playerX <= 300 && this.x < 0){
      this.x += vel;
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
}