function generateImagesObject() {
  var images = {};

  for (let i = 0; i < arguments.length; i++) {
    images[arguments[i]] = new Image();
    images[arguments[i]].src = arguments[i];
  }

  return images;
};

//Images Object
const images = generateImagesObject('img/stage1.png', 'img/stage2.png',
                                    'img/cody.png','img/haggar.png',
                                    'img/cody-player.png', 'img/cody-select.png',
                                    'img/haggar-player.png', 'img/haggar-select.png',
                                    'img/items.png'); 

//Items sprites objects
var rewardsSprites = {
  radio: new Sprite('img/items.png',{x:115,y:7},{width:29, height:16},{width:69, height:38},0,1,false),
  dollar: new Sprite('img/items.png',{x:164,y:7},{width:32, height:11},{width:63, height:22},0,1,false),
  gold: new Sprite('img/items.png',{x:9,y:7},{width:32, height:12},{width:69, height:26},0,1,false),
  hat: new Sprite('img/items.png',{x:56,y:7},{width:24, height:13},{width:57, height:34},0,1,false),
  hamburguer: new Sprite('img/items.png',{x:164,y:33},{width:31, height:15},{width:55, height:26},0,1,false),
  barbeque: new Sprite('img/items.png',{x:115,y:33},{width:32, height:22},{width:49, height:34},0,1,false),
  pizza: new Sprite('img/items.png',{x:9,y:33},{width:30, height:14},{width:62, height:29},0,1,false),
  pineapple: new Sprite('img/items.png',{x:56,y:33},{width:32, height:16},{width:55, height:28},0,1,false),
};

var obstaclesSprites = {
  bidon: new Sprite('img/items.png',{x:30,y:177},{width:32, height:62},{width:115, height:222},0,2,false),
  tyres: new Sprite('img/items.png',{x:122,y:178},{width:34, height:52},{width:146, height:222},0,1,false),
  box: new Sprite('img/items.png',{x:197,y:172},{width:48, height:80},{width:133, height:222},0,2,false),
};

//Enemies array
var enemiesArray = [];

//Stage timeouts object
var timeouts ={
  stage1:{phase1: 60, phase2: 40, phase3: 60},
  stage2:{phase1: 99, phase2: 99},
};