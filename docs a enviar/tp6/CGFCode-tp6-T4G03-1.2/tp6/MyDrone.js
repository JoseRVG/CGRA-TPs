/**
 * MyDrone
 * @constructor
 */
function MyDrone(scene) {
	CGFobject.call(this,scene);
	this.initBuffers();
};

MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor=MyDrone;

MyDrone.prototype.initBuffers = function () {
    this.vertices = [
            0.5, 0.3, 0, //0 
            -0.5, 0.3, 0,  //1
            0.0, 0.3, 2.0  //2
			];

	this.indices = [
            0, 1, 2
        ];

    this.normals = [
			0, 1, 0, 	   //0
			0, 1, 0,       //1
			0, 1, 0,       //2
		];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
