/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
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
	for(var k = 0; k <= this.stacks; k++)
	{
		var alpha = 0;
		for(var i = 0; i <= this.slices; i++)
		{
			var ang = alpha*Math.PI/180;

			//Generate the vertices
			this.vertices.push(Math.cos(ang),Math.sin(ang),z);

			//Generate the indices
			if(i > 0 && k > 0)
			{
				this.indices.push((this.slices+1)*(k)+(i),(this.slices+1)*(k)+(i-1),(this.slices+1)*(k-1)+(i-1));
				this.indices.push((this.slices+1)*(k)+(i),(this.slices+1)*(k-1)+(i-1),(this.slices+1)*(k-1)+(i));
			}

			//Generate the normals
			this.normals.push(Math.cos(ang),Math.sin(ang),0);

			//Generate the texture coords
			//this.texCoords.push(0.5*k*deltaZ*Math.cos(ang)+0.5,0.5*k*deltaZ*Math.sin(ang)+0.5);
			this.texCoords.push(i/(this.slices),k*deltaZ);

			alpha += deltaAlpha;
		}
		
		z += deltaZ;
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
