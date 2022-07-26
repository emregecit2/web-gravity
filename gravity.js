const DT = 0.1;
var heldball = null;
var cursor = {x: 0, y: 0};
var balls = [];
class Ball {
  constructor(x, y) {
    this.coordinates = [x, y];
    this.velocity = [0, 0];
    this.acceleration = [0, 0];
    this.radius = 20;
    const ball = document.createElement("div");
    ball.className = "ball";
    ball.style.width = 2 * this.radius + "px";
    ball.style.height = 2 * this.radius + "px";
    document.getElementById("canvas").appendChild(ball);
    this.image = ball;
    this.image.classList.remove("animated");
    this.image.offsetWidth;
    this.image.classList.add("animated");
    this.display();
  }
  move() {
    if (heldball == this) {
      this.coordinates = [cursor.x, cursor.y];
    }
    this.coordinates = math.add(this.coordinates, math.multiply(DT, this.velocity), math.multiply(DT**2, this.acceleration));
    this.velocity = math.add(this.velocity, math.multiply(this.acceleration, DT));
    this.acceleration = [0, 0];
  }
  display() {
    this.image.style.left = this.coordinates[0] - this.radius + "px";
    this.image.style.top = this.coordinates[1] - this.radius + "px";
    this.image.style.height = 2 * this.radius + "px";
    this.image.style.width = 2 * this.radius + "px";
  }
  mass(){
    return this.radius**3 / 200;
  }
}

function main() {
  for (let i = 0; i < balls.length; i++) {
    for (let j = i+1; j < balls.length; j++) {
      let vectorA = math.subtract(balls[j].coordinates, balls[i].coordinates);
      let distance_squared = math.sum(math.dotPow(vectorA, 2));
      let distance = math.sqrt(distance_squared);
      let distance_between_edges = distance - balls[i].radius - balls[j].radius;

      if (distance_between_edges < 0) {
        // elastic collision
        let vectorC = math.multiply(vectorA, math.subtract(balls[i].velocity, balls[j].velocity), vectorA, 2 / (distance_squared * (balls[i].mass() + balls[j].mass())));
        balls[i].velocity = math.subtract(balls[i].velocity, math.multiply(vectorC, balls[j].mass()));
        balls[j].velocity = math.add(balls[j].velocity, math.multiply(vectorC, balls[i].mass()));
        // push away
        let vectorB = math.multiply(vectorA, distance_between_edges / distance / (balls[i].mass() + balls[j].mass()));
        balls[i].coordinates = math.add(balls[i].coordinates, vectorB);
        balls[j].coordinates = math.subtract(balls[j].coordinates, vectorB);

        // color to red
        balls[i].image.classList.remove("animated");
        balls[i].image.offsetWidth
        balls[i].image.classList.add("animated");
        balls[j].image.classList.remove("animated");
        balls[j].image.offsetWidth
        balls[j].image.classList.add("animated");
      }
      
      // gravitational force
      let vectorB = math.multiply(vectorA, balls[i].mass(), balls[j].mass(), 1 / math.pow(distance, 3));
      balls[i].acceleration = math.add(balls[i].acceleration, vectorB);
      balls[j].acceleration = math.subtract(balls[j].acceleration, vectorB);
    }
  }
  
  balls.forEach(ball => ball.move());
  balls.forEach(ball => ball.display());
}

function click(event) {
  balls.push(new Ball(event.x, event.y));
}


document.onmousedown = function(event) { 
  for (ball of balls) {
    if (ball.image.contains(event.target)) {
      heldball = ball;
      return;
    }
  }
  ball = new Ball(event.x, event.y);
  heldball = ball;
  balls.push(ball);
}

document.onwheel = function(event) {
  for (ball of balls) {
    if (ball.image.contains(event.target)) {
      ball.radius -= event.deltaY;
      return;
    }
  }
}

document.onmouseup = function() {heldball = null;}
document.oncontextmenu = function (event) {event.preventDefault();}
document.onmousemove = function (event) {cursor.x = event.x, cursor.y = event.y;};
document.oncontextmenu = function (event) {
  for (ball of balls) {
    if (ball.image.contains(event.target)) {
      balls.splice(balls.indexOf(ball), 1);
      ball.image.remove();
    }
  }
}

setInterval(main, DT);