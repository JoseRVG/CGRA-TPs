/**
 * MyLidPrism
 * @constructor
 */
 function MyLidPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	this.prism = new MyPrism(this.scene,slices,stacks);
	this.prism.initBuffers();
	this.polygon = new MyPolygon(this.scene,slices);
	this.polygon.initBuffers();
 };

 MyLidPrism.prototype = Object.create(CGFobject.prototype);
 MyLidPrism.prototype.constructor = MyLidPrism;

 MyLidPrism.prototype.display = function() {
 	//Prism
 	this.prism.display();
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
