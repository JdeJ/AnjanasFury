class Enemy{

  constructor (name,  health, strength, vel, reward, sprites, x, y){
    this.name = name;
    this.health = health;
    this.strength = strength;
    this.vel = vel;
    this.reward = reward;
    this.sprites = sprites; //object with all player sprites
    this.direction = this.getRandom(0, 1) === 0 ? 'left' : 'right';
    this.sprite = (this.direction === 'right')? this.sprites.goRight : this.sprites.goLeft;
    this.x = (this.direction === 'right') ? -100 : 1100;
    this.y = (this.getRandom(y.minY, y.maxY))-this.sprite.dSize.height;
    this.movementAdjust = 0;
    this.spriteBlocked = false; //blocks sprite for some animations
  }

  drawEnemy (ctx){
    this.sprite.updateSprite();
    this.sprite.drawSprite(ctx, this.x, this.y);
  }

  getRandom (min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  move (delta, player){
    //Persigue al player
    this.chasePlayer(player, delta);

    //actualiza el sprite
    this.changeSprite('go');
  }

  chasePlayer(player, delta){
     
    // subtract
    var dx = player.x - this.x;
    var dy = player.y - this.y;
    
    // normalize
    var length = Math.sqrt(dx * dx + dy * dy);
    if (length) {
      dx /= length;
      dy /= length;
    }

    //compruebo si el enemigo está mirando al player
    this.checkDirection(dx, dy);

    // move
    this.x += dx * 1.2; //ajusto la velocidad de desplazamiento con el 1.2
    this.y += dy * 1.2; //ajusto la velocidad de desplazamiento con el 1.2
    
  }

  checkDirection (x , y){
    const arcTan = Math.atan2(y, x) * 180 / Math.PI;

    if ((arcTan >= 0 && arcTan <= 90) ||
        (arcTan <= 0 && arcTan >= -90)){
      this.direction = 'right';
    }else{
      this.direction = 'left';
    }
  }

  changeSprite (action){
    if (!this.spriteBlocked){
      //Creates sprite's string with the action parameter and the direction of the player
      let newSprite = action + this.direction.charAt(0).toUpperCase() + this.direction.slice(1);
      this.sprite = this.sprites[newSprite];
    }
  }

  attack (){
    const attackType = this.getRandom(0, 1) === 0 ? 'punch' : 'kick';
    this.changeSprite(attackType);
    return (this.strength);
  }

  receiveDamage (damage){
    //actualiza el sprite
    this.changeSprite('damage');
    this.spriteBlocked = true;
    this.animationTimeout(1000);

    this.health -= damage;
    return this.isDead() ? false : true; //devuelve true si lo ha dañado y false si esta muerto
  }

  //checks if enemy has dead
  isDead (){
    if (this.health <= 0){
      this.dead();
      return true;
    }
    return false;
  }

  dead (){
    //actualiza el sprite
    this.changeSprite('damage');
  }

  animationTimeout (timeout){
    setTimeout(() => {
      this.spriteBlocked = false;
    }, timeout);
  }
}