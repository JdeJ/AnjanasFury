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
var st1P1l0 = new Sprite('img/stage1.png',{x:0,y:0},{width:1296, height:160},{width:3038, height:375},0, 1);
var st1P1l1 = new Sprite('img/stage1.png',{x:0,y:167},{width:1296, height:256},{width:3038, height:600},0, 1);
var st1P2l0 = new Sprite('img/stage1.png',{x:1304,y:0},{width:608, height:256},{width:1426, height:600},0, 1);
var st1P3l0 = new Sprite('img/stage1.png',{x:1918,y:257},{width:944, height:160},{width:2212, height:375},0, 1);
var st1P3l1 = new Sprite('img/stage1.png',{x:1918,y:0},{width:944, height:256},{width:2212, height:600},0, 1);
var st2P1l0 = new Sprite('img/stage2.png',{x:0,y:0},{width:2512, height:256},{width:5888, height:600},0, 1);
var st2P1l1 = new Sprite('img/stage2.png',{x:0,y:272},{width:2512, height:142},{width:5940, height:350},0, 1);
var st2P2l0 = new Sprite('img/stage2.png',{x:0,y:426},{width:2400, height:255},{width:5647, height:600},0, 1);

//Phases
var st1P1 = new Phase(3038, [st1P1l0, st1P1l1], {minX: 46, maxX: 2880}, {minY: 465, maxY: 592}, 860,false);
var st1P2 = new Phase(1426, [st1P2l0], {minX: 60, maxX: 1380}, {minY: 450, maxY: 592}, 900,false);
var st1P3 = new Phase(2212, [st1P3l0, st1P3l1], {minX: 220, maxX: 2077}, {minY: 470, maxY: 592}, 780,false);
//var st2P1 = new Phase(5888, [st2P1l0, st2P1l1], {minX: 400, maxX: 5908}, {minY: 453, maxY: 592}, 944,false);
var st2P1 = new Phase(5888, [st2P1l0], {minX: 270, maxX: 5880}, {minY: 453, maxY: 592}, 870,false);
var st2P2 = new Phase(5647, [st2P2l0], {minX: 39, maxX: 5600}, {minY: 452, maxY: 592}, 870,false);

//Player sprites object
var playerSprites = {
  cody: {
    stillRight: new Sprite('img/cody.png',{x:0,y:0},{width:54, height:93},{width:129, height:222},0,1,false),
    stillLeft: new Sprite('img/cody.png',{x:0,y:95},{width:54, height:93},{width:129, height:222},0,1,false),
    goRight: new Sprite('img/cody.png',{x:54,y:0},{width:62, height:95},{width:145, height:222},3,10,true),
    goLeft: new Sprite('img/cody.png',{x:54,y:95},{width:62, height:95},{width:145, height:222},3,10,true),
    punchRight: new Sprite('img/cody.png',{x:0,y:190},{width:85, height:90},{width:210, height:222},3,2,true),
    punchLeft: new Sprite('img/cody.png',{x:0,y:280},{width:85, height:90},{width:210, height:222},3,2,true),
    kickRight: new Sprite('img/cody.png',{x:502,y:190},{width:65, height:88},{width:164, height:222},3,3,true),
    kickLeft: new Sprite('img/cody.png',{x:502,y:278},{width:65, height:88},{width:164, height:222},3,3,true),
    hookRight: new Sprite('img/cody.png',{x:170,y:190},{width:83, height:111},{width:166, height:222},3,4,true),
    hookLeft: new Sprite('img/cody.png',{x:170,y:301},{width:83, height:111},{width:166, height:222},3,4,true),
    takeRight: new Sprite('img/cody.png',{x:443,y:412},{width:54, height:93},{width:129, height:222},5,1,false),
    takeLeft: new Sprite('img/cody.png',{x:443,y:505},{width:54, height:93},{width:129, height:222},5,1,false),
    dieRight: new Sprite('img/cody.png',{x:0,y:412},{width:97, height:96},{width:225, height:222},5,4,false),
    dieLeft: new Sprite('img/cody.png',{x:0,y:508},{width:97, height:96},{width:225, height:222},5,4,false),
    damageRight: new Sprite('img/cody.png',{x:388,y:412},{width:55, height:84},{width:148, height:222},0,1,false),
    damageLeft: new Sprite('img/cody.png',{x:388,y:496},{width:55, height:84},{width:148, height:222},0,1,false),
  },
};

//Objects array
var objectsArray = [];

//Enemies array
var enemiesArray = [];

