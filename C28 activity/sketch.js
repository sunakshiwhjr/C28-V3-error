const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Render = Matter.Render;

var myEngine, myWorld;

var tower, towerImg, ground, cannon, cannonBallImg;
var backgroundImg;
var boat, boatImg;

var balls = [];
var boats = [];

var boatAnimation = []
var brokenBoatAnimation = [];


var boatSpritesheet, boatSpritedata;
var boatFrames;

var brokenBoatSpritesheet, brokenBoatSpritedata;
var brokenBoatFrames;

//do1 goto line 45
var waterSplashAnimation = [];
var waterSplashSpritesheet, waterSplashSpritedata;
var waterSplashFrames;

function preload()
{
  towerImg = loadImage("assets/tower.png");
  backgroundImg = loadImage('assets/background.gif');
  cannonBallImg = loadImage('assets/cannonball.png');
  boatImg = loadImage('assets/boat.png');

   boatSpritedata = loadJSON('assets/boat/boat.json');
  boatSpritesheet = loadImage('assets/boat/boat.png');

  brokenBoatSpritedata = loadJSON('assets/boat/broken_boat.json');
  brokenBoatSpritesheet = loadImage('assets/boat/broken_boat.png');

  //do2 goto line 102
  waterSplashSpritedata = loadJSON('assets/water_splash/water_splash.json');
  waterSplashSpritesheet = loadImage('assets/water_splash/water_splash.png');
    
}

function setup(){
    createCanvas(1200,600);
    myEngine = Engine.create();
    myWorld = myEngine.world;

    var render = Render.create({
        element: document.body,
        engine: myEngine,
        options: {
          width: 1200,
          height: 600,
          wireframes: false
        }
      });
      Render.run(render);

    tower = new Tower(150, 380, 190, 330);

    ground = new Ground(600, height-1, 1200,1);
    angle = -PI/4
    cannon = new Cannon(185, 140, 90, 56,angle);

    //boatFrames
    boatFrames = boatSpritedata.frames;
    
    for(var i=0; i<boatFrames.length; i++)
    {

         var pos = boatFrames[i].position;

         //access the image from the boat.png
         var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
         boatAnimation.push(img);
    }

     console.log(boatSpritedata);
 


     //Broken Boat Images
     brokenBoatFrames = brokenBoatSpritedata.frames;

     for(var i=0; i<brokenBoatFrames.length; i++)
     {
         var pos = brokenBoatFrames[i].position;

         var img = brokenBoatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
         brokenBoatAnimation.push(img);
     }

     //waterSplash image
     //do3 
     waterSplashFrames = waterSplashSpritedata.frames;

     for(var i=0; i<waterSplashFrames.length; i++)
     {
        var pos = waterSplashFrames[i].position;
        var img = waterSplashSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
        waterSplashAnimation.push(img)
     }
    //end3 goto cannonball.js line 20

}

function draw(){
    background(backgroundImg);
    Engine.update(myEngine);

    ground.display();
    showBoats();
 
    //call the showCannonBalls 
    for(var i=0; i<balls.length; i++)
    {
      showCannonBalls(balls[i], i);
    
      for(var j=0; j<boats.length; j++)
      {
        if(balls[i] !== undefined && boats[j] !== undefined)
        {
          //Matter.SAT.collides(playerObject, groundObject).collided
          // returns either true or false depending on if the two objects are colliding
           var collision = Matter.SAT.collides(balls[i].body, boats[j].body);

           if(collision.collided)
           {
              //do8
              if(!boats[j].isBroken && !balls[i].isSink)
            {
             //define remove inside Boat.js
             boats[j].remove(j);
             j--;
            }

             Matter.World.remove(myWorld, balls[i].body);
            // balls.splice(i,1);
            delete balls[i]
             i--;
           }
        }
      }
    }

  
    tower.display();
    cannon.display();




    textSize(20)
    text(mouseX + "," + mouseY, mouseX,mouseY);
}


//this is the array --> cannonball 
function showCannonBalls(cannonBall, index)
{
  if(cannonBall)
  {
    cannonBall.display();
    cannonBall.animate();
  }
    

    //remove the ball once it hits the ground or out of the canvas
    if(cannonBall.body.position.x >= width ||cannonBall.body.position.y >=height -50||cannonBall.body.position.y ===ground.body)
    {
      //do5
      if(!cannonBall.isSink)
      {
        //do5
        cannonBall.remove(index);
        //comment line 175 & 176
        //Matter.World.remove(myWorld, ball.body);
        //balls.splice(index,1);
        //end5 goto Cannonball.js remove()
      }
      
    }
}

// can you share me this project 
//ok wait lemme share the github link
 function keyPressed()
{
  if(keyCode === DOWN_ARROW)
  {
    
    var cannonBall = new CannonBall(cannon.x +10, cannon.y+10, 40);
    balls.push(cannonBall);
  }
}

function keyReleased()
{
    if(keyCode === DOWN_ARROW)
    {
      
     // cannonBall.shoot();
     
     balls[balls.length -1].shoot();
      
    
    }
}

function showBoats()
{
 
  //array length --> when there is atleast 1 boat then the creation of 2,3 & 4 boat
  if(boats.length > 0 )
  {

     if(boats.length < 4 && boats[boats.length -1].body.position.x < width-300)
     {
        var position = [height-120, height-190, height-155];
        var position = random(position);
        var boat = new Boat(width, height-100, 200, 200, position, boatAnimation);
        boats.push(boat);
     }

      for(var i=0; i<boats.length; i++)
      {
        Body.setVelocity(boats[i].body, {x: -0.9, y:0});
        boats[i].display();
        boats[i].animate();
        

      }
  }

   else{

    var boat = new Boat(width, height-100, 200,200,height-100, boatAnimation);
    boats.push(boat);
   }
}