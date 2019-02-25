let width = 650;
let height = 500;
let x,y;
let square_width = 70;

let xspeed = 2;
let yspeed = 2;

let r,g,b;

let img;

function preload(){
	img = loadImage('./assets/dvd.jpg')
}

function setup() {

  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
  
	x = int(random(0, width - square_width));
	y = int(random(0, height - square_width));
  createCanvas(width, height);

}

function draw() {
  background(0);
	rect(x, y, square_width, square_width);
  image(img, x, y, square_width, square_width);
  
	
	x += xspeed;
	y += yspeed;
	
	if (x<=0 || x+square_width>=width) {
		xspeed *= -1
    tint(random(255),random(255),random(255),200);
	}
	
	if (y<=0 || y+square_width>=height) {
		yspeed *= -1
    tint(random(255),random(255),random(255),200);
	}
	
}