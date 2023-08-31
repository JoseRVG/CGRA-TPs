/**
 * MyDroneHook
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyDroneHook(scene, slices, stacks, hookAppearance, cylDiam, smallCylWidth, smallCylHeight, smallCylRight, hookInitLength, hookMaxLength, hookMaxV, hookAKey, hookATimer) {
	CGFobject.call(this,scene);
	
	this.hookAppearance = hookAppearance;

	this.cylinder=new MyLidCylinder(scene, 3, stacks);
	this.hookCylinder=new MyLidCylinder(scene, slices, stacks);

	//this.magnet=new MySphere(scene, slices, stacks);
	this.hook =new MyArchCylinder(scene,2*smallCylWidth,smallCylRight,smallCylRight);

	this.poly =new MyPolygon(scene,20);

	this.cylDiam = cylDiam;
	this.smallCylWidth = smallCylWidth;
	this.smallCylHeight = smallCylHeight;
	this.smallCylRight = smallCylRight;

	this.length = hookInitLength;
	this.maxLength = hookMaxLength;
	this.V = 0;
	this.maxV = hookMaxV;
	this.AKey = hookAKey;
	this.ATimer = hookATimer;
};

MyDroneHook.prototype = Object.create(CGFobject.prototype);
MyDroneHook.prototype.constructor=MyDroneHook;

MyDroneHook.prototype.update = function(timePassed)
{
	var secsPassed = timePassed/1000;

	//Update the Y speed
	this.length += this.V*secsPassed;
	if(this.length < 0)
	{
		this.length = 0;
	}
	else if(this.length > this.maxLength)
	{
		this.length = this.maxLength;
	}
	//Decrease Y speed to aproach 0
	if(this.V > 0)
	{
		this.V -= this.ATimer*secsPassed;
		if(this.V < 0)
		{
			this.V = 0;
		}	
	}
	else if(this.V < 0)
	{
		this.V += this.ATimer*secsPassed;
		if(this.V > 0)
		{
			this.V = 0;
		}
	}	
}

MyDroneHook.prototype.display = function()
{
	//cylinder
	this.scene.pushMatrix();
		this.scene.translate(0,0,-this.length);
		this.scene.scale(this.cylDiam,this.cylDiam,this.length);
		this.hookAppearance.apply();
		this.cylinder.display();
	this.scene.popMatrix();

	//top hook
	this.scene.pushMatrix();
		this.scene.translate(0,0,-this.length-this.smallCylHeight);
		this.scene.scale(this.smallCylWidth,this.smallCylWidth,this.smallCylHeight);
		this.hookAppearance.apply();
		this.hookCylinder.display();
	this.scene.popMatrix();

	//middle hook
	this.scene.pushMatrix();
		this.scene.translate(-this.smallCylRight,0,-this.length-this.smallCylRight-this.smallCylHeight+this.smallCylWidth);
		this.hookAppearance.apply();
		this.hook.display();
	this.scene.popMatrix();

	//bottom left hook
	this.scene.pushMatrix();
		this.scene.translate(-this.smallCylRight,0,-this.length-this.smallCylRight-this.smallCylHeight+this.smallCylWidth);
		this.scene.rotate(Math.PI,1,0,0);
		this.hookAppearance.apply();
		this.hook.display();
	this.scene.popMatrix();

	//bottom right hook
	this.scene.pushMatrix();
		this.scene.translate(+this.smallCylRight,0,-this.length-this.smallCylRight-this.smallCylHeight+this.smallCylWidth);
		this.scene.rotate(Math.PI,1,0,0);
		this.scene.rotate(Math.PI,0,0,1);
		this.hookAppearance.apply();
		this.hook.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(+this.smallCylRight,0,-this.length-this.smallCylRight-this.smallCylHeight+this.smallCylWidth);
		this.scene.scale(this.smallCylWidth,this.smallCylWidth,1);
		this.hookAppearance.apply();
		this.poly.display();
	this.scene.popMatrix();
};

MyDroneHook.prototype.setHookApperance = function(hookAppearance)
{
	this.hookAppearance = hookAppearance;
}

MyDroneHook.prototype.activateHook = function(up)
{
	this.V -= this.AKey*up;
	if(this.V > this.MaxV)
	{
		this.V = this.MaxV;
	}
	else if(this.V < -this.MaxV)
	{
		this.V = -this.MaxV;
	}
}

MyDroneHook.prototype.getLength = function()
{
	return this.length;
}

MyDroneHook.prototype.getHookWidth = function()
{
	return 2*this.smallCylRight;
}

MyDroneHook.prototype.getHookHeight = function()
{
	return 2*this.smallCylRight;
}

MyDroneHook.prototype.getHookLength = function()
{
	return 2*this.smallCylWidth;
}