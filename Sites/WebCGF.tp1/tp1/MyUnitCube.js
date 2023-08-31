/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {

    this.vertices = [
            -0.5, -0.5, -0.5, //0 
            0.5, -0.5, -0.5,  //1
            -0.5, 0.5, -0.5,  //2
            -0.5, -0.5, 0.5,  //3
            -0.5, 0.5, 0.5,   //4
            0.5, -0.5, 0.5,   //5
            0.5, 0.5, -0.5,   //6
            0.5, 0.5, 0.5    //7
			];

	this.indices = [
            //face z < 0
            0, 2, 1,
            1, 2, 6,
			//face x < 0
            0, 3, 2,
            2, 3, 4,
			//face y < 0
            0, 1, 3,
            3, 1, 5,
            //face x > 0
            1, 6, 5,
         	5, 6, 7,
            //face y > 0
			7, 6, 4,
			2, 4, 6,
			//face z > 0
			7, 4, 5,
			3, 5, 4
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};