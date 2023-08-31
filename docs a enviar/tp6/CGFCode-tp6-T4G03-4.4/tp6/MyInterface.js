/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface(scene) {
	//call CGFinterface constructor 
	CGFinterface.call(this);
	this.scene = scene;
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'switchRelogio');	

	// add a group of controls (and open/expand by defult)
	
	var luzes=this.gui.addFolder("Luzes");
	luzes.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	luzes.add(this.scene, 'luzJanela');
	luzes.add(this.scene, 'candeeiroEsquerdo');
	luzes.add(this.scene, 'candeeiroDireito');
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', -5, 5);

	//Drone (4.4)
	this.gui.add(this.scene, 'corpoDrone', {Amarelo: 0, Militar: 1, Metalico: 2});
	this.gui.add(this.scene, 'pernasDrone', {Amarelo:0, Militar:1, Metalico:2});
	this.gui.add(this.scene, 'helicesDrone', {Amarelo:0, Militar:1, Metalico:2});

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (65):
   			console.log("Key 'A' pressed");
   			this.scene.processADown();
   			break;
  		case (97):
   			console.log("Key 'a' pressed");
   			this.scene.processADown();
   			break;
  		case (68):
   			console.log("Key 'D' pressed");
   			this.scene.processDDown();
   			break;
  		case (100):
   			console.log("Key 'd' pressed");
   			this.scene.processDDown();
   			break;
  		case (87):
   			console.log("Key 'W' pressed");
   			this.scene.processWDown();
   			break;
  		case (119):
   			console.log("Key 'w' pressed");
   			this.scene.processWDown();
   			break;
  		case (83):
   			console.log("Key 'S' pressed");
   			this.scene.processSDown();
   			break;
  		case (115):
   			console.log("Key 's' pressed");
   			this.scene.processSDown();
   			break;
  		case (73):
   			console.log("Key 'I' pressed");
   			this.scene.processIDown();
   			break;
  		case (105):
   			console.log("Key 'i' pressed");
   			this.scene.processIDown();
   			break;
  		case (74):
   			console.log("Key 'J' pressed");
   			this.scene.processJDown();
   			break;
  		case (106):
   			console.log("Key 'j' pressed");
   			this.scene.processJDown();
   			break;
	};
};
