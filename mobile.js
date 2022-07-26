var RADIUS = 50;

document.ontouchstart = function(event) {
  cursor = event.changedTouches[0];
  console.log(event.changedTouches.length);
  for (ball of balls) {
    if (ball.image.contains(event.target)) {
      return;
    }
  }
  ball = new Ball(cursor.pageX, cursor.pageY);
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
  for (ball of balls) {
    if (ball.image.contains(event.target)) {
      ball.held = false;
    }
  }
}
document.ontouchmove = function (event) {cursor = event.changedTouches[event.changedTouches.length - 1];};
document.oncontextmenu = function (event) {
  event.preventDefault();
}

setInterval(main, DT);