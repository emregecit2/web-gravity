var RADIUS = 50;

document.ontouchstart = function (event) {
  let touch = event.changedTouches[0];
  let ball = findBall(touch);
  if (ball) {
    ball.held = event.changedTouches[0];
    return;
  }
  ball = new Ball(touch.pageX, touch.pageY);
  ball.held = touch;
}

document.ontouchend = function (event) {
  for (ball of balls) {
    if (math.norm(math.subtract(ball.coordinates, [event.changedTouches[event.changedTouches.length - 1].pageX, event.changedTouches[event.changedTouches.length - 1].pageY])) <= ball.radius) {
      ball.held = false;
    }
  }
}
document.ontouchmove = function (event) {
  for (touch of event.changedTouches) {
    for (ball of balls) {
      if (ball.held && (ball.held.identifier == touch.identifier)) {
        ball.held = touch;
      }
    }
  }
};
document.oncontextmenu = function (event) {
  event.preventDefault();
}

setInterval(main, DT);