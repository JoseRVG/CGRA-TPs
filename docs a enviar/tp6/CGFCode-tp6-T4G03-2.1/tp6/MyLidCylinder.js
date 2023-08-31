/**
 * MyLidCylinder
 * @constructor
 */
 function MyLidCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	this.cylinder = new MyCylinder(this.scene,slices,stacks);
	this.cylinder.initBuffers();
	this.polygon = new MyPolygon(this.scene,slices);
	this.polygon.initBuffers();
 };

 MyLidCylinder.prototype = Object.create(CGFobject.prototype);
 MyLidCylinder.prototype.constructor = MyLidCylinder;

 MyLidCylinder.prototype.display = function() {
 	//Cylinder
 	this.cylinder.display();
 	//Buttom lid
 	this.scene.pushMatrix();
 		this.scene.rotate(Math.PI,1,0,0);
 		this.polygon.display();
 	this.scene.popMatrix();
 	//Top lid
 	this.scene.pushMatrix();
 		this.scene.translate(0,0,1);
 		this.polygon.display();
 	this.scene.popMatrix();
 };
