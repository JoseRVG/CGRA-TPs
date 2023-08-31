/**
 * MyHemisphere
 * @constructor
 */
 function MyHemisphere(scene, slices, stacks, out) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;
	this.out = out;

 	this.initBuffers();
 };

 MyHemisphere.prototype = Object.create(CGFobject.prototype);
 MyHemisphere.prototype.constructor = MyHemisphere;

 MyHemisphere.prototype.initBuffers = function() {
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

 	var deltaAlpha = 360.0/this.slices
 	var deltaAlphaRad = deltaAlpha*Math.PI/180.0;
 	var deltaPhi = 90.0/this.stacks;
 	var deltaPhiRad = deltaPhi*Math.PI/180.0;

	var phi = 0;
	for(var k = 0; k < this.stacks; k++)
	{
		var phiRad = phi*Math.PI/180;
		var alpha = 0;
	
			for(var i = 0; i < this.slices; i++)
			{
				var alphaRad = alpha*Math.PI/180;

				//Generate the vertices
				this.vertices.push(Math.cos(phiRad)*Math.cos(alphaRad),Math.cos(phiRad)*Math.sin(alphaRad),Math.sin(phiRad));

				//Generate the indices
				if(i > 0 && k > 0)
				{
					this.indices.push(this.slices*(k)+(i),this.slices*(k)+(i-1),this.slices*(k-1)+(i-1));
					this.indices.push(this.slices*(k)+(i),this.slices*(k-1)+(i-1),this.slices*(k-1)+(i));
				}

				//Generate the normals
				this.normals.push(this.out*Math.cos(phiRad)*Math.cos(alphaRad),this.out*Math.cos(phiRad)*Math.sin(alphaRad),this.out*Math.sin(phiRad));

				//Generate the texture coords
				this.texCoords.push(Math.sin(phiRad)*Math.cos(alphaRad),Math.sin(phiRad)*Math.sin(alphaRad));

				alpha += deltaAlpha;
			}
			//Generate the indices for the last side
			if(k > 0)
			{
				this.indices.push(this.slices*(k)+(0),this.slices*(k)+(this.slices-1),this.slices*(k-1)+(this.slices-1));
				this.indices.push(this.slices*(k)+(0),this.slices*(k-1)+(this.slices-1),this.slices*(k-1)+0);
			}
		
		phi += deltaPhi;
	}

	//Vertex at the top
	//Generate the vertices
	this.vertices.push(0,0,1);

	//Generate the indices
	alpha = 0;
	for(var i = 0; i < this.slices - 1; i++)
	{
		var alphaRad = alpha*Math.PI/180;

		this.indices.push(this.slices*this.stacks,this.slices*(this.stacks-1)+(i),this.slices*(this.stacks-1)+(i+1));

		alpha += deltaAlpha;
	}
	this.indices.push(this.slices*this.stacks,this.slices*this.stacks-1,this.slices*(this.stacks-1));

	//Generate the normals
	this.normals.push(0,0,this.out*1);
	
	//Generate the texture coords
	this.texCoords.push(0,0);

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
