const DT = 1;

class Ball {
  static balls = [];
  constructor(x, y) {
    this.coordinates = [x, y];
    this.velocity = [0, 0];
    this.acceleration = [0, 0];
    this.radius = 20;
    this.mass = 1;
    const ball = document.createElement("div");
    ball.className = "ball";
    ball.style.width = 2 * this.radius + "px";
    ball.style.height = 2 * this.radius + "px";
    document.getElementById("canvas").appendChild(ball);
    this.image = ball;
    this.display();
  }
  move() {
    this.coordinates = math.add(this.coordinates, math.multiply(DT, this.velocity), math.multiply(DT**2, this.acceleration));
    this.velocity = math.add(this.velocity, math.multiply(this.acceleration, DT));
    this.acceleration = [0, 0];
  }
  display() {
    this.image.style.left = this.coordinates[0] - this.radius + "px";
    this.image.style.top = this.coordinates[1] - this.radius + "px";
  }
  static moveBalls() {
    for (let i = 0; i < Ball.balls.length; i++) {
      for (let j = i+1; j < Ball.balls.length; j++) {
        let vectorA = math.subtract(Ball.balls[i].coordinates, Ball.balls[j].coordinates);
        let distance = math.norm(vectorA) - Ball.balls[i].radius - Ball.balls[j].radius;
        let vectorB = math.multiply(vectorA, Ball.balls[i].mass, Ball.balls[j].mass, 1 / math.pow(distance, 3));
        Ball.balls[i].acceleration = math.subtract(Ball.balls[i].acceleration, vectorB);
        Ball.balls[j].acceleration = math.add(Ball.balls[j].acceleration, vectorB);
      }
    }
    
    Ball.balls.forEach(ball => ball.move());
    Ball.balls.forEach(ball => ball.display());
  }
}

function newBall(event) {
  Ball.balls.push(new Ball(event.clientX, event.clientY));
}

document.addEventListener("click", newBall);
setInterval(Ball.moveBalls, DT);