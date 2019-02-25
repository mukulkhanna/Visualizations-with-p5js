var star = []
var mouseStar

length = 600
breadth = 400

innerLength = length/10 + 5
innerBreadth = breadth/10 + 5

number = 18


function setup() {
  
  createCanvas(length, breadth);
  for(i=0;i<number;i++){
     star[i] = new stars()
   }

}

function draw() {
	background(0)
	frameRate(40)
 
  for(i=0;i<(number-1);i+=3){
     star[i].randMove()
     star[i].display()
    
    for(j=0;j<i/3;j++){
      strokeWeight(0.2)
      stroke(131,222,255)
      line(star[i].x,star[i].y,star[j].x,star[j].y)
      //line(star[i].x,star[i].y,mouseX,mouseY)
    
    }
 }  
   
}


function stars(){
  
  this.k = 4
  
  this.x = random(65,length - 60 - 5)
  this.y = random(45,breadth - 40 - 5)
 
  var set2 = [-0.2,0.2]
  
  this.randomX = random(-0.8,0.8)
  this.randomY = random(-0.8,0.8)
  
  this.randMove = function(){
     
    this.x += this.randomX
    this.y += this.randomY
    
    if (this.x >= length-innerLength || this.y >= breadth-innerBreadth|| this.x <= innerLength || this.y <= innerBreadth) {
      this.randomX *= -1 
      this.randomY *= -1
    }
  }
  
  this.display = function(){
    noStroke()
    fill(131,222,255)
    ellipse(this.x, this.y, this.k); 
}  
}
