var monkey, monkey_img, banana, banana_img, stone, stone_img, score;
var backImg, jungle, ground;
var obstacleGroup, bananaGroup;

function preload(){ 
  backImg = loadImage("jungle.jpg");
  
  monkey_img = loadAnimation("Monkey_01.png","Monkey_02.png", "Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  banana_img = loadImage("banana.png");
  stone_img = loadImage("stone.png");
}  

function setup() {
  createCanvas(600, 300);
  jungle = createSprite(300,50);
  jungle.addImage("img", backImg);
    
  jungle.x = jungle.width /2;
  jungle.velocityX = -6;
  
  monkey = createSprite(50,230,20,40);
  monkey.addAnimation("running", monkey_img);
  monkey.scale = 0.075;
  
  ground = createSprite(100,260,600,10);
  ground.visible = false; 

  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  score = 0
}
  
function draw() {
  background(220);
  

  if(keyDown("space")) {
      monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground);

  if (jungle.x < 100){
      jungle.x = jungle.width/2;
  }
  
  if(bananaGroup.isTouching(monkey)) {
    score = score+2
    console.log(score)
    bananaGroup.destroyEach();  
    switch(score) {
    case 10: monkey.scale=0.12;
      break;
    case 20: monkey.scale=0.14;
      break;
    case 30: monkey.scale=0.16;
      break;
    case 40: monkey.scale=0.18
      break;
    default: break;
    }    
  }
  

  
  if(obstacleGroup.isTouching(monkey)) {
    monkey.scale = 0.075;
    obstacleGroup.destroyEach();
    score=0;
  }
  
  spawnBananas();
  spawnObstacles();
  drawSprites();
  
  textSize(20);
  text("Score: "+ score, 500,50);

}

function spawnBananas() {
 
  if (frameCount % 80 === 0) {
    banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage("banana's_image", banana_img);
    banana.scale = 0.035
    banana.velocityX = -6;
    
  
    banana.lifetime = 200;
    
   
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {
    stone = createSprite(600,240,10,40);
    stone.addImage("stone_image", stone_img);
    stone.scale = 0.1
    stone.velocityX = -6;

    stone.lifetime = 300;
   
    obstacleGroup.add(stone);
  }
}