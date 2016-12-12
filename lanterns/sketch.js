var world;
var sky;
var lantern; 
var time = 0;
// var children = [];

function setup() {
  noCanvas();
  sky = select('sky');
  world = new World('VRScene');
  lantern = new Lantern(0,0,-5);
}

function draw() {
  // move forward when mouse is pressed on screen touched
  if (mouseIsPressed || touchIsDown){
    world.moveUserForward(0.1);
  }
  
  time+=1;
  lantern.switch(time);
  // children = lantern.lantern.getChildren();
  // console.log("switch to: " + children[2].getAsset());
}

function Lantern(x,y,z){
  this.lantern = new Container3D({
    x:x, y:y, z:z
    
  });
  world.add(this.lantern);
  
  this.shell = new Cylinder({
    x:0, y:0, z:0,
    height:2, radius:1,
    // radius:0.5, radiusTubular:0.2,
    // segmentsTubular:9,
    // rotationX:90,
    segmentsHeight:2,
    thetaStart:360,
    red:255, green:250, blue:205,
    opacity:0.7
  });
  
  this.lantern.addChild(this.shell);
  
  this.current_fire = 'fire_two';
  this.cycled = 0;
  this.switch = function(time){
    if(time % 5 == 0){
      // if(this.current_fire == 'fire_one' && this.cycled == 0){
      //   this.current_fire = 'fire_two';
      //   this.cycled++;
      // }
      // else if(this.current_fire == 'fire_two' && this.cycled == 1){
      //   this.current_fire = 'fire_three';
      //   this.cycled++;
      // }
      // else if(this.current_fire == 'fire_three' && this.cycled == 2){
      //   this.current_fire = 'fire_two';
      //   this.cycled++;
      // }
      // else if(this.current_fire == 'fire_two' && this.cycled == 3){
      //   this.current_fire = 'fire_one';
      //   this.cycled = 0;
      // }
      if(this.current_fire == 'fire_two' && this.cycled == 0){
        this.current_fire = 'fire_three';
        this.cycled++;
      }
      else if(this.current_fire == 'fire_three' && this.cycled == 1){
        this.current_fire = 'fire_two';
        this.cycled = 0;
      }
    }
    this.fire_one.setAsset(this.current_fire);
    this.fire_two.setAsset(this.current_fire);
  }
  
  this.fire_one = new Plane({
    x:0, y:0, z:0,
    width:2, height:2,
    // transparent: true,
    opacity:1,
    side:'both',
    asset:this.current_fire
  });
  this.lantern.addChild(this.fire_one);
  
  this.fire_two = new Plane({
    x:0, y:0, z:0,
    width:2, height:2,
    rotationY:90,
    // transparent: true,
    opacity:1,
    side:'both',
    asset:this.current_fire
  });
  this.lantern.addChild(this.fire_two);
  
}