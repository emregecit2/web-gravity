var DT = 0.1;
var heldball = null;
var rightclick = false;
var balls = [];
class Ball {
  constructor(x, y) {
    this.coordinates = [x, y];
    this.velocity = [0, 0];
    this.force = [0, 0];
    this.radius = 100;
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
      this.coordinates = [cursor.pageX, cursor.pageY];
      ball.velocity = [0, 0];
    }
    let acceleration = math.multiply(this.force, 1 / this.mass());
    this.coordinates = math.add(this.coordinates, math.multiply(DT, this.velocity), math.multiply(DT**2, acceleration));
    this.velocity = math.add(this.velocity, math.multiply(acceleration, DT));
    this.force = [0, 0];

    // reflecting from walls
    if (this.coordinates[0] - this.radius <= 0) {
      this.coordinates[0] = this.radius;
      this.velocity[0] = -this.velocity[0];
    }
    if (this.coordinates[0] + this.radius >= window.innerWidth) {
      this.coordinates[0] = window.innerWidth - this.radius;
      this.velocity[0] = -this.velocity[0];
    }
    if (this.coordinates[1] - this.radius <= 0) {
      this.coordinates[1] = this.radius;
      this.velocity[1] = -this.velocity[1];
    }
    if (this.coordinates[1] + this.radius >= window.innerHeight) {
      this.coordinates[1] = window.innerHeight - this.radius;
      this.velocity[1] = -this.velocity[1];
    }

  }
  display() {
    this.image.style.left = this.coordinates[0] - this.radius + "px";
    this.image.style.top = this.coordinates[1] - this.radius + "px";
    this.image.style.height = 2 * this.radius + "px";
    this.image.style.width = 2 * this.radius + "px";
  }
  mass(){
    return this.radius**3 / 100;
  }
}

function main() {
  if (rightclick) {
    for (ball of balls) {
      if (ball.image.contains(cursor.target)) {
        balls.splice(balls.indexOf(ball), 1);
        ball.image.remove();
      }
    }
  }

  for (let i = 0; i < balls.length; i++) {
    for (let j = i+1; j < balls.length; j++) {
      if (balls[j] == heldball) {
        var ball1 = heldball;
        var ball2 = balls[i];
      }
      else if (balls[i] == heldball) {
        var ball1 = heldball;
        var ball2 = balls[j];
      }
      else {
        var ball1 = balls[i];
        var ball2 = balls[j];
      }
      let vectorA = math.subtract(ball2.coordinates, ball1.coordinates);
      let distance_squared = math.sum(math.dotPow(vectorA, 2));
      let distance = math.sqrt(distance_squared);
      let distance_between_edges = distance - ball1.radius - ball2.radius;
      
      if (distance_between_edges <= 0) {
        // elastic collision
        let vectorC = math.multiply(vectorA, math.subtract(ball1.velocity, ball2.velocity), vectorA, 2 / (distance_squared * (ball1.mass() + ball2.mass())));
        ball1.velocity = math.subtract(ball1.velocity, math.multiply(vectorC, ball2.mass()));
        ball2.velocity = math.add(ball2.velocity, math.multiply(vectorC, ball1.mass()));
        // push away
        if (heldball == ball1) {
          ball2.coordinates = math.subtract(ball2.coordinates, math.multiply(vectorA, distance_between_edges / distance));
        }
        else{
          let vectorB = math.multiply(vectorA, distance_between_edges / distance / (ball1.mass() + ball2.mass()));
          ball1.coordinates = math.add(ball1.coordinates, math.multiply(ball2.mass(), vectorB));
          ball2.coordinates = math.subtract(ball2.coordinates, math.multiply(ball1.mass(), vectorB));  
        }

        // color to red
        ball1.image.classList.remove("animated");
        ball1.image.offsetWidth
        ball1.image.classList.add("animated");
        ball2.image.classList.remove("animated");
        ball2.image.offsetWidth
        ball2.image.classList.add("animated");
      }
      
      // gravitational force
      let force = math.multiply(vectorA, ball1.mass(), ball2.mass(), 1 / math.pow(distance, 3));
      ball1.force = math.add(ball1.force, force);
      ball2.force = math.subtract(ball2.force, force);
    }
  }
  
  balls.forEach(ball => ball.move());
  balls.forEach(ball => ball.display());
}

setInterval(main, DT);