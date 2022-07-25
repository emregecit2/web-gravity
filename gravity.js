class Ball {
  static balls = [];
  static radius = 20;
  constructor(x, y) {
    this.x = x;
    this.y = y;
    const ball = document.createElement("div");
    ball.className = "ball";
    ball.style.left = x - Ball.radius+ "px";
    ball.style.top = y - Ball.radius + "px";
    document.getElementById('c').appendChild(ball);
  }
}

function newBall(event) {
  Ball.balls.push(new Ball(event.clientX, event.clientY));
}



document.addEventListener("click", newBall);