var RADIUS = 50;

document.ontouchstart = function(event) {
  cursor = event.touches;
  for (ball of balls) {
    if (ball.image.contains(event.target)) {
      ball.held = true;
      return;
    }
  }
  ball = new Ball(cursor[cursor.length - 1].pageX, cursor[cursor.length - 1].pageY);
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
    if (math.norm(math.subtract(ball.coordinates, [event.changedTouches[event.changedTouches.length - 1].pageX, event.changedTouches[event.changedTouches.length - 1].pageY])) <= ball.radius) {
      ball.held = false;
    }
  }
  console.log(event.changedTouches[event.changedTouches.length - 1].target);
}
document.ontouchmove = function (event) {cursor = event.touches;};
document.oncontextmenu = function (event) {
  event.preventDefault();
}

setInterval(main, DT);