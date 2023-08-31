/**
 * MySphere
 * @constructor
 */
 function MySphere(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	this.hemisphere=new MyHemisphere(this.scene,slices,stacks,1);
	this.hemisphere.initBuffers();
 };

 MySphere.prototype = Object.create(CGFobject.prototype);
 MySphere.prototype.constructor = MySphere;

 MySphere.prototype.display = function() {
	this.scene.pushMatrix();

 	//buttom part
 	this.scene.pushMatrix();
		this.scene.rotate(Math.PI,1,0,0);
		this.hemisphere.display();
 	this.scene.popMatrix();
	
 	//upper part
 	this.hemisphere.display();

 	this.scene.popMatrix();
 };
