/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);
	this.cube=new MyUnitCubeQuad(this.scene);
	this.cube.initBuffers();
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function()
{
	//tampo
	this.scene.pushMatrix();
	this.scene.translate(0,3.65,0);
	this.scene.scale(5,0.3,3);
	this.cube.display();
	this.scene.popMatrix();

	//pernas z>0
	this.scene.pushMatrix();
	this.scene.translate(0,0,1.35);

	//perna z>0 x>0
	this.scene.pushMatrix();
	this.scene.translate(2.35,1.75,0);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
	this.scene.popMatrix();

	//perna z>0 x<0
	this.scene.pushMatrix();
	this.scene.translate(-2.35,1.75,0);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.popMatrix();

	//pernas z<0
	this.scene.pushMatrix();
	this.scene.translate(0,0,-1.35);

	//perna z<0 x>0
	this.scene.pushMatrix();
	this.scene.translate(2.35,1.75,0);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
	this.scene.popMatrix();

	//perna z<0 x<0
	this.scene.pushMatrix();
	this.scene.translate(-2.35,1.75,0);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.popMatrix();
};