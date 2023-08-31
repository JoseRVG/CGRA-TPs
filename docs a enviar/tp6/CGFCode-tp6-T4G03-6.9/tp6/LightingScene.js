var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.initAppearances();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.prism = new MyLidPrism(this, 8, 20);
	this.cylinder = new MyLidCylinder(this, 8, 20);
	this.hemisphere = new MyLidHemisphere(this, 20, 20);
	this.sphere = new MySphere(this, 8, 20);
	this.lamp = new MyHemisphere(this, 8, 20, -1);
	
	//TP2
	// Scene elements
	this.table = new MyTable(this, 0, 1, 0, 1);
	this.wall = new Plane(this);
	this.floor = new MyQuad(this, 0, 10, 0, 12);
	
	this.boardA = new Plane(this, BOARD_A_DIVISIONS, 1/(BOARD_HEIGHT/BOARD_WIDTH));
	this.boardB = new Plane(this, BOARD_B_DIVISIONS, (372/512)/(BOARD_HEIGHT/BOARD_WIDTH));
	//this.boardB = new Plane(this, BOARD_B_DIVISIONS, 1);

	this.newWall = new MyQuad(this, -1, 2, -1, 2);

	//TP5
	this.clock = new MyClock(this, 12, 1);
	this.paperPlane = new MyPaperPlane(this);

	//Paper plane's position (relative to the projection of its tip on the xoy plane as drawed by its display method)
	this.planeX = 10;
	this.planeY = 4.8;
	this.planeZ = 8;
	//Initial position
	this.x0 = this.planeX;
	this.y0 = this.planeY;
	//Initial speed
	this.v0X = -Math.sqrt(2)/2;
	this.v0Y = Math.sqrt(2)/2;
	//Acceleration (constant)
	this.aX = 0;
	this.aY = -0.04;
	//Time
	this.t0 = 0; //in millisecs
	this.validT0 = false;

	//TP6
	//Drone
	/*
	this.drone = new MyDrone(this,7.5,4,7.5,
	1,0.01,0.8, //F
	1,0.01,0.8, //Y
	210,30,0.15,0.85); //AngY
	*/

	//GUI
	//Luzes
	this.luzJanela = true;
	this.candeeiroEsquerdo = true;
	this.candeeiroDireito = true;

	//Relogio
	this.relogioAtivo = true;

	//Drone2
	this.droneAppearances = [this.droneYellow,this.droneMilitary,this.droneMetallic];
	this.droneBodyCoreAppearances = [this.droneYellowBody,this.droneMilitary,this.droneMetallic];
	this.corpoDrone = 0;
	this.pernasDrone = 0;
	this.helicesDrone = 0;
	this.ganchoDrone = 0;

	this.drone2 = new MyDrone2(this,20,20,
	this.droneAppearances[this.corpoDrone],this.droneBodyCoreAppearances[this.corpoDrone],this.droneAppearances[this.pernasDrone],
	this.droneAppearances[this.helicesDrone], this.droneAppearances[this.ganchoDrone],
	10,5,10);

	this.propellerSpeed = 1;

	//ArchCylinder
	//this.ac = new MyArchCylinder(this,1,1,5);

	//For testing purposes (colision boxes)
	this.quad = new MyUnitCubeQuad(this,0,1,0,1);

	this.mostraColisoes = false;

	//Cargo
	this.cargo = new MyCargo(this,1,1,1,
	7,4.3,8);

	//CargoDest
	this.cargoDest = new MyCargoDest(this,1,1,0.1,
	12,0.05,13);

	//For relative time
	this.firstUpdate = true;
	this.oldTime = 0;

	//For key processing
	this.WDown = false;
	this.SDown = false;
	this.ADown = false;
	this.DDown = false;
	this.IDown = false;
	this.JDown = false;
	this.PDown = false;
	this.LDown = false;
	this.WSLast = true; //used to check what was the last input between WS keys and AD keys (to determine the correct propeller rotation)

	//Extra: globe rotation
	this.angEarth = 0;
	this.VAngEarth = 0.05;

	this.setUpdatePeriod(20);
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0, 0 ,0, 1);
	
	// Positions for lights
	this.lights[0].setPosition(5, 7.5, 5, 1);
	this.lights[0].setVisible(true);
	
	this.lights[1].setPosition(12, 7.5, 12, 1);
	this.lights[1].setVisible(true);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setPosition(0, 4, 7.5, 1);
	this.lights[2].setVisible(true);

	this.lights[2].setAmbient(0.3, 0.3, 0.3, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(2.0, 2.0, 2.0, 1.0);
	this.lights[2].enable();
};

