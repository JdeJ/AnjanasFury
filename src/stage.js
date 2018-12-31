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
}