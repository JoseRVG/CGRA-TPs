/**
 * MyPaperPlane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyPaperPlane(scene) {
	CGFobject.call(this,scene);
	
	this.tri=new MyRightTriangle(this.scene, true);
	this.tri.initBuffers();

	this.paperPlaneAppearance = new CGFappearance(this.scene);
	this.paperPlaneAppearance.setAmbient(0.3,0.3,0.3,1);
	this.paperPlaneAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.paperPlaneAppearance.setSpecular(0.1,0.1,0.1,1);
	this.paperPlaneAppearance.setShininess(10);
};

MyPaperPlane.prototype = Object.create(CGFobject.prototype);
MyPaperPlane.prototype.constructor=MyPaperPlane;

MyPaperPlane.prototype.setAngle = function(angle)
{
	this.angle = angle;
};

MyPaperPlane.prototype.display = function()
{
	var angRad = this.angle*Math.PI/180;

	//upper-right tri (z = inf perspective, x to the right, y pointing North)
	this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.scene.scale(1/2,1,1);
		this.paperPlaneAppearance.apply();
		this.tri.display();
	this.scene.popMatrix();

	//upper-left tri (z = inf perspective, x to the right, y pointing North)
	this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.scene.scale(1/2,1,1);
		this.scene.rotate(Math.PI,0,1,0);
		this.paperPlaneAppearance.apply();
		this.tri.display();
	this.scene.popMatrix();

	//lower tri (z = inf perspective, x to the right, y pointing North)
	this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.scene.scale(1,1,1/2);
		this.scene.rotate(Math.PI/2,0,1,0)
		this.paperPlaneAppearance.apply();
		this.tri.display();
	this.scene.popMatrix();
};