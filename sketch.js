var world;
var sky;
var all_skies = ["#city_sky", "#desert_sky", "#abstract_sky", "#inWater", "#night_sky"];
var current_sky = 0;
var portal;
var state = 0;

var setup_one = false;
var setup_two = false;
var setup_three = false;
var setup_four = false;

// ************** Amanda's world's variables ************** // 
var moles = [];
var dirts = [];
var dizzies = [];
var basePlane;
var getDizzy;
var displayDizzy = false;
var molesHit = 0;
var moleIsHit = false;
var listOfDizzy = ['dizzy1','dizzy1','dizzy1','dizzy2','dizzy2','dizzy2','dizzy3','dizzy3','dizzy3'];
var portalAppeared = false;
var atime = 0; 
var keyMade = false;
var gKey = [];
var transition = 0;

// ************** Jenny's world's variables ************** // 
var container1;
var container4;
var container2; 
var container3; 

var container1Removed = false;
var container4Removed = false;
var container2Removed= false; 
var container3Removed= false; 

var c1Clicked = false;
var c2Clicked = false; 
var c3Clicked = false; 
var c4Clicked = false;
var containerArray = []; 
var burstBalloon = 0; 
var hasKey = false; 
var getKey;
var jtime = 0;
transitionJ = 0;
var jennyHasKey = false; 
var jennyGetKey;
var jennysKeyExists = true;

// ************** Anna's world's variables ************** // 
var fish;
var fishies = [];
var rod;
var foundRod = false;
var collectedRod = false;
var keyFound = false;
var fishCaught = false;
var goldKey;
var portalAppearedA = false;
var anTime = 0;
var gone = 0;

// ************** Lantern world variables ************** // 
var light;
var lanterns = [];
var lanternTime = 0;