LightingScene.prototype.initAppearances = function() {
	// Materials
	this.materialDefault = new CGFappearance(this);

	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	this.papelChao = new CGFappearance(this);
	this.papelChao.setAmbient(0.2,0.6,0.8,1);
	this.papelChao.setDiffuse(0.2,0.6,0.8,1);
	this.papelChao.setSpecular(0.7,0.7,0.7,1);
	this.papelChao.setShininess(50);

	this.papelParede = new CGFappearance(this);
	this.papelParede.setAmbient(0.7,0.6,0.3,1);
	this.papelParede.setDiffuse(0.7,0.6,0.2,1);
	this.papelParede.setSpecular(0.7,0.7,0.7,1);
	this.papelParede.setShininess(50);

	this.globo = new CGFappearance(this);
	this.globo.setAmbient(0,0,1,1);
	this.globo.setDiffuse(0,0,1,1);
	this.globo.setSpecular(0,0,1,1);
	this.globo.setShininess(150);

	this.laranja = new CGFappearance(this);
	this.laranja.setAmbient(1,1/2,0,1);
	this.laranja.setDiffuse(1,1/2,0,1);
	this.laranja.setSpecular(0.3,0.3,0.3,1);
	this.laranja.setShininess(50);

	//TP4
	this.enableTextures(true);

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(1,1/2,0,1);
	this.floorAppearance.setDiffuse(1,1/2,0,1);
	this.floorAppearance.setSpecular(0.1,0.1,0.1,1);
	this.floorAppearance.setShininess(50);
	this.floorAppearance.loadTexture("../resources/images/floor.png");

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setAmbient(0.3,0.3,0.3,1);
	this.windowAppearance.setDiffuse(0.7,0.7,0.7,1);
	this.windowAppearance.setSpecular(0.1,0.1,0.1,1);
	this.windowAppearance.setShininess(1);
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setAmbient(0.3,0.3,0.3,1);
	this.slidesAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.slidesAppearance.setSpecular(0.1,0.1,0.1,1);
	this.slidesAppearance.setShininess(1);
	this.slidesAppearance.loadTexture("../resources/images/slides.png"); //////////////////////////////
	this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
	this.boardAppearance.setDiffuse(0.6,0.6,0.6,1);
	this.boardAppearance.setSpecular(0.6,0.6,0.6,1);
	this.boardAppearance.setShininess(50);
	this.boardAppearance.loadTexture("../resources/images/board.png"); //////////////////////////
	this.boardAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.orange = new CGFappearance(this);
	this.orange.setAmbient(0.3,0.3,0.3,1);
	this.orange.setDiffuse(0.8,0.8,0.8,1);
	this.orange.setSpecular(0.7,0.7,0.7,1);
	this.orange.setShininess(50);
	this.orange.loadTexture("../resources/images/orange2.png");
	this.orange.setTextureWrap('REPEAT', 'REPEAT');

	this.lava_lamp = new CGFappearance(this);
	this.lava_lamp.setAmbient(0.3,0.3,0.3,1);
	this.lava_lamp.setDiffuse(0.8,0.8,0.8,1);
	this.lava_lamp.setSpecular(0.7,0.7,0.7,1);
	this.lava_lamp.setShininess(50);
	this.lava_lamp.loadTexture("../resources/images/lava_lamp.png");
	this.lava_lamp.setTextureWrap('REPEAT', 'REPEAT');

	this.rock = new CGFappearance(this);
	this.rock.setAmbient(0.3,0.3,0.3,1);
	this.rock.setDiffuse(0.8,0.8,0.8,1);
	this.rock.setSpecular(0.7,0.7,0.7,1);
	this.rock.setShininess(50);
	this.rock.loadTexture("../resources/images/rock.png");
	this.rock.setTextureWrap('REPEAT', 'REPEAT');

	this.grass = new CGFappearance(this);
	this.grass.setAmbient(0.3,0.3,0.3,1);
	this.grass.setDiffuse(0.8,0.8,0.8,1);
	this.grass.setSpecular(0.7,0.7,0.7,1);
	this.grass.setShininess(50);
	this.grass.loadTexture("../resources/images/grass.png");
	this.grass.setTextureWrap('REPEAT', 'REPEAT');

	this.earthTop = new CGFappearance(this);
	this.earthTop.setAmbient(0.3,0.3,0.3,1);
	this.earthTop.setDiffuse(0.8,0.8,0.8,1);
	this.earthTop.setSpecular(0.7,0.7,0.7,1);
	this.earthTop.setShininess(50);
	this.earthTop.loadTexture("../resources/images/world_top.png");
	this.earthTop.setTextureWrap('REPEAT', 'REPEAT');

	this.earthButtom = new CGFappearance(this);
	this.earthButtom.setAmbient(0.3,0.3,0.3,1);
	this.earthButtom.setDiffuse(0.8,0.8,0.8,1);
	this.earthButtom.setSpecular(0.7,0.7,0.7,1);
	this.earthButtom.setShininess(50);
	this.earthButtom.loadTexture("../resources/images/world_buttom.png");
	this.earthButtom.setTextureWrap('REPEAT', 'REPEAT');

	this.column = new CGFappearance(this);
	this.column.setAmbient(0.3,0.3,0.3,1);
	this.column.setDiffuse(0.8,0.8,0.8,1);
	this.column.setSpecular(0.7,0.7,0.7,1);
	this.column.setShininess(50);
	this.column.loadTexture("../resources/images/column.png");
	this.column.setTextureWrap('REPEAT', 'REPEAT');

	//TP6 (Drone2)
	this.droneYellow = new CGFappearance(this);
	this.droneYellow.setAmbient(0.3,0.3,0.3,1);
	this.droneYellow.setDiffuse(0.7,0.7,0.7,1);
	this.droneYellow.setSpecular(0.5,0.5,0.5,1);
	this.droneYellow.setShininess(50);
	this.droneYellow.loadTexture("../resources/images/drone/yellow.png");

	this.droneYellowBody = new CGFappearance(this);
	this.droneYellowBody.setAmbient(0.3,0.3,0.3,1);
	this.droneYellowBody.setDiffuse(0.7,0.7,0.7,1);
	this.droneYellowBody.setSpecular(0.5,0.5,0.5,1);
	this.droneYellowBody.setShininess(50);
	this.droneYellowBody.loadTexture("../resources/images/drone/yellow_body.png");

	this.droneMilitary = new CGFappearance(this);
	this.droneMilitary.setAmbient(0.3,0.3,0.3,1);
	this.droneMilitary.setDiffuse(0.7,0.7,0.7,1);
	this.droneMilitary.setSpecular(0.5,0.5,0.5,1);
	this.droneMilitary.setShininess(50);
	this.droneMilitary.loadTexture("../resources/images/drone/military.png");

	this.droneMetallic = new CGFappearance(this);
	this.droneMetallic.setAmbient(0.3,0.3,0.3,1);
	this.droneMetallic.setDiffuse(0.7,0.7,0.7,1);
	this.droneMetallic.setSpecular(0.5,0.5,0.5,1);
	this.droneMetallic.setShininess(50);
	this.droneMetallic.loadTexture("../resources/images/drone/metallic.png");
}

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}

