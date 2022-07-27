var RADIUS = 50;

document.ontouchstart = function (event) {
  cursor = event.changedTouches;
  let ball = findBall(cursor[0]);
  if (ball) {
    ball.held = event.changedTouches[0];
    return;
  }
  ball = new Ball(cursor[cursor.length - 1].pageX, cursor[cursor.length - 1].pageY);
  ball.held = event.changedTouches[0];
}

document.ontouchend = function (event) {
  for (ball of balls) {
    if (math.norm(math.subtract(ball.coordinates, [event.changedTouches[event.changedTouches.length - 1].pageX, event.changedTouches[event.changedTouches.length - 1].pageY])) <= ball.radius) {
      ball.held = false;
    }
  }
}
document.ontouchmove = function (event) {
  cursor = event.touches;
  for (touch of event.changedTouches) {
    for (ball of balls) {
      if (ball.held && (ball.held.identifier == touch.identifier)) {
        ball.held = touch;
        console.log(ball.held);
      }
    }
  }
};
document.oncontextmenu = function (event) {
  event.preventDefault();
}

setInterval(main, DT);