function setup() {
  noCanvas();
  world = new World('VRScene');
  // sky = select("#theSky");
  portal = new Portal(0,0,-5);
  portalAppeared = true;
}
// amanda's game setup
function setup1(){
  // Amanda's world
  // create a base plane
	basePlane = new Plane({
	  x: 0, y:0, z:0, width:100, height:100, asset:'base', rotationX:-90, repeatX:100, repeatY:100
	});
	world.add(basePlane);
  
  for(var i = -15; i<15; i+=5){
    var moleX = i;
    var moleY = 0.7;
    var moleZ = random(-10,0);
    var mole = new Mole(moleX, moleY, moleZ);
    var dirt = new DirtMound(moleX, moleY, moleZ);
    moles.push(mole);
    dirts.push(dirt);
  }
}
// jenny's game setup
function setup2(){
  // ************** Jenny's world's variables ************** // 
	// ------------------------------------ 1st spinny thing 
	container1 = new Container3D({x:0, y:5, z:-10});
	//world.add(container1);
	
	var b1 = new Circle({
	  x:0, y:1, z:0,
		radius: 0.5,
		asset:'spiral',
		side:'double',
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
	
	var b3 = new Circle({
		x:0, y:3.5, z:0,
		radius: 1.2,
		asset:'spiral',
		side:'double',
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
}

// anna's game setup
function setup3(){
  for(var f = 0; f < 25; f++){
    var yValue = random(-15,150);
    var xValue = random(-150,150);
    var zValue = random(-150,-50);
    var temp = new Fish(xValue,yValue,zValue);
    temp.hasKey = 1; // cheat
    fishies.push(temp);
  }
  
  // rod = new FishingRod(random(-50,50),random(-50,50),random(-50,50));
  rod = new FishingRod(0,0,-5);
  world.setUserPosition(0,0,0);
}

// lantern show
function setup4(){
  for (var i = 0; i < 35; i++) {
    lanterns.push(new Lantern(random(-15,15), random(0,15), random(-15,15)));
  }
  
  var ground = new Plane({
    x:0, y:-1, z:0,
    width:200,
    height:200,
    asset:'night_sky',
    opacity: 0.5,
    rotationX:-90,
    side:'double'
  });
  world.add(ground);
}

function draw() {
  // start world
  if(state == 0){
    // original world
  }
  // amanda's moles
  else if(state == 1){
    atime++;
    if(atime > 60){
      portal.portal.hide();
      if(!setup_one){
        setup1();
        setup_one = true;
      }
      sky = select("#theSky");
      sky.attribute('src', all_skies[current_sky]);
      
      world.setUserPosition(0,1,5);
    
      if(displayDizzy == true){
        getDizzy.move();
        for(var i = 0; i < moles.length; i++){
          moles[i].move();
          moles[i].endOfWorld();
          if(moles[i].removed){
            moles.splice(i,1);
            console.log(moles.length);
          }
        }
        for(var i=0;i<dizzies.length;i++){
          dizzies[i].endOfWorld();
          if(dizzies[i].removed){
            dizzies.splice(i,1);
          }
        }
      }
      if(molesHit == 6){
        portalAppeared = true;
      }
      if(moles.length == 0){
        if(!keyMade){
          keyMade = true;
          var temp = new GoldenKey(0, 5, -5);
          gKey.push(temp);
        }
        else{
          transition++;
          console.log("transitions: " + transition);
          gKey[0].move();
          if(transition > 120){
            current_sky = 2;
            basePlane.hide();
            state = 2;
          }
        }
      }
      for(var i=0;i<dirts.length;i++){
        dirts[i].endOfWorld();
        if(dirts[i].removed){
          dirts.splice(i,1);
        }
      }
    }
  }
  // jenny's world  
  else if(state == 2){
    jtime++;
    if(jtime > 25){
      if(!setup_two){
        setup2();
        setup_two = true;
      }
      sky = select("#theSky");
      sky.attribute('src', all_skies[current_sky]);
      
      world.setUserPosition(0,5,-5); // get actual user position in jenny's world
      
      container1.spinZ(2.1);

      container2.spinZ(-1.5);
      
      container3.spinZ(-3.5);

      container4.spinZ(-1.2);

      
    if (burstBalloon >= 4){
       for (var i =0; i < containerArray.length; i++){
         console.log(containerArray.length);
         i-=1;
       }
       if (jennyHasKey == false){
          jennyGetKey = new JennyGoldenKey(0, 5, -20);
          jennyHasKey = true;
       }else{
          jennyGetKey.move();
          if (jennyGetKey.goldenKey.getZ() >= -0.5){
            if (container1Removed == false){
              world.remove(container1);
              container1Removed = true;
            }
            if (container2Removed == false){
              world.remove(container2);
              container2Removed = true;
            }
            if (container3Removed == false){
              world.remove(container3);
              container3Removed = true;
            }
            if (container4Removed == false){
              world.remove(container4);
              container4Removed = true;
            }
            jennyGetKey.goldenKey.hide();
            current_sky = 3;
            state = 3;
          }
       }
     } 
    }
  }
  else if(state == 3){
    anTime++;
    if(anTime > 25){
      if(!setup_three){
        setup3();
        setup_three = true;
      }
      sky = select("#theSky");
      sky.attribute('src', all_skies[current_sky]);
      
      world.setUserPosition(0,0,0); // get actual user position in jenny's world
      
      for(var f = 0; f < fishies.length; f++){
        fishies[f].move();
        fishies[f].caught();
        fishies[f].endOfWorld();
        if(fishies[f].removed){
          fishies.splice(f,1);
        }
      }
      if(keyFound){
        goldKey.move();
        portalAppearedA = true;
      }
      // change game states
      if(fishies.length == 0){
        gone++;
        if(gone > 35){
          state = 4;
          current_sky = 4;
        }
      }
    }
  }
  // show lantern world
  else if(state == 4){
    if(!setup_four){
      setup4();
      setup_four = true;
    }
    
    sky = select("#theSky");
    sky.attribute('src', all_skies[current_sky]);
      
    if (mouseIsPressed || touchIsDown){
      world.moveUserForward(0.1);
    }
  
    lanternTime+=1;
  
    for (var i = 0; i < lanterns.length; i++) {
      lanterns[i].switch(lanternTime);
    }
  
  }
}

function JennyGoldenKey(){
  
  var removed=false;
  
  this.goldenKey = new Plane({
	  	x:0, y:5, z: -15,
	  	asset: 'goldenKey',
      transparent: true,
      rotationZ: 270,
      //side: 'double',
	  	width: 8, height: 2.5,
	})
	
  world.add(this.goldenKey);

	this.move = function(){
	  if (this.goldenKey.getZ() <= -0.5){
      this.goldenKey.nudge(0, 0, 0.05);
	  }
	  else{
	    if (removed == false){
	      console.log("key got removed");
	      world.remove(this.goldenKey);
	      removed = true;
	    }

	  }
	}
}

// create a key
function GoldenKey(x, y, z){
  this.goldenKey = new Plane({
	  	x:x, y:y, z:z,
	  	asset: 'goldenKey',
      transparent: true,
      rotationZ: 270,
      side: 'double',
	  	width: 8, height: 2.5,
	})
  world.add(this.goldenKey);
  
  this.reposition = function(){
	  this.goldenKey.setX(0);
	  this.goldenKey.setY(2);
	  this.goldenKey.setZ(-10);
  }
  
  var removed = false;
	this.move = function(){
	  if (this.goldenKey.getZ() < -0.5){
      this.goldenKey.nudge(0, 0, 0.05);
	  }
	  else{
	    if(!removed){
	      world.remove(this.goldenKey);
	      removed = true;
	    }
	  }
	}
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
        console.log("in click!!!");
        current_sky = 1; 
        state = 1;
       
        if(portalAppeared){
         // thePortal.hide();
          portalAppeared = false;
        }
        if(portalAppearedA){
          //thePortal.hide();
          portalAppearedA = false;
        }
        
      });
      portalClicked = true;
    }
  });
  
  this.move = function(){
    if (portalClicked == true){
      this.portal.nudge(0,0,0);
    }
  }
  
  world.add(this.portal);
}

