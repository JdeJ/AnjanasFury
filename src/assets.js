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
                                    'img/cody-player.png', 'img/cody-select.png'); 

//Stage backgrounds sprites
var st1P1l0 = new Sprite('img/stage1.png',{x:0,y:0},{width:1296, height:160},{width:3038, height:375},0, 0, true);
var st1P1l1 = new Sprite('img/stage1.png',{x:0,y:167},{width:1296, height:256},{width:3038, height:600},0, 0, true);
var st1P2l0 = new Sprite('img/stage1.png',{x:1304,y:0},{width:608, height:256},{width:1426, height:600},0, 0, true);
var st1P3l0 = new Sprite('img/stage1.png',{x:1918,y:257},{width:944, height:160},{width:2212, height:375},0, 0, true);
var st1P3l1 = new Sprite('img/stage1.png',{x:1918,y:0},{width:944, height:256},{width:2212, height:600},0, 0, true);
var st2P1l0 = new Sprite('img/stage2.png',{x:0,y:0},{width:2512, height:256},{width:5888, height:600},0, 0, true);
var st2P1l1 = new Sprite('img/stage2.png',{x:0,y:272},{width:2512, height:142},{width:5940, height:350},0, 0, true);
var st2P2l0 = new Sprite('img/stage2.png',{x:0,y:426},{width:2400, height:255},{width:5647, height:600},0, 0, true);

//Phases
var st1P1 = new Phase(3038, [st1P1l0, st1P1l1], {minX: 46, maxX: 2918}, {minY: 548, maxY: 600});
var st1P2 = new Phase(1426, [st1P2l0], {minX: 46, maxX: 1380}, {minY: 551, maxY: 600});
var st1P3 = new Phase(2212, [st1P3l0, st1P3l1], {minX: 116, maxX: 2077}, {minY: 548, maxY: 600});
var st2P1 = new Phase(5888, [st2P1l0, st2P1l1], {minX: 124, maxX: 5868}, {minY: 543, maxY: 600});
var st2P2 = new Phase(5647, [st2P2l0], {minX: 39, maxX: 5591}, {minY: 537, maxY: 600});

//Objects array
var objectsArray = [];

//Enemies array
var enemiesArray = [];

