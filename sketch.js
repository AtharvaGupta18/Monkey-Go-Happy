var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;

var monkey_running, monkey_collided, monkey;

var gameOver, gameOverIMG, stoneIMG, stone, ground, groundIMG, stoneGroup;

var banana, bananaIMG, bananaGroup;

function preload() {

  monkey_running = loadAnimation("monkey1.png", "monkey2.png", "monkey3.png", "monkey4.png", "monkey5.png", "monkey6.png", "monkey7.png", "monkey8.png", "monkey9.png");

    
  monkey_collided = loadImage("monkey_collided.png");
  groundIMG = loadImage("jungle1.jpg");
  gameOverIMG = loadImage("gameOver.png");
  stoneIMG = loadImage("stone.png");
  bananaIMG = loadImage("banana.png");
}

function setup() {
  createCanvas(750, 450);
  
  ground = createSprite(200, 200, 400, 400);
  ground.addImage(groundIMG);

  monkey = createSprite(80,350,5,5);
  monkey.addAnimation("running",monkey_running);
 
  bananaGroup = new Group();
  stoneGroup = new Group();
  
  gameOver = createSprite(310,180,5,5);
  gameOver.addImage(gameOverIMG);
  gameOver.visible = false;
  
}

function draw() {
  
  background(255,255,255);
  edges = createEdgeSprites();
  
  if(gameState === PLAY){
    text("S",725,100);
    text("c",725,110);
    text("o",725,120);
    text("r",725,130);
    text("e",725,140);
    text("=",725,150);
    text(score,725,165);
    
    if(keyDown(LEFT_ARROW)){
      monkey.velocityX = -5;
    } 
    if(keyDown(RIGHT_ARROW)){
      monkey.velocityX = 5;
    }
    
    
    if(monkey.isTouching(bananaGroup)){
      score = score + 100;
      bananaGroup.destroyEach();
    }
    if(monkey.isTouching(stoneGroup)){
      stoneGroup.destroyEach();
      gameState = END;   
    }
    
    
    spawnBanana();
    spawnStone();
  }
  
  
  if(gameState === END){
    gameOver.visible = true;
    monkey.changeAnimation(monkey_collided);
    bananaGroup.visible = false;
    stoneGroup.visible = false;
    text("S",725,100);
    text("c",725,110);
    text("o",725,120);
    text("r",725,130);
    text("e",725,140);
    text("=",725,150);
    text(score,725,165);
    if(keyDown(LEFT_ARROW)){
      monkey.velocityX = 0;
    } 
    if(keyDown(RIGHT_ARROW)){
      monkey.velocityX = 0;
    }
  }
  
  monkey.collide(edges);
  
  drawSprites();
}

function spawnBanana(){
   if(frameCount % 100 === 0){ 
    var rand = random(100,400);
    banana = createSprite(rand,100,5,5);
    banana.addImage(bananaIMG);
    banana.velocityY = 5;
    banana.scale = 0.05; 
    banana.lifetime = 90;
    bananaGroup.add(banana);
     
   }
}

function spawnStone(){
  if(frameCount % 150 === 0){
    var rand1 = random(100,400);
    stone = createSprite(rand1,100,5,5);
    stone.addImage(stoneIMG);
    stone.velocityY = 5;
    stone.scale = 0.5;
    stone.lifetime = 90;
    stoneGroup.add(stone);
    
  }
}