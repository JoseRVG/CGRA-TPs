/**
 * MyCargoDest
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyCargoDest(scene, width, length, height, X, Y, Z) {
	CGFobject.call(this,scene);

	this.stripesAppearance = new CGFappearance(this.scene);
	this.stripesAppearance.setAmbient(0.3,0.3,0.3,1);
	this.stripesAppearance.setDiffuse(0.7,0.7,0.7,1);
	this.stripesAppearance.setSpecular(0.5,0.5,0.5,1);
	this.stripesAppearance.setShininess(50);
	this.stripesAppearance.loadTexture("../resources/images/stripes.png");

	this.width = width;
	this.length = length;
	this.height = height;

	this.quad=new MyUnitCubeQuad(scene,0,1,0,1);

	this.X = X;
	this.Y = Y;
	this.Z = Z;
};

MyCargoDest.prototype = Object.create(CGFobject.prototype);
MyCargoDest.prototype.constructor=MyCargoDest;

MyCargoDest.prototype.display = function()
{
	//quad
	this.scene.pushMatrix();
		this.scene.translate(this.X,this.Y,this.Z);
		this.scene.scale(this.width,this.height,this.length);
		this.stripesAppearance.apply();
		this.quad.display();
	this.scene.popMatrix();
};

MyCargoDest.prototype.getX = function()
{
	return this.X;
}

MyCargoDest.prototype.getY = function()
{
	return this.Y;
}

MyCargoDest.prototype.getZ = function()
{
	return this.Z;
}

MyCargoDest.prototype.getWidth = function()
{
	return this.width;
}

MyCargoDest.prototype.getLength = function()
{
	return this.length;
}

MyCargoDest.prototype.getHeight = function()
{
	return this.height;
}