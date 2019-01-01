class Stage{
  constructor (name, phases){
    this.name = name;
    this.phases = phases; //Array with his phases
    this.currentPhase = 0;
  }

  drawStage (ctx){
    this.phases[this.currentPhase].sprites.forEach(sprite => {
      sprite.drawSprite(ctx, 0, 0);
    });
  }

  canMoveX (x, sprite){
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

  canMoveY (y, sprite){
    let top = this.phases[this.currentPhase].y.minY - sprite.dSize.height;
    let bottom = this.phases[this.currentPhase].y.maxY - sprite.dSize.height;

    if (y >= top && y <= bottom){
      return true;
    }
    
    return false;
  }
}