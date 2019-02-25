let counter = 1
let sequence = []
let index = 0
let numbers  = []

var attackLevel = 1.0
var releaseLevel = 0

var attackTime = 0.001
var decayTime = 0.2
var susPercent = 0.2
var releaseTime = 0.5

let wid = 1080
let hgt = 720

let dir = false   //direction of arc: top = true

let num = 300

function setup () {
  createCanvas(wid,hgt)
  background(210,90,0)

  env = new p5.Env()
  env.setADSR(attackTime, decayTime, susPercent, releaseTime)
  env.setRange(attackLevel, releaseLevel)

  osc = new p5.Oscillator()
  osc.setType('sine')
  // osc.freq(500)

  osc.amp(env)
  osc.start()

  // env.play()

  numbers[index] = true

  for (let i=0;i<num;i++) {

    if (numbers[i]) {
      stroke(255)
      fill(255)
    } else {
      noStroke()
      fill(0)
    }
  }
}

function step () {
  let next = index - counter

  if (next < 0 || numbers[next]) {
    next = index + counter
    dir = true
  }

  numbers[next] = true
  sequence.push(next)
  index = next

  let diameter = next - index
  let x = (next + index)/2

  counter++
  console.log(sequence.length)
  if (sequence.length === 50) {
    noLoop()
    counter = 1
    sequence = []
    index = 0
    numbers  = []
    background(210,90,0)
    // clear()
    loop()
  }
}

function draw () {
  frameRate(5)
  step()

  for (var i=0;i<=360;i+=10) {
    for (var j in sequence) {
			// fill(255,250,119)
      // fill(random(0))
			noStroke()
			fill(255)
			ellipse(wid/2+(15*sequence[j])*sin(i),hgt/2+(15*sequence[j])*cos(i),random(5,15))
			fill(210,90,0)
			ellipse(wid/2+(15*sequence[j])*sin(i),hgt/2+(15*sequence[j])*cos(i),3)
      let freq = pow(2,((index%88)-49)/24) * 440
      // console.log(freq)
      osc.freq(freq)
      env.play()
    }
  }
}
