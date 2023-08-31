/**
 * MyDroneBody
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyDroneBody(scene, slices, stacks, bodyAppearance, bodyCoreApperance, coreRad, coreHeight, armRad, armLength, handRad, handHeight) {
	CGFobject.call(this,scene);
	
	this.cylinder=new MyCylinder(this.scene, slices, stacks);
	this.cylinder.initBuffers();

	this.lidCylinder=new MyLidCylinder(this.scene, slices, stacks);
	this.lidCylinder.initBuffers();

	this.lidHemisphere=new MyLidHemisphere(this.scene, slices, stacks, 1);
	this.lidHemisphere.initBuffers();

	this.bodyAppearance = bodyAppearance;
	this.bodyCoreApperance = bodyCoreApperance;

	this.coreRad = coreRad;
	this.coreHeight = coreHeight;
	this.armRad = armRad;
	this.armLength = armLength;
	this.handRad = handRad;
	this.handHeight = handHeight;
};

MyDroneBody.prototype = Object.create(CGFobject.prototype);
MyDroneBody.prototype.constructor=MyDroneBody;

MyDroneBody.prototype.display = function()
{
	//cylinder y
	this.scene.pushMatrix();
		this.scene.translate(0,0,this.armRad);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.translate(0,0,-this.armLength/2);
		this.scene.scale(this.armRad,this.armRad,this.armLength);
		this.bodyAppearance.apply();
		this.cylinder.display();
	this.scene.popMatrix();

	//cylinder x
	this.scene.pushMatrix();
		this.scene.translate(0,0,this.armRad);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.translate(0,0,-this.armLength/2);
		this.scene.scale(this.armRad,this.armRad,this.armLength);
		this.bodyAppearance.apply();
		this.cylinder.display();
	this.scene.popMatrix();

	//cylinder y > 0
	this.scene.pushMatrix();
		this.scene.translate(0,this.armLength/2,this.armRad-this.handHeight/2);
		this.scene.scale(this.handRad,this.handRad,this.handHeight);
		this.bodyAppearance.apply();
		this.lidCylinder.display();
	this.scene.popMatrix();

	//cylinder y < 0
	this.scene.pushMatrix();
		this.scene.translate(0,-this.armLength/2,this.armRad-this.handHeight/2);
		this.scene.scale(this.handRad,this.handRad,this.handHeight);
		this.bodyAppearance.apply();
		this.lidCylinder.display();
	this.scene.popMatrix();

	//cylinder x > 0
	this.scene.pushMatrix();
		this.scene.translate(this.armLength/2,0,this.armRad-this.handHeight/2);
		this.scene.scale(this.handRad,this.handRad,this.handHeight);
		this.bodyAppearance.apply();
		this.lidCylinder.display();
	this.scene.popMatrix();

	//cylinder x < 0
	this.scene.pushMatrix();
		this.scene.translate(-this.armLength/2,0,this.armRad-this.handHeight/2);
		this.scene.scale(this.handRad,this.handRad,this.handHeight);
		this.bodyAppearance.apply();
		this.lidCylinder.display();
	this.scene.popMatrix();

	//hemisphere
	this.scene.pushMatrix();
		this.scene.scale(this.coreRad,this.coreRad,this.coreHeight);
		this.bodyCoreAppearance.apply();
		this.lidHemisphere.display();
	this.scene.popMatrix();
};

MyDroneBody.prototype.setBodyApperance = function(bodyAppearance)
{
	this.bodyAppearance = bodyAppearance;
}

MyDroneBody.prototype.setBodyCoreApperance = function(bodyCoreAppearance)
{
	this.bodyCoreAppearance = bodyCoreAppearance;
}