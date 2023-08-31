/**
 * MyDroneLegs
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyDroneLegs(scene, slices, stacks, legsAppearance, archDiam, archHeight, archRight, quadWidth, quadHeight, distCyls) {
	CGFobject.call(this,scene);
	
	this.legsAppearance = legsAppearance;

	this.archDiam = archDiam;
	this.archHeight = archHeight;
	this.archRight = archRight;
	this.quadWidth = quadWidth;
	this.quadHeight = quadHeight;
	this.distCyls = distCyls; //y distance between cylinders

	this.archCylinder=new MyArchCylinder(scene, this.archDiam, this.archHeight, this.archRight);

	this.quad=new MyUnitCubeQuad(scene,0,1,0,1);
};

MyDroneLegs.prototype = Object.create(CGFobject.prototype);
MyDroneLegs.prototype.constructor=MyDroneLegs;
/*
MyDroneLegs.prototype.update = function(currTime)
{
	var currSecs = currTime/1000;
	var secs = currSecs % 60;
	var mins = (currSecs / 60) % 60;
	var hours = (currSecs / 3600) % 24;
	this.secondHand.setAngle(6*secs);
	this.minuteHand.setAngle(6*mins);
	this.hourHand.setAngle(30*hours);
}*/

MyDroneLegs.prototype.display = function()
{
	//archCylinder front right
	this.scene.pushMatrix();
		this.scene.translate(-this.archRight,this.distCyls/2,0);
		this.legsAppearance.apply();
		this.archCylinder.display();
	this.scene.popMatrix();

	//archCylinder front left
	this.scene.pushMatrix();
		this.scene.translate(0,this.distCyls/2,0);
		this.scene.rotate(Math.PI,0,0,1);
		this.scene.translate(-this.archRight,0,0);
		this.legsAppearance.apply();
		this.archCylinder.display();
	this.scene.popMatrix();

	//archCylinder back right
	this.scene.pushMatrix();
		this.scene.translate(-this.archRight,-this.distCyls/2,0);
		this.legsAppearance.apply();
		this.archCylinder.display();
	this.scene.popMatrix();

	//archCylinder back left
	this.scene.pushMatrix();
		this.scene.translate(0,-this.distCyls/2,0);
		this.scene.rotate(Math.PI,0,0,1);
		this.scene.translate(-this.archRight,0,0);
		this.legsAppearance.apply();
		this.archCylinder.display();
	this.scene.popMatrix();

	//quad front
	this.scene.pushMatrix();
		this.scene.translate(0,this.distCyls/2,0);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(this.quadWidth,this.quadWidth,this.quadHeight);
		this.legsAppearance.apply();
		this.quad.display();
	this.scene.popMatrix();

	//quad back
	this.scene.pushMatrix();
		this.scene.translate(0,-this.distCyls/2,0);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(this.quadWidth,this.quadWidth,this.quadHeight);
		this.legsAppearance.apply();
		this.quad.display();
	this.scene.popMatrix();
};

MyDroneLegs.prototype.setLegsApperance = function(legsAppearance)
{
	this.legsAppearance = legsAppearance;
}