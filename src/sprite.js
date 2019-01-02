class Sprite {
  constructor (url, src, sSize, dSize, speed, frames){
    this.url = url; //the path to the image for this sprite
    this.src = src; //Object with the x and y coordinate in the image for this sprite
    this.sSize = sSize; //Object with size of the sprite (one keyframe)
    this.dSize = dSize; //Object with size in the canvas
    this.speed = speed; //speed in frames/sec for animating
    this.frames = frames; //number of frames of the animation
    this.animationId = undefined //id of animation interval
    this.currentFrame = 1;
  }

  updateSprite () {
    this.currentFrame++;
    if(this.currentFrame > this.frames){
      this.currentFrame = 1;
    }
  }

  stop () {
    this.animationId = clearInterval(this.animationId);
    this.animationId = undefined;
  }

  drawSprite (ctx, x, y) {
    var frame = 0;

    if(this.frames > 1) {


      // this.id = clearInterval(this.id);
      // this.id = setInterval(()=> {
      //   this.frame = ++this.frame % this.frameCount;
      //   this.spriteX = this.frame * this.widthFrame;
      // }, this.speedFrame);

      // var max = this.frames.length;
      //   var idx = Math.floor(this._index);
      //   frame = this.frames[idx % max];

      //   if(this.once && idx >= max) {
      //       this.done = true;
      //       return;
      //   }

    }
    
    ctx.drawImage(images[this.url],
                  (this.src.x + ((this.currentFrame-1) * this.sSize.width)), this.src.y,
                  //this.src.x, this.src.y,
                  this.sSize.width, this.sSize.height,
                  x, y,
                  this.dSize.width, this.dSize.height);
  }
  
}