LightingScene.prototype.update = function(currTime) {
	//Key processing (TP 6)
	if(this.WSLast)
	{
		//First: process AD keys
		if(this.ADown && !this.DDown)
		{
			this.drone2.updateAngKey(1);
		}
		else if(this.DDown && !this.ADown)
		{
			this.drone2.updateAngKey(-1);
		}	
		//Second: process WS keys (these are the ones that affect the propellers)
		if(this.WDown && !this.SDown)
		{
			this.drone2.updateFKey(1);	
		}
		else if(this.SDown && !this.WDown)
		{
			this.drone2.updateFKey(-1);
		}
	}
	else
	{
		//First: process WS keys
		if(this.WDown && !this.SDown)
		{
			this.drone2.updateFKey(1);	
		}
		else if(this.SDown && !this.WDown)
		{
			this.drone2.updateFKey(-1);
		}
		//Second: process WAD keys (these are the ones that affect the propellers)
		if(this.ADown && !this.DDown)
		{
			this.drone2.updateAngKey(1);
		}
		else if(this.DDown && !this.ADown)
		{
			this.drone2.updateAngKey(-1);
		}	
	}
	//Process IJ keys
	if(this.IDown && !this.JDown)
	{
		this.drone2.updateYKey(1);	
	}
	else if(this.JDown && !this.IDown)
	{
		this.drone2.updateYKey(-1);
	}
	//Process PL keys
	if(this.PDown && !this.LDown)
	{
		this.drone2.updateHookLengthKey(1);
	}
	else if(this.LDown && !this.PDown)
	{
		this.drone2.updateHookLengthKey(-1);	
	}

	//For relative time (TP6 - Drone2)
	if(this.firstUpdate)
	{
		this.firstUpdate = false;
	}
	else
	{
		var timePassed = currTime - this.oldTime;
		//TP5
		//Relogio
		if(this.relogioAtivo)
		{
			this.clock.update(currTime);
		}

		//Paper plane
		if(!this.validT0)
		{
			this.t0 = currTime;
			this.validT0 = true;
		}
		else
		{
			var deltaT = currTime - this.t0;
			var secs = deltaT/1000;
			if(this.planeX>=0)
			{
				this.planeX = Math.max(0, this.x0 + secs*this.v0X + secs*secs*this.aX);
			}
			if(this.planeY>=0)
			{
				this.planeY = this.y0 + secs*this.v0Y + secs*secs*this.aY;
			}
		}

		//TP6
		//Drone
		//this.drone.update();

		//Drone2
		this.drone2.setRotSca(this.propellerSpeed);
		this.drone2.update(timePassed);

		//Cargo
		var cargoMode = this.cargo.getMode();
		switch(cargoMode)
		{
		case 'S': //on source
			//Check for collision cargo-drone
			if(this.cargo.colidesWithHook(this.drone2.getHookX(),
			this.drone2.getHookY(),this.drone2.getHookZ(),this.drone2.getHookWidth(),
			this.drone2.getHookHeight(),this.drone2.getHookLength()))
			{
				this.cargo.setMode('D');
			}
			break;
		case 'D': //on drone
			this.cargo.setX(this.drone2.getHookX());
			this.cargo.setY(this.drone2.getHookY() - this.drone2.getHookHeight()/2 - this.cargo.getHeight()/2);
			this.cargo.setZ(this.drone2.getHookZ());
			//Check for collision cargo-destination
			if(this.cargo.colidesWithBody(this.cargoDest.getX(),
			this.cargoDest.getY(),this.cargoDest.getZ(),this.cargoDest.getWidth(),
			this.cargoDest.getHeight(),this.cargoDest.getLength()))
			{
				this.cargo.setMode('F');
			}
			break;
		default: //on destination
			this.cargo.setX(this.cargoDest.getX());
			this.cargo.setY(this.cargoDest.getY() + this.cargoDest.getHeight()/2 + this.cargo.getHeight()/2);
			this.cargo.setZ(this.cargoDest.getZ());
			break;
		}

		//Extra: Globe
		this.angEarth += timePassed*this.VAngEarth;
	}
	this.oldTime = currTime;
}

