/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCubeQuad(scene, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);
	this.quad=new MyQuad(this.scene, minS, maxS, minT, maxT);
	this.quad.initBuffers();
};

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function()
{
	//face z > 0
	this.scene.pushMatrix();
	this.scene.translate(0,0,0.5);
	this.quad.display();
	this.scene.popMatrix();

	//face z < 0
	this.scene.pushMatrix();
	this.scene.translate(0,0,-0.5);
	this.scene.rotate(Math.PI,0,1,0);
	this.quad.display();
	this.scene.popMatrix();

	//face y < 0
	this.scene.pushMatrix();
	this.scene.translate(0,-0.5,0);
	this.scene.rotate(Math.PI/2,1,0,0);
	this.quad.display();
	this.scene.popMatrix();

	//face y > 0
	this.scene.pushMatrix();
	this.scene.translate(0,0.5,0);
	this.scene.rotate(-Math.PI/2,1,0,0);
	this.quad.display();
	this.scene.popMatrix();

	//face x > 0
	this.scene.pushMatrix();
	this.scene.translate(0.5,0,0);
	this.scene.rotate(Math.PI/2,0,1,0);
	this.quad.display();
	this.scene.popMatrix();

	//face x < 0
	this.scene.pushMatrix();
	this.scene.translate(-0.5,0,0);
	this.scene.rotate(-Math.PI/2,0,1,0);
	this.quad.display();
	this.scene.popMatrix();
};