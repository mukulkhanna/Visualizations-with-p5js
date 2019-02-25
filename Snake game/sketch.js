var snake;
var scl = 20;

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);
  snake = new Snake();
  frameRate(7);
  pickLocation();
}

function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
  background(102, 140, 255);
  textSize(40);
  text("SNAKE GAME", width / 2, 50);
  
  textSize(12);
  text("Click on the game to start playing.",width/2,80)
  
  textSize(20);
  text('SCORE: ',width-100,height-50);
  text(this.snake.total-1, width-50, height-50);
  
  this.snake.collide();
  this.snake.update();
  this.snake.display();

  if (snake.eat(food)) {
    pickLocation();
  }
  fill(255).strokeWeight(0);
  rect(food.x, food.y, scl, scl);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    this.snake.dirxn(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    this.snake.dirxn(1, 0);
  } else if (keyCode === UP_ARROW) {
    this.snake.dirxn(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    this.snake.dirxn(0, 1);
  }
}

function Snake() {
  this.x = width / 2;
  this.y = height / 2;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 1;
  this.tail = [];

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  };

  this.update = function() {
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.total - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    //this is where it starts moving
    this.x += this.xspeed * scl;
    this.y += this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  };

  this.display = function() {
    fill(random(255), random(255), random(255));
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
  };

  this.dirxn = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  };

  this.collide = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(pos.x, pos.y, this.x, this.y);
      if (d < 1) {
        textSize(30);
        fill(0);
        text("GAME OVER", width / 2, height/2);
        noLoop();
      }
    }
  };
}