LightingScene.prototype.switchRelogio = function() {
	console.log("Doing something...");
	this.relogioAtivo = !this.relogioAtivo;
}

LightingScene.prototype.switchColisionBoxes = function() {
	this.mostraColisoes = !this.mostraColisoes;
}

LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup


	// ---- BEGIN Primitive drawing section

	//Lamp
	this.pushMatrix();
		this.translate(5, 7.5, 5);
		this.rotate(Math.PI/2,1,0,0);
		this.lamp.display();
	this.popMatrix();

	//Lamp 2
	this.pushMatrix();
		this.translate(12, 7.5, 12);
		this.rotate(Math.PI/2,1,0,0);
		this.lamp.display();
	this.popMatrix();

	// Sphere (orange)
	this.pushMatrix();
		this.translate(5,4.3,8);
		this.rotate(-Math.PI/2,1,0,0);
		this.scale(1/2,1/2,1/2);
		this.orange.apply();
		this.sphere.display();
	this.popMatrix();

	// Hemisphere (globe top)
	this.pushMatrix();
		this.translate(13,5.8,8);
		this.rotate(degToRad*this.angEarth,0,1,0);
		this.rotate(-Math.PI/2,1,0,0);
		this.earthTop.apply();
		this.hemisphere.display();
	this.popMatrix();

	// Hemisphere (globe buttom)
	this.pushMatrix();
		this.translate(13,5.8,8);
		this.rotate(degToRad*this.angEarth,0,1,0);
		this.rotate(Math.PI/2,1,0,0);
		this.earthButtom.apply();
		this.hemisphere.display();
	this.popMatrix();

	// Hemisphere
	this.pushMatrix();
		this.translate(1,0,1);
		this.scale(1,5,1);
		this.rotate(-Math.PI/2,1,0,0);
		this.rock.apply();
		this.hemisphere.display();
	this.popMatrix();

	// Grass cylinder
	this.pushMatrix();
		this.translate(11,3.8,8);
		this.rotate(-Math.PI/2,1,0,0);
		this.grass.apply();
		this.cylinder.display();
	this.popMatrix();

	//Column cyclinder
	this.pushMatrix();
		this.translate(14,0,1);
		this.scale(1,6,1);
		this.rotate(-Math.PI/2,1,0,0);
		this.column.apply();
		this.cylinder.display();
	this.popMatrix();

	// Prism
	this.pushMatrix();
		this.translate(13,3.8,8);
		this.rotate(-Math.PI/2,1,0,0);
		this.lava_lamp.apply();
		this.prism.display();
	this.popMatrix();

	//TP2
	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.windowAppearance.apply();
		this.newWall.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.papelParede.apply();
		this.wall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();

	//TP5
	//Clock
	this.pushMatrix();
		this.translate(7.2,7,0.1);
		this.scale(0.5,0.5,0.1);
		this.clock.display();
	this.popMatrix();

	//Paper plane
	this.pushMatrix();
		this.translate(this.planeX + 1,this.planeY,this.planeZ);
		this.rotate(90 * degToRad, 0, 0, 1);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.paperPlane.display();
	this.popMatrix();

	//TP6

	//Drone
	//this.drone.disp();

	//Drone2
	this.drone2.setBodyApperance(this.droneAppearances[this.corpoDrone],this.droneBodyCoreAppearances[this.corpoDrone]);
	this.drone2.setLegsApperance(this.droneAppearances[this.pernasDrone]);
	this.drone2.setPropellerApperance(this.droneAppearances[this.helicesDrone]);
	this.drone2.setHookApperance(this.droneAppearances[this.ganchoDrone]);
	this.pushMatrix();
		this.drone2.disp();
	this.popMatrix();

	//Cargo
	this.pushMatrix();
		this.cargo.display();
	this.popMatrix();

	//CargoDest
	this.pushMatrix();
		this.cargoDest.display();
	this.popMatrix();

	if(this.mostraColisoes)
	{
	//Colision box for the drone hook
	this.pushMatrix();
		this.translate(this.drone2.getHookX(),this.drone2.getHookY(),this.drone2.getHookZ());
		this.scale(this.drone2.getHookWidth(),this.drone2.getHookHeight(),this.drone2.getHookLength());
		this.laranja.apply();
		this.quad.display();
	this.popMatrix();

	//Colision box for the cargo hook
	this.pushMatrix();
		this.translate(this.cargo.getCylX(),this.cargo.getCylY(),this.cargo.getCylZ());
		this.scale(this.cargo.getCylWidth(),this.cargo.getCylHeight(),this.cargo.getCylLength());
		this.laranja.apply();
		this.quad.display();
	this.popMatrix();
	
	//Colision box for the desination
	this.pushMatrix();
		this.translate(this.cargoDest.getX(),this.cargoDest.getY(),this.cargoDest.getZ());
		this.scale(this.cargoDest.getWidth(),this.cargoDest.getHeight(),this.cargoDest.getLength());
		this.laranja.apply();
		this.quad.display();
	this.popMatrix();
	}

	//GUI
	if(this.luzJanela)
	{
		this.lights[2].enable();
	}
	else
	{
		this.lights[2].disable();
	}
	if(this.candeeiroEsquerdo)
	{
		this.lights[0].enable();
	}
	else
	{
		this.lights[0].disable();
	}
	if(this.candeeiroDireito)
	{
		this.lights[1].enable();
	}
	else
	{
		this.lights[1].disable();
	}

	// ---- END Primitive drawing section
};

