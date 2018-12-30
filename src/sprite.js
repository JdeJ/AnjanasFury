class Sprite {
  constructor (url, src, sSize, dSize, speed, frames, once){
    this.url = url; //the path to the image for this sprite
    this.src = src; //Object with the x and y coordinate in the image for this sprite
    this.sSize = sSize; //Object with size of the sprite (one keyframe)
    this.dSize = dSize; //Object with size in the canvas
    this.speed = typeof speed === 'number' ? speed : 0; //speed in frames/sec for animating
    this.frames = frames; //number of frames of the animation
    this.once = once; //true to only run the animation once, defaults to false
    this.id = undefined //id of animation interval
  }

  refresh (vel) {
    this.index += this.speed*vel;
  }

  drawSprite (ctx, x, y) {
    var frame = 0;

    if(this.speed > 1) {
      // this.id = clearInterval(this.id);
      // this.id = setInterval(()=> {
      //   this.frame = ++this.frame % this.frameCount;
      //   this.spriteX = this.frame * this.widthFrame;
      // }, this.speedFrame);

    }else{
      ctx.drawImage(images[this.url],
                    this.src.x, this.src.y,
                    this.sSize.width, this.sSize.height,
                    x, y,
                    this.dSize.width, this.dSize.height);
    }
    
  }
  
}
