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
	this.propellerFront = new MyDronePropeller(scene,Math.round(5*slices/6),Math.round(5*stacks/6),propellerAppearance, this.propCoreRad, this.propCoreHeight, this.bladeLength, this.bladeWidth, this.bladeHeight,1);
	this.propellerBack = new MyDronePropeller(scene,Math.round(5*slices/6),Math.round(5*stacks/6),propellerAppearance, this.propCoreRad, this.propCoreHeight, this.bladeLength, this.bladeWidth, this.bladeHeight,1);
	this.propellerSide = new MyDronePropeller(scene,Math.round(5*slices/6),Math.round(5*stacks/6),propellerAppearance, this.propCoreRad, this.propCoreHeight, this.bladeLength, this.bladeWidth, this.bladeHeight,-1);

	//Physics attributes
	this.X = X;
	this.Y = Y;
	this.Z = Z;
	
	this.VF = 0;
	this.MaxVF = 5;
	this.AFKey = 0.1;
	this.AFTimer = 1.5;

	this.VY = 0;
	this.MaxVY = 5;
	this.AYKey = 0.1;
	this.AYTimer = 1.5;

	//AngY
	this.AngY = 0;
	this.VAngY = 0;
	this.MaxVAngY = 15;
	this.AAngYKey = 7;
	this.AAngYTimer = 4;

	//AngX
	this.AngX = 0;
	this.MaxAngX = 15;
	this.VAngXKey = 5;
	this.VAngXTimer = 10;
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
		this.propellerFront.display();
	this.scene.popMatrix();

	//Propeller y < 0
	this.scene.pushMatrix();
		this.scene.translate(0,-this.armLength/2,this.bodyZ + this.handHeight);
		this.propellerBack.display();
	this.scene.popMatrix();

	//Propeller x > 0
	this.scene.pushMatrix();
		this.scene.translate(this.armLength/2,0,this.bodyZ + this.handHeight);
		this.propellerSide.display();
	this.scene.popMatrix();

	//Propeller x < 0
	this.scene.pushMatrix();
		this.scene.translate(-this.armLength/2,0,this.bodyZ + this.handHeight);
		this.propellerSide.display();
	this.scene.popMatrix();
}

MyDrone2.prototype.disp = function()
{
	this.scene.pushMatrix();
		this.scene.translate(this.X,this.Y,this.Z);
		this.scene.rotate(this.AngY*degToRad,0,1,0);
		this.scene.rotate(-this.AngX*degToRad - Math.PI/2, 1, 0, 0); //- Math.PI/2 because, as with all primitives, the drone was drawn so that it is "placed" on the xOy plane
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
	this.propellerFront.setPropellerApperance(propellerAppearance);
	this.propellerBack.setPropellerApperance(propellerAppearance);
	this.propellerSide.setPropellerApperance(propellerAppearance);
}

MyDrone2.prototype.setRotSca = function(rotSca)
{
	this.propellerFront.setRotSca(rotSca);
	this.propellerBack.setRotSca(rotSca);
	this.propellerSide.setRotSca(rotSca);
}

MyDrone2.prototype.update = function(timePassed)
{
	//Update the propeller angle
	this.propellerFront.update(timePassed);
	this.propellerBack.update(timePassed);
	this.propellerSide.update(timePassed);

	this.propellerFront.setRotMode('N');
	this.propellerBack.setRotMode('N');
	this.propellerSide.setRotMode('N');

	var secsPassed = timePassed/1000;

	//Update the F (forward) speed
	this.X -= this.VF*Math.sin(this.AngY*degToRad)*secsPassed;
	this.Z -= this.VF*Math.cos(this.AngY*degToRad)*secsPassed;
	//Decrease F speed to aproach 0
	if(this.VF > 0)
	{
		this.VF -= this.AFTimer*secsPassed;
		if(this.VF < 0)
		{
			this.VF = 0;
		}	
	}
	else if(this.VF < 0)
	{
		this.VF += this.AFTimer*secsPassed;
		if(this.VF > 0)
		{
			this.VF = 0;
		}
	}

	//Update the Y speed
	this.Y += this.VY*secsPassed;
	//Decrease Y speed to aproach 0
	if(this.VY > 0)
	{
		this.VY -= this.AYTimer*secsPassed;
		if(this.VY < 0)
		{
			this.VY = 0;
		}	
	}
	else if(this.VY < 0)
	{
		this.VY += this.AYTimer*secsPassed;
		if(this.VY > 0)
		{
			this.VY = 0;
		}
	}	

	//Update the Y angle
	this.AngY += this.VAngY*secsPassed;
	//Decrease Y angular speed to aproach 0
	if(this.VAngY > 0)
	{
		this.VAngY -= this.AAngYTimer*secsPassed;
		if(this.VAngY < 0)
		{
			this.VAngY = 0;
		}	
	}
	else if(this.VAngY < 0)
	{
		this.VAngY += this.AAngYTimer*secsPassed;
		if(this.VAngY > 0)
		{
			this.VAngY = 0;
		}
	}

	//Decrease X angle to aproach 0
	if(this.AngX > 0)
	{
		this.AngX -= this.VAngXTimer*secsPassed;
		if(this.AngX < 0)
		{
			this.AngX = 0;
		}	
	}
	else if(this.AngX < 0)
	{
		this.AngX += this.VAngXTimer*secsPassed;
		if(this.AngX > 0)
		{
			this.AngX = 0;
		}
	}
}

MyDrone2.prototype.updateFKey = function(forwards)
{
	if(forwards == 1)
	{
		this.propellerFront.setRotMode('L');
		this.propellerBack.setRotMode('R');
		this.propellerSide.setRotMode('N');
	}
	else
	{
		this.propellerFront.setRotMode('R');
		this.propellerBack.setRotMode('L');
		this.propellerSide.setRotMode('N');
	}

	this.VF += this.AFKey*forwards;
	if(this.VF > this.MaxVF)
	{
		this.VF = this.MaxVF;
	}
	else if(this.VF < -this.MaxVF)
	{
		this.VF = -this.MaxVF;
	}

	this.AngX += this.VAngXKey*forwards;
	if(this.AngX > this.MaxAngX)
	{
		this.AngX = this.MaxAngX;
	}
	else if(this.AngX < -this.MaxAngX)
	{
		this.AngX = -this.MaxAngX;
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
	if(counterClockWise == 1)
	{
		this.propellerFront.setRotMode('L');
		this.propellerBack.setRotMode('L');
		this.propellerSide.setRotMode('R');
	}
	else
	{
		this.propellerFront.setRotMode('R');
		this.propellerBack.setRotMode('R');
		this.propellerSide.setRotMode('L');
	}

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