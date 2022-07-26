var RADIUS = 200;

document.ontouchstart = function(event) {
  cursor = event.touches[0];
  for (ball of balls) {
    if (ball.image.contains(event.target)) {
      heldball = ball;
      return;
    }
  }
  ball = new Ball(cursor.pageX, cursor.pageY);
  heldball = ball;
  balls.push(ball);
}

document.onwheel = function(event) {
  for (ball of balls) {
    if (ball.image.contains(event.target)) {
      ball.radius -= event.deltaY / 10;
      if (ball.radius <= 0) {
        balls.splice(balls.indexOf(ball), 1);
        ball.image.remove();
      }
      return;
    }
  }
}

document.ontouchend = function(event) {
  heldball = null;
}
document.ontouchmove = function (event) {cursor = event.touches[0];};
document.oncontextmenu = function (event) {
  event.preventDefault();
}

setInterval(main, DT);