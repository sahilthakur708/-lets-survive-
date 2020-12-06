var bgImg,invisibleGround;
var playerRightRunning,player;


var playerLeftRunning;
var playerStandingLeft;
var playerStandingRight;


var bombImage,bombExplodingImage;
var brickImage,coinImage;


var bg2Img,bg3Img,bg4Img;
var backGroundSound,bombExplodingSound;


var bulletFiringSound,healingSound;
var jamingMachineSound,jumpingSound;


var trapSound;
var drone,hangingTrap;
var enemyMachineGun;
var playButton,rock;


var trap1,trap2;
var scientificEnemyGun,scientificTrap;
var smallGround;


var invisibleBrick,brickGroup;
var invisibleBrick;


const Engine=Matter.Engine
const World=Matter.World
const Body=Matter.Body
const Bodies=Matter.Bodies


var engine,world;
var bulletDirection="right"

var groundGroup,invisibleGroundGroup;
var ground;
var gun;

var scieFieGun;
var brick;

var scieFieGunBullets;

function preload (){

 drone=loadImage("images/drone.png")

 hangingTrap=loadImage("images/hangingTrap.png")

 enemyMachineGun=loadImage("images/machine enemy.png")

 playButton=loadImage("images/playsurvivel.png")

 rock=loadImage("images/rock.png")

 trap1=loadImage("images/trap1.png")

 trap2=loadImage("images/trap2.png")

 scientificEnemyGun=loadImage("images/scie fie enemy.png")

 scientificTrap=loadImage("images/scie-fi.png")

 smallGround=loadImage("images/small ground.png")

 trap2=loadImage("images/trap2.png")

 bombImage=loadImage("images/bomb.png")

 bombExplodingImage=loadImage("images/bombExploding.png")

 brickImage=loadImage("images/brick.png")

 coinImage=loadImage("images/coin.png")

 bgImg=loadImage("images/ground.jpg")

 playerRightRunning=loadAnimation("images/player1.png","images/player2.png","images/player3.png","images/player4.png","images/player5.png","images/player6.png")

 playerStandingLeft=loadAnimation("images/leftPlayer1.png")

 playerStandingRight=loadAnimation("images/player1.png")

 playerLeftRunning=loadAnimation("images/leftPlayer1.png","images/leftPlayer2.png","images/leftPlayer3.png","images/leftPlayer4.png","images/leftPlayer5.png","images/leftPlayer6.png")

 bulletFiringSound=loadSound("sounds/bulletFiring.mp3")

 healingSound=loadSound("sounds/healing.mp3")

 jamingMachineSound=loadSound("sounds/jamingMachine.mp3")

 jumpingSound=loadSound("sounds/jumpingSound.mp3")

 trapSound=loadSound("sounds/trap.mp3")

 backGroundSound=loadSound("sounds/backGround.mp3")

 bombExplodingSound=loadSound("sounds/bombExplosion.mp3")

 bg2Img=loadImage("images/ground2.jpg")

 bg3Img=loadImage("images/ground3.jpg")

 bg4Img=loadImage("images/ground4.png")

}

function setup() {


     createCanvas(windowWidth,windowHeight);


      engine = Engine.create();
      world = engine.world;


      invisibleGround=createSprite(width/2,height-70 , width*100, 50);
      invisibleGround.visible=false


      player=createSprite(width/2-50,height-280,10,10)

player.debug=true
      player.addAnimation("running3",playerStandingRight)
      player.addAnimation("running1",playerRightRunning)
      player.addAnimation("running2",playerLeftRunning)
      player.addAnimation("running4",playerStandingLeft)
      

       brickGroup=createGroup()
       groundGroup=createGroup()
       invisibleBrickGroup=createGroup()

}

function draw() {

  background(255,255,255); 

      image(bgImg,0,0,width*2,height) 
      image(bg2Img,3600,0,width*2,height) 
      image(bg3Img,7200,0,width*2,height)
      image(bg4Img,10400,0,width*2,height)

       camera.x=player.x

       player.collide(invisibleGround)

  if(keyWentUp("left")){

  player.changeAnimation("running4",playerStandingLeft)

  }

  if(keyDown("left")){

    player.x-=18

    player.changeAnimation("running2",playerLeftRunning)
    bulletDirection="left"

  }

if(keyWentUp("right")){

player.changeAnimation("running3",playerStandingRight)

}

if(keyDown("right")){

    player.x+=18

    player.changeAnimation("running1",playerRightRunning)
    bulletDirection="right"

  }

if(keyWentDown("space")){

      player.velocityY-=30
      jumpingSound.play()

}

if(keyWentDown("enter")){
  
  var bullets=createSprite(player.x+70,player.y-20,10,10)
 
  bulletFiringSound.play()

  if(bulletDirection==="right"){

  bullets.velocityX=40
 

}


else{

  bullets.x=player.x-70
  bullets.velocityX=-40
 

}

}
  

  player.velocityY+=3


    spawnBricks()
    spawnGround()
    spawnGuns()
   spawnSciFieGun()
   

    //invisibleBrickGroup.collide(player)
//player.bounceOff(groundGroup)
//player.bounceOff(brickGroup)


  drawSprites();


}


function spawnBricks() {


  if (frameCount % 300 === 0) {


         brick = createSprite(14000,120,100,40);
        brick.y = Math.round(random(200,500));
        brick.addImage(brickImage);
        brick.velocityX = -10;
        brick.lifetime = 1500;
        brickGroup.add(brick)
       // invisibleBrick.visible=false
        

       }


}


function spawnGround() {


  if (frameCount % 300 === 0) {


         ground = createSprite(7000,120,100,30);
        ground.y= Math.round(random(200,500));
        ground.addImage(smallGround);
        ground.velocityX = -10;
        ground.lifetime = 700;
        groundGroup.add(ground)
       // invisibleBrick2.visible=false
       

       }


}


function spawnGuns(){


  if(frameCount%600===0){

    gun=createSprite(7000,110,100,20)
    gun.y=ground.y-20
    gun.x=ground.x
    gun.addImage(enemyMachineGun)
    gun.lifetime=700
    gun.velocityX=-10
    gun.scale=1/2

   setInterval(()=>{

    gunBullets=createSprite(gun.x-20,gun.y-30,10,5)
    gunBullets.velocityX=-30
    gunBullets.setlifetime=100

   },2000)

  }


}

function spawnSciFieGun (){


if (frameCount%600===0){

scieFieGun=createSprite(14000,120,10,5)
scieFieGun.x=brick.x
scieFieGun.y=brick.y-20
scieFieGun.addImage(scientificEnemyGun)
scieFieGun.lifetime=1300
scieFieGun.velocityX=-10
scieFieGun.scale=1/3

setInterval(()=>{

  scieFieGunBullets=createSprite(scieFieGun.x-20,scieFieGun.y-20,10,20)
  scieFieGunBullets.velocityX=-30
  scieFieGunBullets.lifetime=200

},2000)

}


}



