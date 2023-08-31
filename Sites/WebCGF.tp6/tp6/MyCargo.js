/**
 * MyCargo
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyCargo(scene, width, length, height, X, Y, Z) {
	CGFobject.call(this,scene);
	
	this.appearance = new CGFappearance(this.scene);
	this.appearance.setAmbient(0.3,0.3,0.3,1);
	this.appearance.setDiffuse(0.7,0.7,0.7,1);
	this.appearance.setSpecular(0.5,0.5,0.5,1);
	this.appearance.setShininess(50);
	this.appearance.loadTexture("../resources/images/box.png");

	this.stripesAppearance = new CGFappearance(this.scene);
	this.stripesAppearance.setAmbient(0.3,0.3,0.3,1);
	this.stripesAppearance.setDiffuse(0.7,0.7,0.7,1);
	this.stripesAppearance.setSpecular(0.5,0.5,0.5,1);
	this.stripesAppearance.setShininess(50);
	this.stripesAppearance.loadTexture("../resources/images/stripes.png");

	this.width = width;
	this.length = length;
	this.height = height;

	this.cylRight = width / 8; 
	this.cylHeight = height / 8; 
	this.cylWidth = length / 8; 

	this.quad=new MyUnitCubeQuad(scene,0,1,0,1);
	this.cyl = new MyArchCylinder(scene,this.cylWidth,this.cylHeight,this.cylRight);

	this.X = X;
	this.Y = Y;
	this.Z = Z;

	this.mode = 'S'; //on source
};

MyCargo.prototype = Object.create(CGFobject.prototype);
MyCargo.prototype.constructor=MyCargo;

MyCargo.prototype.display = function()
{
	//quad
	this.scene.pushMatrix();
		this.scene.translate(this.X,this.Y,this.Z);
		this.scene.scale(this.width,this.height,this.length);
		this.appearance.apply();
		this.quad.display();
	this.scene.popMatrix();

	//lower Z cyl
	this.scene.pushMatrix();
		this.scene.translate(this.X,this.Y+this.height/2,this.Z-this.cylRight);
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.stripesAppearance.apply();
		this.cyl.display();
	this.scene.popMatrix();

	//upper Z cyl
	this.scene.pushMatrix();
		this.scene.translate(this.X,this.Y+this.height/2,this.Z+this.cylRight);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.stripesAppearance.apply();
		this.cyl.display();
	this.scene.popMatrix();
};

MyCargo.prototype.setX = function(X)
{
	this.X = X;
};

MyCargo.prototype.setY = function(Y)
{
	this.Y = Y;
};

MyCargo.prototype.setZ = function(Z)
{
	this.Z = Z;
};

MyCargo.prototype.getMode = function()
{
	return this.mode;
}

MyCargo.prototype.getWidth = function()
{
	return this.width;
}

MyCargo.prototype.getLength = function()
{
	return this.length;
}

MyCargo.prototype.getHeight = function()
{
	return this.height;
}

MyCargo.prototype.setMode = function(mode)
{
	this.mode = mode;
	switch(mode)
	{
	case 'S': //on source
		this.appearance.setAmbient(0.3,0.3,0.3,1);
		this.appearance.setDiffuse(0.7,0.7,0.7,1);
		this.appearance.setSpecular(0.5,0.5,0.5,1);
		this.appearance.setShininess(50);
		this.appearance.loadTexture("../resources/images/box.png");
		break;
	case 'D': //on drone
		this.appearance.setAmbient(0.3,0.3,0.3,1);
		this.appearance.setDiffuse(0.7,0.1,0.1,1);
		this.appearance.setSpecular(0.5,0.5,0.5,1);
		this.appearance.setShininess(50);
		this.appearance.loadTexture("../resources/images/box.png");
		break;
	default: //on destination
		this.appearance.setAmbient(0.3,0.3,0.3,1);
		this.appearance.setDiffuse(0.1,0.7,0.1,1);
		this.appearance.setSpecular(0.5,0.5,0.5,1);
		this.appearance.setShininess(50);
		this.appearance.loadTexture("../resources/images/box.png");
		break;
	}
};

MyCargo.prototype.quadColidesWithQuad = function(hX, hY, hZ, hWidth, hHeight, hLength, qX,qY,qZ,qWidth,qHeight,qLength)
{
	if((qX + qWidth/2) < (hX - hWidth/2))
	{
		return false;
	}
	if((qX - qWidth/2) > (hX + hWidth/2))
	{
		return false;
	}
	
	if((qY + qHeight/2) < (hY - hHeight/2))
	{
		return false;
	}
	if((qY - qHeight/2) > (hY + hHeight/2))
	{
		return false;
	}

	if((qZ + qLength/2) < (hZ - hLength/2))
	{
		return false;
	}
	if((qZ - qLength/2) > (hZ + hLength/2))
	{
		return false;
	}

	return true;
};

MyCargo.prototype.colidesWithBody = function(qX,qY,qZ,qWidth,qHeight,qLength)
{
	//Position of the center of the parallelepiped used for colision detection between the cargo's cylinder and the drone's hook
	var hX = this.X;
	var hY = this.Y;
	var hZ = this.Z;
	var hWidth = this.width;
	var hHeight = this.height;
	var hLength = this.length;
	
	return this.quadColidesWithQuad(hX,hY,hZ,hWidth,hHeight,hLength,qX,qY,qZ,qWidth,qHeight,qLength);
};

MyCargo.prototype.colidesWithHook = function(qX,qY,qZ,qWidth,qHeight,qLength)
{
	//Position of the center of the parallelepiped used for colision detection between the cargo's cylinder and the drone's hook
	var hX = this.getCylX();
	var hY = this.getCylY();
	var hZ = this.getCylZ();
	var hWidth = this.getCylWidth();
	var hHeight = this.getCylHeight();
	var hLength = this.getCylLength();
	
	return this.quadColidesWithQuad(hX,hY,hZ,hWidth,hHeight,hLength,qX,qY,qZ,qWidth,qHeight,qLength);
};

//For an older version of the hook that used a sphere
MyCargo.prototype.colidesWithSphere = function(sX,sY,sZ,sRad)
{
	//Collision occurs if sphere center is inside a cargo to which dimensions we add the sphere's radius
	/*if(sX < (this.X - this.width/2 - sRad))
	{
		return false;
	}
	if(sX > (this.X + this.width/2 + sRad))
	{
		return false;
	}
	
	if(sY < (this.Y - this.length/2 - sRad))
	{
		return false;
	}
	if(sY > (this.Y + this.length/2 + sRad))
	{
		return false;
	}

	if(sZ < (this.Z - this.height/2 - sRad))
	{
		return false;
	}
	if(sZ > (this.Z + this.height/2 + sRad))
	{
		return false;
	}

	return true; */
	return false;
};

MyCargo.prototype.getCylX = function()
{
	return this.X;
}

MyCargo.prototype.getCylY = function()
{
	return this.Y + this.height/2 + this.cylHeight/2;
}

MyCargo.prototype.getCylZ = function()
{
	return this.Z;
}

MyCargo.prototype.getCylWidth = function()
{
	return this.cylWidth;
}

MyCargo.prototype.getCylHeight = function()
{
	return this.cylHeight;
}

MyCargo.prototype.getCylLength = function()
{
	return 2*this.cylRight;
}