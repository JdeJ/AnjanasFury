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
                                    'img/axel.png', 'img/j.png', 'img/oriber.png',
                                    'img/anjana.png', 'img/anjana-player.png', 'img/anjana-select.png'); 

//Items arrays
const rewardsArray = ['radio', 'dollar', 'gold', 'hat', 'hamburguer', 'barbeque', 'pizza', 'pineapple'];

const obstaclesArray = ['bidon', 'tyres', 'box'];

//Enemies array
const enemiesArray = ['axel', 'j', 'oriber'];

//Players array
const players = ['cody', 'haggar', 'anjana'];

//Stage timeouts object
const timeouts ={
  'slum':{0: 999, 1: 30, 2: 45},
  'subway':{0: 80, 1: 99},
};

//Phase available enemies object
const availableEnemies ={
  'slum':{0: 1, 1: 3, 2: 6},
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

//Game sounds
var soundPresents = new Audio(); 
  soundPresents.src = 'sounds/presents.mp3'; 
  //soundIntro.volume -= 0.8; 
  soundPresents.loop = false;

var soundIntro = new Audio(); 
  soundIntro.src = 'sounds/intro.mp3'; 
  //soundIntro.volume -= 0.8; 
  soundIntro.loop = true;

var soundPlayer = new Audio(); 
  soundPlayer.src = 'sounds/player-select.mp3'; 
  //soundIntro.volume -= 0.8; 
  soundPlayer.loop = true;

var soundSlum = new Audio(); 
  soundSlum.src = 'sounds/slum.mp3'; 
  //soundIntro.volume -= 0.8; 
  soundSlum.loop = true;

var soundSubway = new Audio(); 
  soundSubway.src = 'sounds/subway.mp3'; 
  //soundIntro.volume -= 0.8; 
  soundSubway.loop = true;

var soundReward = new Audio(); 
  soundReward.src = 'sounds/reward.mp3'; 
  //soundIntro.volume -= 0.8; 
  soundReward.loop = false;

var soundPause = new Audio(); 
  soundPause.src = 'sounds/pause.mp3'; 
  //soundIntro.volume -= 0.8; 
  soundPause.loop = false;

var soundStart = new Audio(); 
  soundStart.src = 'sounds/game-start.mp3'; 
  //soundIntro.volume -= 0.8; 
  soundStart.loop = false;

var soundGameOver = new Audio(); 
  soundGameOver.src = 'sounds/game-over.mp3'; 
  //soundIntro.volume -= 0.8; 
  soundGameOver.loop = false;

var soundContinueSelection = new Audio(); 
  soundContinueSelection.src = 'sounds/continue.mp3'; 
  //soundIntro.volume -= 0.8; 
  soundContinueSelection.loop = false;

var soundContinueScreen = new Audio(); 
  soundContinueScreen.src = 'sounds/continue-screen.mp3'; 
  //soundIntro.volume -= 0.8; 
  soundContinueScreen.loop = true;