/**
 * MyRightTriangle
 * @constructor
 */
 function MyRightTriangle(scene) {
 	CGFobject.call(this,scene);

 	this.initBuffers();
 };

 MyRightTriangle.prototype = Object.create(CGFobject.prototype);
 MyRightTriangle.prototype.constructor = MyRightTriangle;

 MyRightTriangle.prototype.initBuffers = function() {
 	this.vertices = [
 	0, 0, 0,
 	1, 0, 0,
 	0, 1, 0,
 	0, 0, 0,
 	1, 0, 0,
 	0, 1, 0
 	];
 	this.indices = [
 	0, 1, 2,
	3, 5, 4
 	];

 	this.normals = [
 	0, 0, 1,
 	0, 0, 1,
 	0, 0, 1,
 	0, 0, -1,
 	0, 0, -1,
 	0, 0, -1
 	];
 	this.texCoords = [
 	0, 1,
 	1, 1,
 	0, 0,
 	1, 0,
 	1, 1,
 	0, 0
 	];

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };