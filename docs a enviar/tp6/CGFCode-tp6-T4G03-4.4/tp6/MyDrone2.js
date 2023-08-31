/**
 * MyDrone2
 * @constructor
 */

var degToRad = Math.PI / 180.0;

function MyDrone2(scene, slices, stacks, bodyAppearance, legsAppearance, propellerAppearance, X, Y, Z) {
	CGFobject.call(this,scene);

	this.sca = 2;

	//Body attributes
	this.bodyZ = 0.3*this.sca; //this.archRight
	this.coreRad = 0.3*this.sca;
	this.coreHeight = 0.3*this.sca;
	this.armRad = 0.05*this.sca;
	this.armLength = 1*this.sca;
	this.handRad = 0.1*this.sca;
	this.handHeight = 0.1*this.sca;

	//Legs attributes
	this.archDiam = 0.05*this.sca;
	this.archHeight = 0.3*this.sca;
	this.archRight = 0.2*this.sca;
	this.quadWidth = 0.05*this.sca;
	this.quadHeight = 0.5*this.sca;
	this.distCyls = 0.4*this.sca; //y distance between cylinders

	//Propeller attributes
	this.propCoreRad = 0.07*this.sca;
	this.propCoreHeight = 0.07*this.sca;
	this.bladeLength = 0.05*this.sca; //X radius
	this.bladeWidth = 0.01*this.sca; //Y radius
	this.bladeHeight = 0.4*this.sca;

	this.body = new MyDroneBody(scene,slices,stacks,bodyAppearance, this.coreRad, this.coreHeight, this.armRad, this.armLength, this.handRad, this.handHeight);
	this.legs = new MyDroneLegs(scene,slices,stacks,legsAppearance, this.archDiam, this.archHeight, this.archRight, this.quadWidth, this.quadHeight, this.distCyls);
	this.propeller = new MyDronePropeller(scene,Math.round(5*slices/6),Math.round(5*stacks/6),propellerAppearance, this.propCoreRad, this.propCoreHeight, this.bladeLength, this.bladeWidth, this.bladeHeight);

	//Physics attributes
	this.X = X;
	this.Y = Y;
	this.Z = Z;
};

MyDrone2.prototype = Object.create(CGFobject.prototype);
MyDrone2.prototype.constructor=MyDrone2;

MyDrone2.prototype.display = function()
{
	//Body
	this.scene.pushMatrix();
		this.scene.translate(0,0,this.bodyZ);
		this.body.display();
	this.scene.popMatrix();

	//Legs
	this.scene.pushMatrix();
		this.legs.display();
	this.scene.popMatrix();

	//Propeller y > 0
	this.scene.pushMatrix();
		this.scene.translate(0,this.armLength/2,this.bodyZ + this.handHeight);
		this.propeller.display();
	this.scene.popMatrix();

	//Propeller y < 0
	this.scene.pushMatrix();
		this.scene.translate(0,-this.armLength/2,this.bodyZ + this.handHeight);
		this.propeller.display();
	this.scene.popMatrix();

	//Propeller x > 0
	this.scene.pushMatrix();
		this.scene.translate(this.armLength/2,0,this.bodyZ + this.handHeight);
		this.propeller.display();
	this.scene.popMatrix();

	//Propeller x < 0
	this.scene.pushMatrix();
		this.scene.translate(-this.armLength/2,0,this.bodyZ + this.handHeight);
		this.propeller.display();
	this.scene.popMatrix();
}

MyDrone2.prototype.disp = function()
{
	this.scene.pushMatrix();
		this.scene.translate(this.X,this.Y,this.Z);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.display();
	this.scene.popMatrix();
}

MyDrone2.prototype.setBodyApperance = function(bodyAppearance)
{
	this.body.setBodyApperance(bodyAppearance);
}
MyDrone2.prototype.setLegsApperance = function(legsAppearance)
{
	this.legs.setLegsApperance(legsAppearance);
}
MyDrone2.prototype.setPropellerApperance = function(propellerAppearance)
{
	this.propeller.setPropellerApperance(propellerAppearance);
}
/*
MyDrone2.prototype.update = function()
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

MyDrone2.prototype.updateFKey = function(forwards)
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

MyDrone2.prototype.updateYKey = function(up)
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

MyDrone2.prototype.updateAngKey = function(counterClockWise)
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
}*/