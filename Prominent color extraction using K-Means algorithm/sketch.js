var colors = []

var clusterzero = []
var clusterone = []
var clustertwo = []

var iteration = 0

function preload() {
  img = loadImage("https://scontent-lht6-1.cdninstagram.com/vp/612e0b1342e36a1301d7cb6137ba46f9/5C8FA513/t51.2885-15/e35/s320x320/44519032_2038704929754898_4866812445527614875_n.jpg")
}

function setup() {
  var centroids = []
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1)
  img.loadPixels()
  loadPixels()

  // console.log("working..")
  for(var y=0;y<img.height;y++) {
    for(var x=0;x<img.width;x++) {
      let index = (x + y * img.width) * 4
      var color = {
        red: img.pixels[index],
        green: img.pixels[index + 1],
        blue: img.pixels[index + 2],
        alpha: img.pixels[index + 3]
      }
      colors.push(color)
    }
  }

  for (var i=0;i<3;i++) {
    // console.log(colors[Math.floor(Math.random() * colors.length)])
    centroids.push(colors[Math.floor(Math.random() * colors.length)])
  }

  for (var it=0;it<10;it++){
    // clusterAssignment()
  for (var i=0;i<colors.length;i++) {
    var d0 = calculateEuclidean(colors[i],centroids[0])
    var d1 = calculateEuclidean(colors[i],centroids[1])
    var d2 = calculateEuclidean(colors[i],centroids[2]) 

    var clusterDistances = [d0, d1, d2]
    var min = (clusterDistances.min())
    if (min == d0) {
      // console.log("Cluster 0")
      clusterzero.push(i)
    }
    else if (min == d1) {
      // console.log("Cluster 1")
      clusterone.push(i)
    }
    else if (min == d2){
      // console.log("Cluster 2")
      clustertwo.push(i)
    }
  }

  // console.log(clusterzero)
  // console.log(clusterone)
  // console.log(clustertwo)

  iteration += 1
  var sumR = 0
  var sumG = 0
  var sumB = 0
  var sumA = 0
  
  for (var i=0;i<clusterzero.length;i++) {
    sumR += colors[clusterzero[i]].red
    sumG += colors[clusterzero[i]].green
    sumB += colors[clusterzero[i]].blue
    sumA += colors[clusterzero[i]].alpha
  }
  
  centroids[0].red = sumR/(clusterzero.length)
  centroids[0].green = sumG/(clusterzero.length)
  centroids[0].blue = sumB/(clusterzero.length)
  centroids[0].alpha = sumA/(clusterzero.length)
  
  // console.log(centroids[0])
  
  var sumR = 0
  var sumG = 0
  var sumB = 0
  var sumA = 0
  
  for (var i=0;i<clusterone.length;i++) {
    sumR += colors[clusterone[i]].red
    sumG += colors[clusterone[i]].green
    sumB += colors[clusterone[i]].blue
    sumA += colors[clusterone[i]].alpha
  }
  centroids[1].red = sumR/(clusterone.length)
  centroids[1].green = sumG/(clusterone.length)
  centroids[1].blue = sumB/(clusterone.length)
  centroids[1].alpha = sumA/(clusterone.length)
  
  // console.log(centroids[1])
  
  var sumR = 0
  var sumG = 0
  var sumB = 0
  var sumA = 0
  
  for (var i=0;i<clustertwo.length;i++) {
    sumR += colors[clustertwo[i]].red
    sumG += colors[clustertwo[i]].green
    sumB += colors[clustertwo[i]].blue
    sumA += colors[clustertwo[i]].alpha
  }
  centroids[2].red = sumR/(clustertwo.length)
  centroids[2].green = sumG/(clustertwo.length)
  centroids[2].blue = sumB/(clustertwo.length)
  centroids[2].alpha = sumA/(clustertwo.length)
  
  // console.log(centroids[2])
  // console.log("new centroids")
  // calcnewCentroid()
}
// console.log("final")
// console.log(centroids)
textFont('Courier New')
textSize(20)
text("Prominent colors", width/3 - 40, 80)
text("Image", width/2 + 90, 80)
fill(centroids[0].red, centroids[0].green, centroids[0].blue, centroids[0].alpha)
rect(width/3, 120, 50, 50);
fill(centroids[1].red, centroids[1].green, centroids[1].blue, centroids[1].alpha)
rect(width/3, 220, 50, 50);
fill(centroids[2].red, centroids[2].green, centroids[2].blue, centroids[2].alpha)
rect(width/3, 320, 50, 50);
image(img,width/2,100,250,300)
}

function calculateEuclidean (a, b) {
  var dist = Math.sqrt(((a.green-b.green)**2) + ((a.blue-b.blue)**2))
  // var dist = Math.sqrt(((a.red-b.red)**2) + ((a.green-b.green)**2) + ((a.blue-b.blue)**2) + ((a.alpha-b.alpha)**2))
  return dist
}

function clusterAssignment(){
  // check distance between point and cluster and accordingly assign point to a cluster
  
}

function calcnewCentroid() {
  
  // iteration += 1
  // console.log("iteration number" + iteration)
  // console.log("centroids at end of iteration#" + iteration)
  // console.log(centroids)

}

Array.prototype.min = function() {
  return Math.min.apply(null, this);
}
