var rainy=[];

function setup() {
  createCanvas(720,480);
  for(var i=0;i<5000;i++){
    rainy[i] = new rain();
  }
}

function draw() {
  background(0);  
  for(var i=0;i<5000;i++){
    rainy[i].fall();
    rainy[i].display();
    }
  
  textSize(45);
  fill(255);
  text("Hello World",width/2,height/2);
  textSize(20);
  text("this is Mukul.",width/2+50,height/2+30);
  
}

function rain(){
  
  this.x=random(width);
  this.y=random(-800,0);
  this.len=random(10,25);
  this.yspeed=random(5,12);
  
  this.fall=function(){
    this.y+=this.yspeed;
    this.yspeed+=0.2;
    
    if (this.y>height){
      this.y=random(-400,-200);
    }
  }
  
  this.display=function(){
    stroke(16,255,0);
    line(this.x,this.y,this.x,this.y+this.len);
  }
}