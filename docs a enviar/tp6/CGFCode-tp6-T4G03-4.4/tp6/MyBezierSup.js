/**
 * MyBezierSup
 * @constructor
 */
function MyBezierSup(scene, GBx, GBy, GBz, Ns, Nt) {
 	CGFobject.call(this,scene);
	
	this.GBx = GBx;
	this.GBy = GBy;
	this.GBz = GBz;

	this.Ns = Ns;
	this.Nt = Nt;

 	this.initBuffers();
 };
 
 //Source: http://stackoverflow.com/questions/27205018/multiply-2-matrices-in-javascript
 /*MyBezierSup.prototype.mMult = function(m1, m2) {
    var result = [];
    for (var i = 0; i < m1.length; i++) {
        result[i] = [];
        for (var j = 0; j < m2[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
 }
*/
 function mMult(m1, m2)
 {
    var result = [];
    for (var i = 0; i < m1.length; i++) {
        result[i] = [];
        for (var j = 0; j < m2[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
 }
	
 MyBezierSup.prototype = Object.create(CGFobject.prototype);
 MyBezierSup.prototype.constructor = MyBezierSup;

 MyBezierSup.prototype.initBuffers = function() {
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
	
	var ds = 1/this.Ns;
	var dt = 1/this.Nt;

	var MB = [
	[-1,3,-3,1],
	[3,-6,3,0],
	[-3,3,0,0],
	[1,0,0,0]
	];

	var s = 0;
	for(var ns = 0; ns <= this.Ns ; ns++, s+=ds)
	{
		var S = [[s*s*s,s*s,s,1]];
		var dS = [[3*s*s,2*s,1,0]];
		var t = 0;
		for(var nt = 0; nt <= this.Nt; nt++, t+=dt)
		{
			var T = [
			[t*t*t], 
			[t*t],
			[t],
			[1]
			];

			var dT = [
			[3*t*t], 
			[2*t],
			[1],
			[0]
			];
			
			//Vertices
			var x = mMult(S, mMult(MB, mMult(this.GBx, mMult(MB,T))))[0][0];
			var y = mMult(S, mMult(MB, mMult(this.GBy, mMult(MB,T))))[0][0];
			var z = mMult(S, mMult(MB, mMult(this.GBz, mMult(MB,T))))[0][0];
			this.vertices.push(x,y,z);

			//Indices
			if(ns > 0 && nt > 0)
			{
				var cur = nt + (this.Nt+1)*ns;
				this.indices.push(cur, cur-1,cur-1-(this.Nt+1));
				this.indices.push(cur,cur-1-(this.Nt+1),cur-(this.Nt+1));
			}

			//Normals
			var dx_ds = mMult(dS, mMult(MB, mMult(this.GBx, mMult(MB,T))))[0][0];
			var dy_ds = mMult(dS, mMult(MB, mMult(this.GBy, mMult(MB,T))))[0][0];
			var dz_ds = mMult(dS, mMult(MB, mMult(this.GBz, mMult(MB,T))))[0][0];

			var dx_dt = mMult(S, mMult(MB, mMult(this.GBx, mMult(MB,dT))))[0][0];
			var dy_dt = mMult(S, mMult(MB, mMult(this.GBy, mMult(MB,dT))))[0][0];
			var dz_dt = mMult(S, mMult(MB, mMult(this.GBz, mMult(MB,dT))))[0][0];

			var nX = dy_ds*dz_dt - dy_dt*dz_ds;
			var nY = dz_ds*dx_dt - dz_dt*dx_ds;
			var nZ = dx_ds*dy_dt - dx_dt*dy_ds;

			this.normals.push(-nX,-nY,-nZ);

			//Texture
			this.texCoords.push(s,t);
		}
	}
	
	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };


 /*
 function MyBezierSup(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyBezierSup.prototype = Object.create(CGFobject.prototype);
 MyBezierSup.prototype.constructor = MyBezierSup;

 MyBezierSup.prototype.initBuffers = function() {
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