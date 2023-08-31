/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords = [];

 	var deltaAlpha = 360/this.slices
 	var deltaAng = deltaAlpha*Math.PI/180;
 	var deltaZ = 1/this.stacks;
	
	var z = 0;
	for(var k = 0; k < this.stacks; k++)
	{
		var alpha = 0.0;
		for(var i = 0; i < this.slices; i++)
		{
			var ang = alpha*Math.PI/180.0;

			//Generate the vertices
			this.vertices.push(Math.cos(ang),Math.sin(ang),z); //4*i
			this.vertices.push(Math.cos(ang+deltaAng),Math.sin(ang+deltaAng),z); //4*i + 1
			this.vertices.push(Math.cos(ang),Math.sin(ang),z+deltaZ); //4*i + 2
			this.vertices.push(Math.cos(ang+deltaAng),Math.sin(ang+deltaAng),z+deltaZ); //4*i + 3

			//Generate the indices
			this.indices.push(4.0*(this.slices)*k+(4*i),4.0*(this.slices)*k+(4*i+1),4.0*(this.slices)*k+(4*i+2));
			this.indices.push(4.0*(this.slices)*k+(4*i+1),4.0*(this.slices)*k+(4*i+3),4.0*(this.slices)*k+(4*i+2));

			//Generate the normals
			for(var j = 0; j <= 3; j++)
			{
				this.normals.push(Math.cos(ang+deltaAng/2),Math.sin(ang+deltaAng/2),0);	
			}

			//Generate the texture coords
			this.texCoords.push(0,1-k*deltaZ);
			this.texCoords.push(1,1-k*deltaZ);
			this.texCoords.push(0,1-(k+1)*deltaZ);
			this.texCoords.push(1,1-(k+1)*deltaZ);
			
			alpha += deltaAlpha;
		}
		z += deltaZ;
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
