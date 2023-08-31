/**
 * MyDronePropeller
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

var degToRad = Math.PI / 180.0;

function MyDronePropeller(scene, slices, stacks, propellerAppearance, propCoreRad, propCoreHeight, bladeLength, bladeWidth, bladeHeight) {
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
};

MyDronePropeller.prototype = Object.create(CGFobject.prototype);
MyDronePropeller.prototype.constructor=MyDronePropeller;
/*
MyDronePropeller.prototype.update = function(currTime)
{
	var currSecs = currTime/1000;
	var secs = currSecs % 60;
	var mins = (currSecs / 60) % 60;
	var hours = (currSecs / 3600) % 24;
	this.secondHand.setAngle(6*secs);
	this.minuteHand.setAngle(6*mins);
	this.hourHand.setAngle(30*hours);
}*/

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
		this.scene.translate(0,0,this.propCoreHeight + this.bladeWidth);
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