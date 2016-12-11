var world;
var sky;
var all_skies = ["city_sky", "space_sky"];
var current_sky = 0;
var portal;
var state = 0;
var time = 0;

function setup() {
  noCanvas();
  // sky = select('sky', all_skies[current_sky]);
  world = new World('VRScene');
  portal = new Portal(0,0,-100);
}

function draw() {
  if(state == 0){
     
  }
  else if(state == 1){
    time++;
    if(time > 50){
      sky = select('#sky');
      sky.attribute('src', all_skies[current_sky]);
    }
  }
  console.log("current_sky: " + all_skies[current_sky]);
  console.log("state: " + state);
}

function Portal(x,y,z){
  this.portal = new Plane({
    x:x, y:y, z:z,
    width:150, height:150,
    transparent: true,
    side:'double',
    asset:'portal',
    clickFunction: function(thePortal){
      state = 1;
      current_sky = 1;
      world.slideToObject(thePortal,1000);
      
    }
  });
  world.add(this.portal);
}