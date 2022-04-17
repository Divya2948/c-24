const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonBall;
//creating an empty array for balls
var balls=[]

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);
  cannon = new Cannon(180, 110, 130, 100, angle);
  cannonBall = new CannonBall(cannon.x, cannon.y);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  push();
  fill("brown");
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  pop();

  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();


  //using for loop over the ball array to get all the cannon balls from the balls array
  for(var i=0;i<balls.length;i++){
    //calling cannon balls multiple times
    showCannonBalls(balls[i])
  }
  cannon.display();
 
}

//creating the function to display the cannon ball
function showCannonBalls(ball){
  if(ball){
    ball.display()
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    //when the key is released shoot function is called on the ball array
    balls[balls.length-1].shoot()
  }
}

//crating new cannon ball when the down arrow key is pressed
function keyPressed(){
  if(keyCode === DOWN_ARROW){
    var cannonBall=new CannonBall(cannon.x,cannon.y)
    //pushing(adding)the cannon balls into the balls array
    balls.push(cannonBall)
  }
}
