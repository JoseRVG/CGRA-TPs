/**
 * MyPolygon
 * @constructor
 */
 function MyPolygon(scene, slices) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;

 	this.initBuffers();
 };

 MyPolygon.prototype = Object.create(CGFobject.prototype);
 MyPolygon.prototype.constructor = MyPolygon;

 MyPolygon.prototype.initBuffers = function() {
 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords = [];

 	var deltaAlpha = 360/this.slices
 	var deltaAng = deltaAlpha*Math.PI/180;

	//Central vertex
	this.vertices.push(0,0,0);
	this.normals.push(0,0,1);
	this.texCoords.push(0.5,0.5);

	var alpha = 0.0;
	for(var i = 0; i < this.slices; i++)
	{
		var ang = alpha*Math.PI/180.0;

		//Generate the vertices
		this.vertices.push(Math.cos(ang),Math.sin(ang),0); //i + 1

		if(i > 0)
		{
			//Generate the indices
			this.indices.push(0,i,i+1);
		}

		//Generate the normals
		this.normals.push(0,0,1);

		//Generate the texture coords
		this.texCoords.push(0.5*Math.cos(ang)+0.5,0.5*Math.sin(ang)+0.5);

		alpha += deltaAlpha;
	}
	//Last triangle
	this.indices.push(0,this.slices,1);

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
