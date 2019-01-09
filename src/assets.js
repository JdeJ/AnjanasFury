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

//Items arrays
var rewardsArray = ['radio', 'dollar', 'gold', 'hat', 'hamburguer', 'barbeque', 'pizza', 'pineapple'];

var obstaclesArray = ['bidon', 'tyres', 'box'];

//Enemies array
var enemiesArray = [];

//Stage timeouts object
var timeouts ={
  stage1:{phase1: 60, phase2: 40, phase3: 60},
  stage2:{phase1: 99, phase2: 99},
};