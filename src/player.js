class Player{

  constructor (name, img,  health, strength, vel){
    this.name = name;
    this.stillRight = new Sprite(img,{x:0,y:0},{width:54, height:93},{width:129, height:222},0,1,true);
    this.stillLeft = new Sprite(img,{x:0,y:104},{width:54, height:93},{width:129, height:222},0,1,true);
    this.goRight = new Sprite(img,{x:56,y:0},{width:62, height:96},{width:145, height:222},50,10,false);
    this.goLeft = new Sprite(img,{x:56,y:104},{width:62, height:96},{width:145, height:222},50,10,false);
    this.punchRight = new Sprite(img,{x:0,y:212},{width:85, height:90},{width:210, height:222},50,2,false);
    this.punchLeft = new Sprite(img,{x:0,y:306},{width:85, height:90},{width:210, height:222},50,2,false);
    this.dieRight = new Sprite(img,{x:0,y:441},{width:97, height:96},{width:225, height:222},50,4,false);
    this.dieLeft = new Sprite(img,{x:0,y:539},{width:97, height:96},{width:225, height:222},50,4,false);
    this.hookRight = new Sprite(img,{x:176,y:212},{width:83, height:111},{width:166, height:222},50,4,false);
    this.hookLeft = new Sprite(img,{x:176,y:326},{width:83, height:111},{width:166, height:222},50,4,false);
    this.kickRight = new Sprite(img,{x:517,y:212},{width:65, height:88},{width:164, height:222},50,3,false);
    this.kickLeft = new Sprite(img,{x:517,y:302},{width:65, height:88},{width:164, height:222},50,3,false);
    this.damageRight = new Sprite(img,{x:396,y:441},{width:55, height:84},{width:148, height:222},50,4,false);
    this.damageLeft = new Sprite(img,{x:396,y:526},{width:55, height:84},{width:148, height:222},50,4,false);
    this.takeRight = new Sprite(img,{x:453,y:441},{width:54, height:84},{width:148, height:222},0,1,true);
    this.takeLeft = new Sprite(img,{x:453,y:526},{width:54, height:84},{width:148, height:222},0,1,true);
    this.health = health;
    this.strength = strength;
    this.vel = vel;
    this.x = 50; //default x position on canvas
    this.y = 300; //default y position on canvas
    this.direction = 'right'; //default direction
  }

  still (ctx, stage){
    if (this.direction === 'right'){
      this.stillRight.drawSprite(ctx, this.x, this.y);
    }else{
      this.stillLeft.drawSprite(ctx, this.x, this.y);
    }
  }

  moveRight (ctx, stage){
    let x = this.x + this.vel;
    if(stage.canMoveX(x, this.goRight)){
      this.x += this.vel;
      this.direction = 'right';
      this.goRight.drawSprite(ctx, this.x, this.y);
    }
  }

  moveLeft (ctx, stage){
    let x = this.x - this.vel;
    if(stage.canMoveX(x, this.goLeft)){
      this.x -= this.vel;
      this.direction = 'left';
      this.goLeft.drawSprite(ctx, this.x, this.y);
    }
  }

  moveUp (ctx, stage){
    let y = this.y - this.vel;

    if (this.direction === 'right'){
      if(stage.canMoveY(y, this.goRight)){
        this.y -= this.vel;
        this.goRight.drawSprite(ctx, this.x, this.y);
      }
    }else{
      if(stage.canMoveY(y, this.goLeft)){
        this.y -= this.vel;
        this.goLeft.drawSprite(ctx, this.x, this.y);
      }
    }
  }

  moveDown(ctx, stage){
    let y = this.y + this.vel;

    if (this.direction === 'right'){
      if(stage.canMoveY(y, this.goRight)){
        this.y+=this.vel;
        this.goRight.drawSprite(ctx, this.x, this.y);
      }
    }else{
      if(stage.canMoveY(y, this.goLeft)){
        this.y+=this.vel;
        this.goLeft.drawSprite(ctx, this.x, this.y);
      }
    }
  }

  punch (ctx, stage){
    if (this.direction === 'right'){
      this.punchRight.drawSprite(ctx, this.x, this.y);
    }else{
      this.punchLeft.drawSprite(ctx, this.x, this.y);
    }
  }

  receiveDamage (damage){
    this.health -= damage;
  }

  death (ctx, stage){
    if (this.direction === 'right'){
      this.dieRight.drawSprite(ctx, this.x + 50, this.y + 50);
    }else{
      this.dieLeft.drawSprite(ctx, this.x + 50, this.y + 50);
    }
  }

}