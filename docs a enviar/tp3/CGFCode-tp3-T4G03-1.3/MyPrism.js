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
 	this.normals=[];
 		
 		var deltaAlpha=360/this.slices;
 		var deltang=deltaAlpha*Math.PI/180;
 		var deltaZ=1/this.stacks;
 		var z=0;
 		for (var k=0;k<this.stacks;k++)
 		{
			var alpha=0;
 		 for(var i=0;i<this.slices;i++)
 		 {
 			var ang= alpha*Math.PI/180;
 			this.vertices.push(Math.cos(ang),Math.sin(ang),z);
 			this.vertices.push(Math.cos(ang+deltang),Math.sin(ang+deltang),z)
 			this.vertices.push(Math.cos(ang),Math.sin(ang),z+deltaZ);
 			this.vertices.push(Math.cos(ang+deltang),Math.sin(ang+deltang),z+deltaZ)

 			this.indices.push(4.0*(this.slices)*k+(4*i),4.0*(this.slices)*k+(4*i+1),4.0*(this.slices)*k+(4*i+2));
 			this.indices.push(4.0*(this.slices)*k+(4*i+1),4.0*(this.slices)*k+(4*i+3),4.0*(this.slices)*k+(4*i+2));

 			for(var j=0;j<=3;j++)
 			{
 				this.normals.push(Math.cos(ang+deltang/2),Math.sin(ang+deltang/2),0);
 			}
 			alpha+=deltaAlpha;
 		}
			z+=deltaZ;
 		}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
