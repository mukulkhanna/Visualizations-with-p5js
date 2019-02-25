let red = []
let blue = []

let width = 400
let numPoints = 5

var dragging = false
var offsetX, offsetY    // Mouseclick offset
var picked
var pickedIndex

function setup() {
  createCanvas(width, width)
  for (var i=0;i<5;i++) {
    red[i] = createVector(parseInt(random(width)), parseInt(random(width)))
    blue[i] = createVector(parseInt(random(width)), parseInt(random(width)))
  }
}

function draw() {
  background(250)
  for (var i=0;i<width;i+=3) {
    for (var j=0;j<width;j+=3) {
      var minR = width
      var minB = width
      for (var k=0;k<numPoints;k++) {
        var distanceToRed = euclDistance(i,j,red[k].x,red[k].y)
        var distanceToBlue = euclDistance(i,j,blue[k].x,blue[k].y)
        if (distanceToRed < minR) {
          minR = distanceToRed
        }
        if (distanceToBlue < minB) {
          minB = distanceToBlue
        }
      }
      
      if (minR < minB) {
        noStroke()
        fill(200,0,0)
        ellipse(i,j,2,2)
      } else {
        noStroke()
        fill (0,0,200)
        ellipse(i,j,2,2)
      }
    }
  }

  if (dragging && picked === 'red') {
    red[pickedIndex].x = mouseX + offsetX
    red[pickedIndex].y = mouseY + offsetY
  } else if (dragging && picked === 'blue') {
    blue[pickedIndex].x = mouseX + offsetX
    blue[pickedIndex].y = mouseY + offsetY
  }

  // draw the points
  for (var i=0;i<red.length;i++) {
    fill(255,0,0)
    stroke(255)
    ellipse(red[i].x, red[i].y, 10, 10)
    stroke(255)
    fill(0,0,255)
    ellipse(blue[i].x, blue[i].y, 10, 10)
  }
}

function euclDistance (x1, y1, x2, y2) {
  var xdiff = x1 - x2
  var ydiff = y1 - y2
  xdiff *= xdiff
  ydiff *= ydiff
  var distance = sqrt(xdiff + ydiff)
  return distance
}

function mousePressed() {
  dragging = true
  // if its red
  if (get(mouseX, mouseY)[0] > 200) {
    picked = 'red'
    // find which red point it is
    for (var i=0;i<numPoints;i++) {
      if (abs(mouseX - red[i].x) < 10 && abs(mouseY - red[i].y) < 10) {
        pickedIndex = i
        console.log(picked + 'dot is picked and its pickedIndex is ' + pickedIndex)
        offsetX = red[i].x-mouseX
        offsetY = red[i].y-mouseY
      }
    }
  } else if (get(mouseX, mouseY)[2] > 200) {
    picked = 'blue'
    for (var i=0;i<numPoints;i++) {
      if (abs(mouseX - blue[i].x)< 10 && abs(mouseY - blue[i].y) < 10) {
        pickedIndex = i
        console.log(picked + 'dot is picked and its pickedIndex is ' + pickedIndex)
        offsetX = blue[i].x-mouseX
        offsetY = blue[i].y-mouseY
      }
    }
  } 
}

function mouseReleased() {
  // Quit dragging
  dragging = false;
}