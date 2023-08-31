/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClockHand(scene, sx, sy, oR, oG, oB) {
	CGFobject.call(this,scene);
	
	this.quad=new MyQuad(this.scene, 0, 1, 0, 1);
	this.quad.initBuffers();

	this.tri=new MyPolygon(this.scene, 3);
	this.tri.initBuffers();

	this.sx = sx;
	this.sy = sy;

	this.clockHandAppearance = new CGFappearance(this.scene);
	this.clockHandAppearance.setAmbient(0.3*oR,0.3*oG,0.3*oB,1);
	this.clockHandAppearance.setDiffuse(0.3*oR,0.3*oG,0.3*oB,1);
	this.clockHandAppearance.setSpecular(0.9*oR,0.9*oG,0.9*oB,1);
	this.clockHandAppearance.setShininess(10);

	this.angle = 0;
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor=MyClockHand;

MyClockHand.prototype.setAngle = function(angle)
{
	this.angle = angle;
};

MyClockHand.prototype.display = function()
{
	var angRad = this.angle*Math.PI/180;

	//quad
	this.scene.pushMatrix();
		this.scene.translate((this.sy/2)*Math.sin(angRad),(this.sy/2)*Math.cos(angRad),0);
		this.scene.rotate(-angRad,0,0,1);
		this.scene.scale(this.sx,this.sy,1);
		this.clockHandAppearance.apply();
		this.quad.display();
	this.scene.popMatrix();

	//tri
	this.scene.pushMatrix();
		this.scene.translate((this.sy*(11/10))*Math.sin(angRad),(this.sy*(11/10))*Math.cos(angRad),0);
		this.scene.rotate(-angRad,0,0,1);
		this.scene.scale(this.sx,this.sy/5,1);
		this.scene.rotate(-Math.PI/6,0,0,1); //to put the triangle tip facing the desired direction
		this.clockHandAppearance.apply();
		this.tri.display();
	this.scene.popMatrix();
};