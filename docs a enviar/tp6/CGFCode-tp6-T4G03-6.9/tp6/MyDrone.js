/**
 * MyDrone
 * @constructor
 */

var degToRad = Math.PI / 180.0;

function MyDrone(scene,X,Y,Z,MaxVF,AFKey,AFTimerDiv,MaxVY,AYKey,AYTimerDiv,AngY,MaxVAngY,AAngYKey,AAngYTimerDiv) {
	CGFobject.call(this,scene);
	this.initBuffers();

	this.X = X;
	this.Y = Y;
	this.Z = Z;

	this.VF = 0;
	this.MaxVF = MaxVF;
	this.AFKey = AFKey;
	this.AFTimerDiv = AFTimerDiv;
	
	this.VY = 0;
	this.MaxVY = MaxVY;
	this.AYKey = AYKey;
	this.AYTimerDiv = AYTimerDiv;

	this.AngY = AngY;
	this.VAngY = 0;
	this.MaxVAngY = MaxVAngY;
	this.AAngYKey = AAngYKey;
	this.AAngYTimerDiv = AAngYTimerDiv;
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

MyDrone.prototype.disp = function()
{
	this.scene.pushMatrix();
		this.scene.translate(this.X,this.Y,this.Z);
		this.scene.rotate(this.AngY*degToRad, 0, 1, 0);
		this.display();
	this.scene.popMatrix();
}

MyDrone.prototype.update = function()
{
	//Update the F (forward) speed
	this.X += this.VF*Math.sin(this.AngY*degToRad);
	this.Z += this.VF*Math.cos(this.AngY*degToRad);
	//Decrese F speed to aproach 0
	this.VF *= this.AFTimerDiv;	

	//Update the Y speed
	this.Y += this.VY;
	//Decrese Y speed to aproach 0
	this.VY *= this.AYTimerDiv;	

	//Update the angle
	this.AngY += this.VAngY;
	//Decrese angular speed to aproach 0
	this.VAngY *= this.AAngYTimerDiv;	
}

MyDrone.prototype.updateFKey = function(forwards)
{
	this.VF += this.AFKey*forwards;
	if(this.VF > this.MaxVF)
	{
		this.VF = this.MaxVF;
	}
	else if(this.VF < -this.MaxVF)
	{
		this.VF = -this.MaxVF;
	}
}

MyDrone.prototype.updateYKey = function(up)
{
	this.VY += this.AYKey*up;
	if(this.VY > this.MaxVY)
	{
		this.VY = this.MaxVY;
	}
	else if(this.VY < -this.MaxVY)
	{
		this.VY = -this.MaxVY;
	}
}

MyDrone.prototype.updateAngKey = function(counterClockWise)
{
	this.VAngY += this.AAngYKey*counterClockWise;
	if(this.VAngY > this.MaxVAngY)
	{
		this.VAngY = this.MaxVAngY;
	}
	else if(this.VAngY < -this.MaxVAngY)
	{
		this.VAngY = -this.MaxVAngY;
	}
}