function keyPressed() {
  world.setUserPosition(0,0,0);
}

// ************** Amanda's world's Constructors ************** // 
function Dizzy(x,y,z){
  this.removed = false;
  var count = 0;
  this.dizzy = new Plane({
    x:x,
    y:y,
    z:z,
    asset:'dizzy1',
    transparent:true,
    width: 2,
    height: 1,
  });
  world.add(this.dizzy);

  this.move = function(){
    if(this.y != -2){
      if(count < listOfDizzy.length){
        this.dizzy.setAsset(''+ listOfDizzy[count]);
      }
      if(count > listOfDizzy.length){
        count = 0;
      }
      this.dizzy.nudge(0, -0.02, 0);
      count++;
    }
    
  }
  
  this.endOfWorld = function(){
    if(portalAppeared){
      this.removed = true;
      world.remove(this.dizzy);
    }
  }
}

function DirtMound(x,y,z){
  this.dirtmound = new Plane({
    x:x,
    y:0,
    z:z + 0.002,
    asset:'dirt',
    transparent:true,
    width: 2.8,
    height: 1,
  });
  world.add(this.dirtmound);
  this.endOfWorld = function(){
    if(portalAppeared){
      this.removed = true;
      world.remove(this.dirtmound);
    }
  }
}
 
function Mole(x,y,z){
  this.removed = false;
  this.mole = new Plane({
    x:x, y:y, z:z,
		width:2,
		height:2,
		transparent: true,
	  asset: 'mole',
		clickFunction: function(e){
			e.setRed(255);
			e.setBlue(60);
			e.setGreen(60);
			count = 0;
			getDizzy = new Dizzy(e.getX(),e.getY()+ 1,e.getZ() + 0.001);
			dizzies.push(getDizzy);
			displayDizzy = true;
			moleIsHit= true;
		  molesHit++;
		}
  });
  world.add(this.mole);
      
  this.move = function(){
    if(moleIsHit){
      if(this.mole.getRed() == 255 && this.mole.getGreen() == 60 && this.mole.getBlue() == 60){
        if(this.mole.getY() != -0.5){
          this.mole.nudge(0, -0.02, 0);
        }
      }
    }
  }
  
  this.endOfWorld = function(){
    if(portalAppeared){
      this.removed = true;
      world.remove(this.mole);
    }
  }
}

