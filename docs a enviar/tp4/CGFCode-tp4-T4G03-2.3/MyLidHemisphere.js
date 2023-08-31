/**
 * MyLidHemiSphere
 * @constructor
 */
 function MyLidHemisphere(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	this.hemisphere = new MyHemisphere(this.scene,slices,stacks,1);
	this.hemisphere.initBuffers();
	this.polygon = new MyPolygon(this.scene,slices);
	this.polygon.initBuffers();
 };

 MyLidHemisphere.prototype = Object.create(CGFobject.prototype);
 MyLidHemisphere.prototype.constructor = MyLidHemisphere;

 MyLidHemisphere.prototype.display = function() {
 	//Hemisphere
 	this.hemisphere.display();
 	//Buttom lid
 	this.scene.pushMatrix();
 		this.scene.rotate(Math.PI,1,0,0);
 		this.polygon.display();
 	this.scene.popMatrix();
 };
