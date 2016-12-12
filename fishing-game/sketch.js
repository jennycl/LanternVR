var world;
var sky;
var tank;
var fish;
var ball;
var fishies = [];
var rod;
var foundRod = false;

function setup() {
  noCanvas();
  world = new World('VRScene');
  sky = select('water');
  // tank = new Tank(0,0,5);
  fish = new Fish(0,0,-5);
  
  for(var f = 0; f < 25; f++){
    var yValue = random(-15,150);
    var xValue = random(-150,150);
    var zValue = random(-150,-50);
    var temp = new Fish(xValue,yValue,zValue);
    fishies.push(temp);
  }
  
  rod = new DAE({
    x:0, y:-5, z:0,
    asset:'model',
    clickFunction: function(theRod){
      foundRod = true;
    }
    // scaleX:100, scaleY:100, scaleZ:100
  });
  world.add(rod);
  
}

function draw() {
  // ball.move();
  fish.move();
  for(var f = 0; f < fishies.length; f++){
    fishies[f].move();
  }
}

// // testing circular motion
// function Ball(x,y,z){
//   this.ball = new TorusKnot({
//     x:x, y:y, z:z,
//     red:0, green:0, blue:0,
//     radius:1
//   });
//   world.add(this.ball);
  
//   this.xAngle = 0;
//   // this.yAngle = 0;
//   this.zAngle = 0;
  
//   this.rX = 0;
//   this.rY = 0;
//   this.rZ = 0;
  
//   this.move = function(){
//     this.ball.setX(25*cos(this.xAngle));
//     // this.ball.setY(5*sin(this.yAngle));
//     this.ball.setZ(25*sin(this.zAngle));
//     this.xAngle+=0.01;
//     // this.yAngle+=0.01;
//     this.zAngle+=0.01;
    
//     var xPos = this.ball.getX();
//     var yPos = this.ball.getY();
//     var zPos = this.ball.getZ();
    
//     this.rX = atan2(yPos, zPos);
//     if(zPos >= 0){
//       this.rY = -(atan2(xPos * cos(this.rX), zPos));
//     }
//     else{
//       this.rY = atan2(xPos * cos(this.rX), -(zPos));
//     }
//     this.rZ = atan2(cos(this.rX), sin(this.rX) * sin(this.rY));
    
//     this.ball.setRotation(this.rX, this.rY, this.rZ);
//   }
// }

// more like a water dome / sphere
function Tank(x,y,z){
  this.tank = new Sphere({
    x:0, y:0, z:0,
    radius:100,
    asset:'inWater',
    repeatX: 3, repeatY:2,
    transparent:true
  });
  world.addChild(this.tank);
}

// constructor for fish objects
function Fish(x,y,z){
  this.originalX = x;
  this.originalZ = z;
  
  this.direction = random(-1,1);
  this.direction = map(this.direction, -1, 1, 0, 180);
  
  this.fish = new Container3D({
    x:x, y:y, z:z,
    scaleX:5, scaleY:5, scaleZ:5,
    rotationY: this.direction
  });
  world.add(this.fish);

  this.head = new Octahedron({
    x:0, y:0, z:0,
    red:255, green:140, blue:0,
    radius:1.5,
  });
  this.fish.addChild(this.head);
  
  this.tail = new Tetrahedron({
    x:1.5, y:0, z:0,
    red:255, green:140, blue:0,
    radius:1,
    rotationX:315
  });
  this.fish.addChild(this.tail);
  
  this.left_eye = new Sphere({
    x:-0.3, y:0.2, z:1.2,
    red:0, green:0, blue:0,
    radius:0.1
  });
  this.fish.addChild(this.left_eye);
  
  this.right_eye = new Sphere({
    x:-0.3, y:0.2, z:-1.2,
    red:0, green:0, blue:0,
    radius:0.1
  });
  this.fish.addChild(this.right_eye);
  
  this.angle = 0;
  this.angleChange = random (0.001,0.01);
  
  this.zPos = this.fish.getZ();
  this.xPos = this.fish.getX();
  this.radiusOfRotation = random(100,500);
    
  // given the start positions of the objects
  this.move = function(){
    var newX = (this.originalX) + this.radiusOfRotation * cos(this.angle);
    var newZ = (this.originalZ) + this.radiusOfRotation * sin(this.angle);
    
    if(this.direction == 180){
      this.fish.setX(-newX);
      this.fish.setZ(-newZ);
    }
    else{
      this.fish.setX(newX);
      this.fish.setZ(newZ);
    }
    this.angle+=this.angleChange;
  }
}