// constructor for fish objects
function Fish(x,y,z){
  this.hasKey = round(random(0,1)); // 0 no key, 1 has key
  
  this.canMove = true;
  
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
    clickFunction: function(theHead){
      if(collectedRod){
        fishCaught = true;
        theHead.setColor(255,69,0);
      }
    }
  });
  this.fish.addChild(this.head);
  
  this.tail = new Tetrahedron({
    x:1.5, y:0, z:0,
    red:255, green:140, blue:0,
    radius:1,
    rotationX:315,
    clickFunction: function(theTail){
      if(collectedRod){
        fishCaught = true;
        theTail.setColor(255,69,0);
      }
    }
  });
  this.fish.addChild(this.tail);
  
  this.left_eye = new Sphere({
    x:-0.3, y:0.2, z:1.2,
    red:0, green:0, blue:0,
    radius:0.1,
    clickFunction: function(theLeftEye){
      if(collectedRod){
        fishCaught = true;
      }
    }
  });
  this.fish.addChild(this.left_eye);
  
  this.right_eye = new Sphere({
    x:-0.3, y:0.2, z:-1.2,
    red:0, green:0, blue:0,
    radius:0.1,
    clickFunction: function(theRightEye){
      if(collectedRod){
        fishCaught = true;
      }
    }
  });
  this.fish.addChild(this.right_eye);
  
  this.angle = 0;
  this.angleChange = random (0.001,0.01);
  
  this.zPos = this.fish.getZ();
  this.xPos = this.fish.getX();
  this.radiusOfRotation = random(100,500);
    
  // given the start positions of the objects
  this.move = function(){
    if(this.canMove){
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
  // LookAt function in THREE.js for positioning
  
  this.removed = false;
  // if rod is collected and this fish is hit then collect the fish/key
  this.caught = function(){
    if(collectedRod){
      if(fishCaught){
        var children = this.fish.getChildren();
        // if the fish is red then stop it's movement
        if(children[0].getGreen() == 69 || children[1].getGreen() == 69){
          this.canMove = false
          fishCaught = false; // reset
          if(this.hasKey == 1){
            var xPos = this.fish.getX();
            var yPos = this.fish.getY();
            var zPos = this.fish.getZ();
            keyFound = true;
            goldKey = new GoldenKey(xPos,yPos,zPos);
            goldKey.reposition();
            this.fish.hide();
          }
          else{
            this.removed = true;
            world.remove(this.fish);
          }
        }
        // if has key then reveal key and set keyFound to true
        // else, remove this fish and reset fishHit to false and keep keyFound to false
      }
    }
  }
  
  this.endOfWorld = function(){
    if(portalAppearedA){
      this.removed = true;
      world.remove(this.fish);
    }
  }
}

function FishingRod(x,y,z){
  this.rod = new Cylinder({
    x:x, y:y, z:z,
    radius:0.2, height:6,
    rotationY:270, rotationZ:30,
    asset:'wood',
    // once the user finds the fishing rod, it appears before them
    // click again and they can collect the fishing rod
    clickFunction: function(theRod){
      var numClicked = 1;
      if(!foundRod){
        numClicked = 0;
      }
      else{
        numClicked++;
      }
      foundRod = true;
      theRod.setPosition(0,0,-5);
      if(numClicked == 2){
        world.remove(theRod);
        collectedRod = true;
      }
    }
  });
  world.add(this.rod);
}

function Lantern(x,y,z){
  this.lantern = new Container3D({
    x:x, y:y, z:z
  });
  world.add(this.lantern);
 
  this.lightColor = function(){
    var randomColor = random(0,3);
    if (randomColor < 1){
      return 0xFF8C00;
    }
    else if (randomColor < 2){
      return 0xFFA343;
    }
    else{
      return 0xE9692C;
    }
  }
  var light = new THREE.PointLight(this.lightColor(), 0.5, 50);
//  console.log(this.lantern.tag.object3D);
  this.lantern.tag.object3D.add(light);  
 
  this.shell = new Cylinder({
    x:0, y:0, z:0,
    height:2, radius:1.2,
    segmentsHeight:2,
    thetaStart:360,
    red:255, green:250, blue:205,
    opacity:0.7,
    transparent:true
  });
  
  this.noiseOffset = random(1000);
  

  
  this.current_fire = 'fire_two';
  this.cycled = 0;
  this.switch = function(time){
    this.fire_one.spinY(1);
    this.fire_two.spinY(1);
    
    var xMovement = map(noise(this.noiseOffset), 0, 1, -0.3, 0.3);
    var yMovement = map(noise(this.noiseOffset+1000), 0, 1, -0.3, 0.3);
    var zMovement = map(noise(this.noiseOffset+2000), 0, 1, -0.3, 0.3);
    
    this.lantern.nudge(xMovement, yMovement, zMovement);
    this.lantern.constrainPosition(-100, 100, 3, 50, -100, 100);
    this.noiseOffset += 0.01;
    
    
    if(time % 5 == 0){

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
    transparent: true,
    opacity:0.7,
    side:'double',
    asset:this.current_fire
  });
  
  this.fire_two = new Plane({
    x:0, y:0, z:0,
    width:2, height:2,
    rotationY:90,
    transparent: true,
    opacity:0.7,
    side:'double',
    asset:this.current_fire
  });
  this.lantern.addChild(this.fire_two);
  this.lantern.addChild(this.shell);
  this.lantern.addChild(this.fire_one);

}