LightingScene.prototype.processADown = function() {
	this.ADown = true;
	this.WSLast = false;
}

LightingScene.prototype.processDDown = function() {
	this.DDown = true;
	this.WSLast = false;
}

LightingScene.prototype.processWDown = function() {
	this.WDown = true;
	this.WSLast = true;
}

LightingScene.prototype.processSDown = function() {
	this.SDown = true;
	this.WSLast = true;
}

LightingScene.prototype.processIDown = function() {
	this.IDown = true;
}

LightingScene.prototype.processJDown = function() {
	this.JDown = true;
}

LightingScene.prototype.processPDown = function() {
	this.PDown = true;
}

LightingScene.prototype.processLDown = function() {
	this.LDown = true;
}

LightingScene.prototype.processAUp = function() {
	this.ADown = false;
}

LightingScene.prototype.processDUp = function() {
	this.DDown = false;
}

LightingScene.prototype.processWUp = function() {
	this.WDown = false;
}

LightingScene.prototype.processSUp = function() {
	this.SDown = false;
}

LightingScene.prototype.processIUp = function() {
	this.IDown = false;
}

LightingScene.prototype.processJUp = function() {
	this.JDown = false;
}

LightingScene.prototype.processPUp = function() {
	this.PDown = false;
}

LightingScene.prototype.processLUp = function() {
	this.LDown = false;
}