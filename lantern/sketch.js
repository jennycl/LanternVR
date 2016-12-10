// variable to hold a reference to our A-Frame world
var world;

// global variable to hold our "container" object
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

function setup() {

	noCanvas();
	
	world = new World('VRScene');
	  
	// ------------------------------------ 1st spinny thing 
	container1 = new Container3D({x:0, y:5, z:0});
	world.add(container1);
	
	var b1 = new Circle({
						x:0, y:1, z:0,
						radius: 0.5,
					  asset: 'spiral',
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
	containerArray.push(container1);
	
	 
	
	// ------------------------------------ 2nd spinny thing 
	container2 = new Container3D({x:0, y:5, z:0});
	world.add(container2);

	var b2 = new Circle({
						x:0, y:3, z:0,
						radius: .9,
					  asset: 'spiral',
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
	containerArray.push(container2);
	
	
	// ------------------------------------ 3rd spinny thing 
	container3 = new Container3D({x:0, y:5, z:0});
	world.add(container3);
	var b3 = new Circle({
						x:0, y:3.5, z:0,
						radius: 1.2,
					  asset: 'spiral',
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
	containerArray.push(container3);
	
	
	  // ------------------------------------ 1.5st spinny thing 	
	container4 = new Container3D({x:0, y:5, z:0});
	world.add(container4);
	
	var b4 = new Circle({
						x:0, y:1.5, z:0,
						radius: 0.8,
					  asset: 'spiral',
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
	containerArray.push(container4);
	
	
  
  // ------------------------------------ non - spinny things
  // the ground 
	var g = new Plane({
						x:0, y:0, z:0, 
						width:100, height:100, 
						repeatX: 100,
						repeatY: 100,
						rotationX:-90, metalness:0.25
					   });
//	world.add(g);	
	
}
var hasKey = false; 
var getKey; 
function draw() {
  
  var sky = select('#theSky');
	// now move the container around a bit

	container1.spinZ(2.1);
	container2.spinZ(-1.5);
  container3.spinZ(2.5);
  container4.spinZ(-3.5);
  
  //var spinny = new spinnyThing(0, 3, -2);
  
   if (burstBalloon >= 1){
     for (var i =0; i < containerArray.length; i++){
       console.log(containerArray.length);
       containerArray.splice(i, 1);
       i-=1;
     }
     if (hasKey == false){
        getKey = new GoldenKey(0, 5, -2);
        hasKey = true;
     }else{
        getKey.move();
     }
  } 
  

}
/*
function spinnyThing(x, y, z){
    
	this.spinny = new Circle({
						x:0, y:1.5, z:0,
						radius: 0.8,
					  asset: 'spiral',
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
	world.add(this.container);
  
  this.move = function(){
    this.spinny.spinZ(3);
    
  }
  
}
*/

var keyPos = -5; 
function GoldenKey(x, y, z){
  
  this.goldenKey = new Plane({
	  	x:0, y:1, z: keyPos,
	  	asset: 'goldenKey',
      transparent: true,
      rotationZ: 270,
      //side: 'double',
	  	width: 8, height: 2.5,
	})
	
 world.add(this.goldenKey);
 this.zOffset = random(2000, 3000);
  var z = 0.03; 
  
	this.move = function(){
	  /*
	  var zMovement = map( noise(this.zOffset), 0, 1, -0.05, 0.05);
	  this.zOffset += 0.1;
	  */
	  if (z != -0.5){
      this.goldenKey.nudge(0, 0, z);
	  }
	  else{
	    world.remove(this.goldenKey);
	  }
	}
  
}
