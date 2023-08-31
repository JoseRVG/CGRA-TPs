/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClock(scene, slices, stacks) {
	CGFobject.call(this,scene);
	
	this.cylinder=new MyCylinder(this.scene, slices, stacks);
	this.cylinder.initBuffers();

	this.polygon=new MyPolygon(this.scene, slices);
	this.polygon.initBuffers();

	this.secondHand = new MyClockHand(this.scene, 0.025, 0.7, 0, 0, 1);
	this.minuteHand = new MyClockHand(this.scene, 0.05, 0.6, 0, 1, 0);
	this.hourHand = new MyClockHand(this.scene, 0.1, 0.4, 1, 0, 0);

	this.clockAppearance = new CGFappearance(this.scene);
	this.clockAppearance.setAmbient(0.3,0.3,0.3,1);
	this.clockAppearance.setDiffuse(0.7,0.7,0.7,1);
	this.clockAppearance.setSpecular(0.5,0.5,0.5,1);
	this.clockAppearance.setShininess(50);
	this.clockAppearance.loadTexture("../resources/images/clock.png");

	this.clockCylinderAppearance = new CGFappearance(this.scene);
	this.clockCylinderAppearance.setAmbient(0.3,0.3,0.3,1);
	this.clockCylinderAppearance.setDiffuse(0.7,0.7,0.7,1);
	this.clockCylinderAppearance.setSpecular(0.5,0.5,0.5,1);
	this.clockCylinderAppearance.setShininess(50);
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor=MyClock;

MyClock.prototype.update = function(currTime)
{
	var currSecs = currTime/1000;
	var secs = currSecs % 60;
	var mins = (currSecs / 60) % 60;
	var hours = (currSecs / 3600) % 24;
	this.secondHand.setAngle(6*secs);
	this.minuteHand.setAngle(6*mins);
	this.hourHand.setAngle(30*hours);
}

MyClock.prototype.display = function()
{
	//polygon
	this.scene.pushMatrix();
		this.clockAppearance.apply();
		this.polygon.display();
	this.scene.popMatrix();

	//cylinder
	this.scene.pushMatrix();
		this.scene.translate(0,0,-1);
		this.clockCylinderAppearance.apply();
		this.cylinder.display();
	this.scene.popMatrix();

	//second hand
	this.scene.pushMatrix();
		this.scene.translate(0,0,0.3);
		this.secondHand.display();
	this.scene.popMatrix();

	//minute hand
	this.scene.pushMatrix();
		this.scene.translate(0,0,0.2);
		this.minuteHand.display();
	this.scene.popMatrix();

	//hour hand
	this.scene.pushMatrix();
		this.scene.translate(0,0,0.1);
		this.hourHand.display();
	this.scene.popMatrix();
};