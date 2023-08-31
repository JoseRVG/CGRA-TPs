/**
 * MyDronePropeller
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

var degToRad = Math.PI / 180.0;

function MyDronePropeller(scene, slices, stacks, propellerAppearance, propCoreRad, propCoreHeight, bladeLength, bladeWidth, bladeHeight, counterclockwiseRot) {
	CGFobject.call(this,scene);

	this.propellerAppearance = propellerAppearance;
	
	this.propCoreRad = propCoreRad;
	this.propCoreHeight = propCoreHeight;
	this.bladeLength = bladeLength; //X radius
	this.bladeWidth = bladeWidth; //Y radius
	this.bladeHeight = bladeHeight;

	this.hemisphere=new MyHemisphere(scene, slices, stacks, 1);
	this.hemisphere.initBuffers();

	this.lidCylinder=new MyLidCylinder(scene, slices, stacks);
	this.lidCylinder.initBuffers();

	this.AngZ = 0;
	this.rotSca = 1;
	this.counterclockwiseRot = counterclockwiseRot;
	this.rotMode = 'N';
};

MyDronePropeller.prototype = Object.create(CGFobject.prototype);
MyDronePropeller.prototype.constructor=MyDronePropeller;

MyDronePropeller.prototype.setRotMode = function(rotMode)
{
	this.rotMode = rotMode;
}

MyDronePropeller.prototype.getRotMode = function(rotMode)
{
	return this.rotMode;
}

MyDronePropeller.prototype.setRotSca = function(rotSca)
{
	this.rotSca = rotSca;
}

MyDronePropeller.prototype.update = function(timePassed)
{
	//Define the number of rotations per second (using the rotation mode)
	var rotPSec;
	switch(this.rotMode)
	{
	case 'L':
		rotPSec = 0.2;
		break;
	case 'N':
		rotPSec = 1.0;
		break;
	default: //'R'
		rotPSec = 10.0;
		break;
	}

	//Define the angular velocity
	var VAngZ = this.counterclockwiseRot*this.rotSca*rotPSec*360;
	//Update the angle
	var secsPassed = timePassed/1000;
	this.AngZ += VAngZ*secsPassed;
	this.AngZ %= 360; //to prevent overflow
}

MyDronePropeller.prototype.display = function()
{
	//hemisphere
	this.scene.pushMatrix();
		this.scene.scale(this.propCoreRad,this.propCoreRad,this.propCoreHeight);
		this.propellerAppearance.apply();
		this.hemisphere.display();
	this.scene.popMatrix();

	//lidCylinder x > 0
	this.scene.pushMatrix();
		this.scene.translate(0,0,this.bladeWidth);
		this.scene.rotate(this.AngZ*degToRad,0,0,1);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.translate(0,0,-this.bladeHeight/2);
		this.scene.scale(this.bladeLength,this.bladeWidth,this.bladeHeight);
		this.propellerAppearance.apply();
		this.lidCylinder.display();
	this.scene.popMatrix();
};

MyDronePropeller.prototype.setPropellerApperance = function(propellerAppearance)
{
	this.propellerAppearance = propellerAppearance;
}