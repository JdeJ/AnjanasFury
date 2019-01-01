class Phase {
  constructor (witdh, sprites, x, y, maxCanvasX){
    this.witdh = witdh; //Witdh of the scene
    this.sprites = sprites; //Array whith the sprites on draw order
    this.x = x; //Object with minX and maxX from the right
    this.y = y; //Object with minY and maxY from the top
    this.maxCanvasX = maxCanvasX; // maximum x position on canvas
  }
}