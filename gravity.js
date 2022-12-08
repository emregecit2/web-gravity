let DT = 1;
let isRightClick = false;
let balls = [];
const RADIUS = 30;
// gravitational constant is increased for faster simulation
const GRAVITATIONAL_CONSTANT = 1e-2

class Ball {
  constructor(x, y) {
    this.coordinates = [x, y];
    this.velocity = [0, 0];
    this.force = [0, 0];
    this.radius = RADIUS;
    const ball = document.createElement("div");
    ball.className = "ball";
    ball.style.height = ball.style.width = 2 * this.radius + "px";
    document.getElementById("canvas").appendChild(ball);
    this.image = ball;
    this.collideAnimation();
    this.display();
    balls.push(this);
  }
  move() {
    if (this.held) {
      this.coordinates = [this.held.pageX, this.held.pageY];
      this.velocity = [0, 0];
    }
    let acceleration = math.multiply(this.force, 1 / this.mass());
    this.coordinates = math.add(this.coordinates, math.multiply(DT, this.velocity), math.multiply(DT ** 2, acceleration));
    this.velocity = math.add(this.velocity, math.multiply(acceleration, DT));
    this.force = [0, 0];
    
    // reflecting from walls
    if (!this.held) {
      if (this.coordinates[0] - this.radius <= 0) {
        if (window.innerWidth - this.coordinates[0] <= this.radius)
          this.velocity[0] = 0;
        else this.velocity[0] = math.abs(this.velocity[0]);
      }
      else if (window.innerWidth - this.coordinates[0] - this.radius <= 0) {
        this.velocity[0] = -math.abs(this.velocity[0]);
      }
      if (this.coordinates[1] - this.radius <= 0) {
        if (window.innerHeight - this.coordinates[1] <= this.radius)
          this.velocity[1] = 0;
        else this.velocity[1] = math.abs(this.velocity[1]);
      }
      else if (window.innerHeight - this.coordinates[1] - this.radius <= 0) {
        this.velocity[1] = -math.abs(this.velocity[1]);
      }
    }
    {
      if (this.coordinates[0] <= this.radius && this.coordinates[0] + this.radius < window.innerWidth) {
        if (2 * this.radius < window.innerWidth) {
          this.coordinates[0] = this.radius;
        }
        else {
          this.coordinates[0] = window.innerWidth - this.radius;
        }
      }
      else if (this.coordinates[0] >= window.innerWidth - this.radius && this.coordinates[0] > this.radius) {
        if (window.innerWidth > 2 * this.radius) {
          this.coordinates[0] = window.innerWidth - this.radius;
        }
        else {
          this.coordinates[0] = this.radius;
        }
      }
      if (this.coordinates[1] <= this.radius && this.coordinates[1] + this.radius < window.innerHeight) {
        if (2 * this.radius < window.innerHeight) {
          this.coordinates[1] = this.radius;
        }
        else {
          this.coordinates[1] = window.innerHeight - this.radius;
        }
      }
      else if (this.coordinates[1] >= window.innerHeight - this.radius && this.coordinates[1] > this.radius) {
        if (window.innerHeight > 2 * this.radius) {
          this.coordinates[1] = window.innerHeight - this.radius;
        }
        else {
          this.coordinates[1] = this.radius;
        }
      }
    }
  }
  display() {
    this.image.style.left = this.coordinates[0] - this.radius + "px";
    this.image.style.top = this.coordinates[1] - this.radius + "px";
    this.image.style.width = this.image.style.height = 2 * this.radius + "px";
  }
  mass() {
    // density = 3 / 4pi
    return this.radius ** 3;
  }
  clear() {
    balls.splice(balls.indexOf(this), 1);
    this.image.remove();
  }
  collideAnimation() {
    this.image.classList.remove("animated");
    this.image.offsetWidth;
    this.image.classList.add("animated");
  }
}

function findBall(event) {
  for (ball of balls) {
    if (ball.image.contains(event.target)) {
      return ball;
    }
  }
  return null;
}

function main() {
  if (isRightClick) {
    let ball = findBall(cursor_);
    if (ball) {
      ball.clear();
    }
  }

  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      if (balls[j].held) {
        var ball1 = balls[j], ball2 = balls[i];
      }
      else if (balls[i].held) {
        var ball1 = balls[i], ball2 = balls[j];
      }
      else {
        var ball1 = balls[i], ball2 = balls[j];
      }
      let vectorA = math.subtract(ball2.coordinates, ball1.coordinates);
      let distanceSquared = math.sum(math.dotPow(vectorA, 2));
      let distance = math.sqrt(distanceSquared);
      let distanceBetweenEdges = distance - ball1.radius - ball2.radius;

      if (distanceBetweenEdges <= 0) {
        // elastic collision
        let vectorC = math.multiply(vectorA, math.subtract(ball1.velocity, ball2.velocity), vectorA, 2 / (distanceSquared * (ball1.mass() + ball2.mass())));
        ball1.velocity = math.subtract(ball1.velocity, math.multiply(vectorC, ball2.mass()));
        ball2.velocity = math.add(ball2.velocity, math.multiply(vectorC, ball1.mass()));
        // push away
        if (ball1.held) {
          ball2.coordinates = math.subtract(ball2.coordinates, math.multiply(vectorA, distanceBetweenEdges / distance));
        }
        else {
          let vectorB = math.multiply(vectorA, distanceBetweenEdges / distance / (ball1.mass() + ball2.mass()));
          ball1.coordinates = math.add(ball1.coordinates, math.multiply(ball2.mass(), vectorB));
          ball2.coordinates = math.subtract(ball2.coordinates, math.multiply(ball1.mass(), vectorB));
        }

        // color to red
        ball1.collideAnimation();
        ball2.collideAnimation();
      }

      // gravitational force
      let force = math.multiply(vectorA, ball1.mass(), ball2.mass(), GRAVITATIONAL_CONSTANT / math.pow(distance, 3));
      ball1.force = math.add(ball1.force, force);
      ball2.force = math.subtract(ball2.force, force);
    }
  }

  balls.forEach(ball => ball.move());
  balls.forEach(ball => ball.display());
}

setInterval(main, DT);