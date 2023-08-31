/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);
	this.cube=new MyUnitCubeQuad(this.scene);
	this.cube.initBuffers();

	this.madeira = new CGFappearance(this.scene);
	this.madeira.setAmbient(0.713725,0.607843,0.298039,1);
	this.madeira.setDiffuse(0.713725,0.607843,0.298039,1);
	this.madeira.setSpecular(0,0,0,1);
	this.madeira.setShininess(1);

	this.aluminio = new CGFappearance(this.scene);
	this.aluminio.setAmbient(0.6784313725490196, 0.6980392156862745, 0.7411764705882353,1);
	this.aluminio.setDiffuse(0.6784313725490196, 0.6980392156862745, 0.7411764705882353,1);
	this.aluminio.setSpecular(0.5,0.5,0.5,1);
	this.aluminio.setShininess(1);

	this.tableAppearance = new CGFappearance(this.scene);
	this.tableAppearance.setAmbient(1,1/2,0,1);
	this.tableAppearance.setDiffuse(1,1/2,0,1);
	this.tableAppearance.setSpecular(1,1/2,0,1);
	this.tableAppearance.setShininess(50);
	this.tableAppearance.loadTexture("../resources/images/table.png");
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function()
{
	//tampo
	this.scene.pushMatrix();
	this.tableAppearance.apply();
	this.scene.translate(0,3.65,0);
	this.scene.scale(5,0.3,3);
	this.cube.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.aluminio.apply();

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

	this.scene.popMatrix();
};