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
  'slum':{0: 60, 1: 30, 2: 40},
  'subway':{0: 75, 1: 99},
};

//Phase available enemies object
const availableEnemies ={
  'slum':{0: 2, 1: 1, 2: 1},
  'subway':{0: 1, 1: 1},
};