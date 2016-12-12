var world;
var sky;
var all_skies = ["#city_sky", "#space_sky", "#city_sky", "#city_sky"];
var current_sky = 0;
var portal;
var state = 0;
var time = 0;

// ************** Jenny's world's variables ************** // 
var container1;
var container4;
var container2; 
var container3; 

var c1Clicked = false;
var c2Clicked = false; 
var c3Clicked = false; 
var c4Clicked = false;

var containerArray = []; 
var burstBalloon = 0; 

var hasKey = false; 
var getKey;

function setup() {
  
  noCanvas();

  
  // sky = select('sky', all_skies[current_sky]);
  world = new World('VRScene');
  portal = new Portal(0,5,-5);

  // ************** Jenny's world's variables ************** // 
	// ------------------------------------ 1st spinny thing 
	container1 = new Container3D({x:0, y:5, z:-10});
	//world.add(container1);
	
	var b1 = new Circle({
						x:0, y:1, z:0,
						radius: 0.5,
					  asset: 'spiral',
					  side: 'double',
					  clickFunction: function(e){
					      if(!c1Clicked){
					       burstBalloon+= 1; 
					       e.setRed(255);
					       e.setBlue(0);
					       e.setGreen(0);
					       c1Clicked = true;
					      }
					  }
	});
	container1.addChild(b1);

  // ------------------------------------ 2nd spinny thing 
  container2 = new Container3D({x:0, y:5, z:-10});
  //	world.add(container2);

	var b2 = new Circle({
						x:0, y:3, z:0,
						radius: .9,
					  asset: 'spiral',
					  side: 'double',
					  clickFunction: function(e){
					    if(!c2Clicked){
					       burstBalloon+= 1; 
					       e.setRed(255);
					       e.setBlue(0);
					       e.setGreen(0);
					       c2Clicked = true;
					      }
					  }
	});
	
	container2.addChild(b2);
	
	// ------------------------------------ 3rd spinny thing 
	container3 = new Container3D({x:0, y:5, z:-10});
  //	world.add(container3);
	var b3 = new Circle({
						x:0, y:3.5, z:0,
						radius: 1.2,
					  asset: 'spiral',
					  side: 'double',
					  clickFunction: function(e){
					    if(!c3Clicked){
					       burstBalloon+= 1; 
					       e.setRed(255);
					       e.setBlue(0);
					       e.setGreen(0);
					       c3Clicked = true;
					      }
					  }
	});
	container3.addChild(b3);
	
	// ------------------------------------ 1.5st spinny thing 	
	container4 = new Container3D({x:0, y:5, z:-10});
	//world.add(container4);
	
	var b4 = new Circle({
						x:0, y:1.5, z:0,
						radius: 0.8,
					  asset: 'spiral',
					  side : 'double',
					  clickFunction: function(e){
					      if(!c4Clicked){
					       burstBalloon+= 1; 
					       e.setRed(255);
					       e.setBlue(0);
					       e.setGreen(0);
					       c4Clicked = true;
					      }
					  }
	});
	container4.addChild(b4);

  world.add(container1);
  world.add(container2);
  world.add(container3);
  world.add(container4);

  // ------------------------------------ non - spinny things
  // the ground 
	var g = new Plane({
						x:0, y:0, z:0, 
						width:1000, height:1000, 
						repeatX: 100,
						repeatY: 100,
						rotationX:-90, metalness:0.25
					   });
		
  world.add(g);	

}

function draw() {
  if(state == 0){ 
  }
  else if(state == 1){

    //world.setUserPosition(0,0,0);
    time++;
    if(time > 50){
      //world.remove(portal);
      
      sky = select("#theSky");
      sky.attribute('src', all_skies[current_sky]);
      
      container1.spinZ(2.1);
      container2.spinZ(-1.5);
      container3.spinZ(2.5);
      container4.spinZ(-3.5);
      
      if (burstBalloon >= 1){
       for (var i =0; i < containerArray.length; i++){
         console.log(containerArray.length);
         i-=1;
       }
       if (hasKey == false){
          getKey = new GoldenKey(0, 5, -20);
          hasKey = true;
       }else{
          getKey.move();
       }
      } 
      
    }
  }
  console.log("current_sky: " + all_skies[current_sky]);
  console.log("state: " + state);
}

function Portal(x,y,z){
  this.portal = new Plane({
    x:x, y:y, z:z,
    width:10, height:10,
    transparent: true,
    side:'double',
    asset:'portal',
    
    clickFunction: function(thePortal){
      world.slideToObject(thePortal, 1000, function(){
        current_sky = 1; 
        state =1;
        //world.setUserPosition(0,0,0);
      })
    }
  });
  world.add(this.portal);
}

var keyPos = -15; 

function GoldenKey(x, y, z){
  
  this.goldenKey = new Plane({
	  	x:0, y:5, z: keyPos,
	  	asset: 'goldenKey',
      transparent: true,
      rotationZ: 270,
      //side: 'double',
	  	width: 8, height: 2.5,
	})
	
 world.add(this.goldenKey);
 this.zOffset = random(2000, 3000);
  var z = 0.05; 
  
	this.move = function(){
	  if (z != -0.5){
      this.goldenKey.nudge(0, 0, z);
	  }
	  else{
	    world.remove(this.goldenKey);
	  }
	}
  
}

function keyPressed() {
  world.setUserPosition(0,0,0);
}
