
var spaceShip = new Image();
/*
<img class="irc_mi" src="http://www.esa.int/var/esa/storage/images/esa_multimedia/images/2018/07/asteroid_ryugu/17603629-1-eng-GB/Asteroid_Ryugu_medium.jpg" alt="Image result for asteroids" onload="typeof google==='object'&amp;&amp;google.aft&amp;&amp;google.aft(this)" width="304" height="304" style="margin-top: 25px;">
*/
var laser = new Image();
var rock = new Image();
spaceShip.src = 'https://www.pngmart.com/files/3/Spaceship-PNG-File.png';
laser.src = 'https://donaldcarling.files.wordpress.com/2016/03/blast-harrier-laser-1.png';
rock.src = 'https://www.pngmart.com/files/4/Asteroid-PNG-Photos.png';
console.log(rock);
var alienHit =0;
var prompt;
var start = false;


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width= window.innerWidth;
canvas.height= window.innerHeight;
var BulletAmounts = 1;
var starInitial = 5;
var count=0;
var shoot = false;

window.addEventListener('keydown',function(){
	canvas.key=event.keyCode;
	if(canvas.key === 32){
		canvas.key=event.keyCode;
		shoot=true;
	}
})


window.addEventListener('keyup',function(){
	canvas.key= false;
   })

function startGame(){
	var input = prompt("Start Game: y/n ")
	if (input === "y" || input === "y"){
		start = true;
	}
	animate();
}

function sound(src){
	/* plays music or sound*/
	this.sound= document.getElementById('music');
	this.sound.src=src;
	this.sound.setAttribute('preload','auto');
	this.sound.style.display="none";
	document.body.appendChild(this.sound);
	this.play = function(){
		this.sound.play();
	}
	this.stop=function(){
		this.sound.pause();
	}
}

function Component(img,x,y,width,height,isBullet,isShip,isComet,color,dx,dy){
	this.img = img;
	this.x=x;
	this.y=y;
	this.color=color;
	this.width=width;
	this.height=height;
	this.dx=dx;
	this.radius=20;
	this.dy=dy;

	this.draw=function(){
	
		ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
		


	}
	/*this.collisionStarStar = function(){
		var dx = this.x-this.x;
		var dy this.y-this.y;
		var distance = Math.sqrt

	}*/


	this.collisionShipStars = function()
	{
		if((this.x ) < (ship.x + ship.width) && (this.x) > ship.x &&
               (this.y) < (ship.y + ship.height) && (this.y) > (ship.y))
		{
			console.log('hit by alien')
			ctx.font="30px Arial";
			ctx.fillStyle="#5E5EB3"
			ctx.fillText("Game Over!",innerWidth/2,innerHeight/2);
			playAgain("play Again? Y/N");

		}
	}
	this.collision = function(){
		if((this.x) < (bullet.x + bullet.width) && (this.x) > bullet.x &&
               (this.y) < bullet.y + bullet.height && (this.y) > bullet.y)
		{

			console.log('alien hit');
			alienHit+=1;
			console.log(alienHit);
			this.width= 0;
			this.x=0;
			this.y=0;
			this.dx=0;
			this.dy=0;
			this.height = 0;
			// should display 000000
			console.log(this.width,this.height,this.x,this.y,this.dx,this.dy);


		}
		if(alienHit >= starInitial){
			ctx.font="30px Arial";
			ctx.fillStyle="#294040"
			ctx.fillText("You Win!",innerWidth/2,innerHeight/2);
		}

	}
	this.update = function () {
		if(isBullet){

			if(canvas.key && canvas.key === 32)
			{
				soundBullet.play();
				bullet.y=ship.y;
				bullet.x=ship.x;


			}
			// continuoulsy moves the bullet 20 spaces up
			bullet.y-=20;

			this.draw();
		}

		else if(isShip){
			if(this.x >= innerWidth-this.width -5 || this.x <= 0){
				this.x = -this.x
			}
			if(this.y >= innerHeight-this.height- 5|| this.y <= 0){
				this.y = -this.y;

			}

			if(canvas.key && canvas.key == 37){
				this.x -= 5;
			}
			else if (canvas.key && canvas.key ==39){
				this.x+=5;
			}
			else if(canvas.key && canvas.key== 38){
				this.y-=5;
			}
			else if(canvas.key && canvas.key == 40){
				this.y+=5;
			}
			this.draw();

		}
		else if(isComet){
			// gets points or bullets with collision of bullet
			if((this.x + this.radius > innerWidth )|| (this.x - this.radius) < 0 ){
				this.dx = -this.dx;

			}
			else if((this.y + this.radius > innerHeight) || (this.y - this.radius) < 0){
				this.dy = -this.dy;

			}
			this.x += this.dx;
			this.y += this.dy;
			this.collisionShipStars();
			this.draw();
		}
	}

}

// initiating the calls to
var ship = new Component(spaceShip,innerWidth/2, innerHeight/2,100,50,false,true,false);
var bullet = new Component(laser,Math.random() * innerWidth, Math.random() * (innerHeight-110),100,50,true,false,false);
//var asto= new Component(10,10,'grey',200,50,true,false,false,false,true);
soundBullet = new sound('laser.mp3');

var starArrays= [];
var bulletArray=[];
for(var i=0;i<BulletAmounts;i++){

	bulletArray.push(bullet);
}


for (var i = 0; i<starInitial; i++){
	var dx = Math.random()*2;
	var dy = Math.random()*2;

	var star_x = Math.random()*innerWidth;
	var star_y = Math.random() * innerHeight;
	starArrays.push(new Component(rock, 50+20, 30,75,75,false,false,true,"red",dx,dy));
	console.log(starArrays)
}
function animate(){
	if(start){

		playAgain("Play Again?Y/N");


		requestAnimationFrame(animate);
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.font="30px Arial";
		ctx.fillStyle="#69008C"
		ctx.fillText("Score:"+alienHit,10,50);
		for( var i=0; i<starArrays.length; i++){
			starArrays[i].update();
			starArrays[i].collision(starArrays[i]);
		}
		for (var b = 0; b<bulletArray.length;b++){
			if (shoot){
				bulletArray[b].update()
			    bulletArray[b].collision(bulletArray[b]);
			}
		}
		//bullet.collision();
		//bullet.update();
		ship.update();
	}
}
function playAgain(str){
	if(alienHit>=starInitial){
		prompt = prompt(str);
		if(prompt == "Y" || prompt === "y"){
			location.reload();
		}
		else{
			console.log("pass");
		}

	}
}