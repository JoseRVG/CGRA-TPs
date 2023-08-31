/**
 * MyArchCylinder
 * @constructor
 */
function MyArchCylinder(scene, width, height, right) {
 	CGFobject.call(this,scene);

	var uGBx = [
	[0,-(4/3)*width/2,-(4/3)*width/2,0],
	[0,-(4/3)*width/2,-(4/3)*width/2,0],
	[0,-(4/3)*width/2,-(4/3)*width/2,0],
	[right,right,right,right]
	];

	var uGBy = [
	[width/2,width/2,-width/2,-width/2],
	[width/2,width/2,-width/2,-width/2],
	[width/2,width/2,-width/2,-width/2],
	[width/2,width/2,-width/2,-width/2]
	];

	var uGBz = [
	[0,0,0,0],
	[height,height+(4/3)*width/2,height+(4/3)*width/2,height],
	[height,height+(4/3)*width/2,height+(4/3)*width/2,height],
	[height,height+(4/3)*width/2,height+(4/3)*width/2,height]
	];

	this.upperTube=new MyBezierSup(scene,uGBx,uGBy,uGBz,20,20);
	this.upperTube.initBuffers();

	var lGBx = [
	[0,(4/3)*width/2,(4/3)*width/2,0],
	[0,(4/3)*width/2,(4/3)*width/2,0],
	[0,(4/3)*width/2,(4/3)*width/2,0],
	[right,right,right,right]
	];

	var lGBy = [
	[-width/2,-width/2,width/2,width/2],
	[-width/2,-width/2,width/2,width/2],
	[-width/2,-width/2,width/2,width/2],
	[-width/2,-width/2,width/2,width/2]
	];

	var lGBz = [
	[0,0,0,0],
	[height,height-(4/3)*width/2,height-(4/3)*width/2,height],
	[height,height-(4/3)*width/2,height-(4/3)*width/2,height],
	[height,height-(4/3)*width/2,height-(4/3)*width/2,height]
	];

	this.lowerTube=new MyBezierSup(scene,lGBx,lGBy,lGBz,20,20);
	this.lowerTube.initBuffers();
 };

 MyArchCylinder.prototype = Object.create(CGFobject.prototype);
 MyArchCylinder.prototype.constructor = MyArchCylinder;

 MyArchCylinder.prototype.display = function()
 {
	//upperTube
	this.scene.pushMatrix();
		this.upperTube.display();
	this.scene.popMatrix();
 	
 	//lowerTube
	this.scene.pushMatrix();
		this.lowerTube.display();
	this.scene.popMatrix();
 };


 /*
 function MyArchCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyArchCylinder.prototype = Object.create(CGFobject.prototype);
 MyArchCylinder.prototype.constructor = MyArchCylinder;

 MyArchCylinder.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
/*
 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords = [];

 	var deltaAlpha = 360/this.slices
 	var deltaAng = deltaAlpha*Math.PI/180;
 	var deltaPhi = 90/this.stacks;
 	var deltaAngPhi = deltaPhi*Math.PI/180;
 	var deltaZ = 1/this.stacks;

	var z = 0;
	var phi = 0;
	for(var k = 0; k <= this.stacks; k++)
	{
		var alpha = 0;
		for(var i = 0; i < this.slices; i++)
		{
			var ang = alpha*Math.PI/180;
			var angPhi = phi*Math.PI/180;

			//Generate the vertices
			this.vertices.push(Math.cos(ang) + Math.sin(angPhi),Math.sin(ang),z + Math.sin(angPhi));

			//Generate the indices
			if(i > 0 && k > 0)
			{
				this.indices.push(this.slices*(k)+(i),this.slices*(k)+(i-1),this.slices*(k-1)+(i-1));
				this.indices.push(this.slices*(k)+(i),this.slices*(k-1)+(i-1),this.slices*(k-1)+(i));
			}

			//Generate the normals
			this.normals.push(Math.cos(ang),Math.sin(ang),Math.sin(angPhi));

			//Generate the texture coords
			//this.texCoords.push(0.5*k*deltaZ*Math.cos(ang)+0.5,0.5*k*deltaZ*Math.sin(ang)+0.5);
			this.texCoords.push(i/(this.slices-1),k*deltaZ);

			alpha += deltaAlpha;
		}
		//Generate the indices for the last side
		if(k > 0)
		{
			this.indices.push(this.slices*(k)+(0),this.slices*(k)+(this.slices-1),this.slices*(k-1)+(this.slices-1));
			this.indices.push(this.slices*(k)+(0),this.slices*(k-1)+(this.slices-1),this.slices*(k-1)+0);
		}
		
		z += deltaZ;
		phi += deltaPhi;
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
*/