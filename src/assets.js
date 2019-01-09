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



//Stage backgrounds sprites
var st1P1l0 = new Sprite('img/stage1.png',{x:0,y:0},{width:1296, height:160},{width:3038, height:375},0, 1);
var st1P1l1 = new Sprite('img/stage1.png',{x:0,y:167},{width:1296, height:256},{width:3038, height:600},0, 1);
var st1P2l0 = new Sprite('img/stage1.png',{x:1304,y:0},{width:608, height:256},{width:1426, height:600},0, 1);
var st1P3l0 = new Sprite('img/stage1.png',{x:1918,y:257},{width:944, height:160},{width:2212, height:375},0, 1);
var st1P3l1 = new Sprite('img/stage1.png',{x:1918,y:0},{width:944, height:256},{width:2212, height:600},0, 1);
var st2P1l0 = new Sprite('img/stage2.png',{x:0,y:0},{width:2512, height:256},{width:5888, height:600},0, 1);
var st2P1l1 = new Sprite('img/stage2.png',{x:0,y:272},{width:2512, height:142},{width:5940, height:350},0, 1);
var st2P2l0 = new Sprite('img/stage2.png',{x:0,y:426},{width:2400, height:255},{width:5647, height:600},0, 1);

//Stages & Phases object
var phasesSprites = {
  slum: [
    new Phase(3038, [st1P1l0, st1P1l1], {minX: 46, maxX: 2880}, {minY: 465, maxY: 592}, 860,false),
    new Phase(1426, [st1P2l0], {minX: 60, maxX: 1380}, {minY: 450, maxY: 592}, 900,false),
    new Phase(2212, [st1P3l0, st1P3l1], {minX: 220, maxX: 2077}, {minY: 470, maxY: 592}, 780,false)
  ],

  subway: [
    new Phase(5888, [st2P1l0], {minX: 270, maxX: 5880}, {minY: 453, maxY: 592}, 870,false),
    //var st2P1 = new Phase(5888, [st2P1l0, st2P1l1], {minX: 400, maxX: 5908}, {minY: 453, maxY: 592}, 944,false);
    new Phase(5647, [st2P2l0], {minX: 39, maxX: 5600}, {minY: 452, maxY: 592}, 870,false)
  ],
};

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

//Rewards array
var rewardsArray = [

];

//Obstacle array
var obstaclesArray = [
  
];

//Enemies array
var enemiesArray = [];

//Stage timeouts object
var timeouts ={
  stage1:{phase1: 60, phase2: 40, phase3: 60},
  stage2:{phase1: 99, phase2: 99},
};