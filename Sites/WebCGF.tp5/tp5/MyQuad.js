/**
 * MyQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyQuad(scene, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);
	this.minS = minS;
	this.maxS = maxS;
	this.minT = minT;
	this.maxT = maxT;
	this.initBuffers();
};

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor=MyQuad;

MyQuad.prototype.initBuffers = function () {
    this.vertices = [
            -0.5, -0.5, 0, //0 
            0.5, -0.5, 0,  //1
            -0.5, 0.5, 0,  //2
            0.5, 0.5, 0,   //3
			];

	this.indices = [
            0, 1, 2, 
			3, 2, 1,
        ];

    this.normals = [
			0, 0, 1, 	   //0
			0, 0, 1,       //1
			0, 0, 1,       //2
			0, 0, 1,	   //3
		];

	this.texCoords = [
			this.minS, this.maxT,	   //0
			this.maxS, this.maxT,	   //1
			this.minS, this.minT,	   //2
			this.maxS, this.minT,	   //3	    
	];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
