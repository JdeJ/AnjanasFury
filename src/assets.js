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
                                    'img/items.png', 
                                    'img/axel.png', 'img/j.png', 'img/oriber.png'); 

//Items arrays
const rewardsArray = ['radio', 'dollar', 'gold', 'hat', 'hamburguer', 'barbeque', 'pizza', 'pineapple'];

const obstaclesArray = ['bidon', 'tyres', 'box'];

//Enemies array
const enemiesArray = ['axel', 'j', 'oriber'];

//Stage timeouts object
const timeouts ={
  'slum':{0: 60, 1: 30, 2: 45},
  'subway':{0: 80, 1: 99},
};

//Phase available enemies object
const availableEnemies ={
  'slum':{0: 4, 1: 3, 2: 6},
  'subway':{0: 7, 1: 10},
};

//Stage phase pass object
const phasePass = {
  'slum':{
    0: {x: 760, stageX: -1880, minY: 255, maxY: 355},
    1: {x: 800, stageX: -426, minY: 270, maxY: 280},
    2: {x: 700, stageX: -1079, minY: 250, maxY: 310},
  },
  'subway':{
    0: {x: 765, stageX: -4870, minY: 233, maxY: 363},
    1: {x: 760, stageX: -4590, minY: 232, maxY: 362},
  }
};