class Sprite {
  constructor (url, src, sSize, dSize, speed, frames, loop){
    this.url = url; //the path to the image for this sprite
    this.src = src; //Object with the x and y coordinate in the image for this sprite
    this.sSize = sSize; //Object with size of the sprite (one keyframe)
    this.dSize = dSize; //Object with size in the canvas
    this.speed = speed; //speed in frames/sec for animating
    this.frames = frames; //number of frames of the animation
    this.animationId = undefined //id of animation interval
    this.currentFrame = 0;
    this.framesCount = 0; //updates until frame change
    this.loop = loop; //false if sprites only animates once
  }

  updateSprite () {
    this.framesCount++;
    if (this.framesCount > this.speed) {
      this.framesCount = 0;
      // If the current frame index is in range
      if (this.currentFrame < this.frames - 1) {	
          // Go to the next frame
          this.currentFrame++;
      } else if(this.loop){
          this.currentFrame = 0;
      }
    }
  }

  drawSprite (ctx, x, y) {
    ctx.drawImage(images[this.url],
                  (this.src.x + (this.currentFrame * this.sSize.width)), this.src.y,
                  //this.src.x, this.src.y,
                  this.sSize.width, this.sSize.height,
                  x, y,
                  this.dSize.width, this.dSize.height);
  }
  
}
