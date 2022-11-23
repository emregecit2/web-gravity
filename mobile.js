document.ontouchstart = function (event) {
  let touch = event.changedTouches[0];
  let ball = findBall(touch);
  if (ball) {
    ball.held = touch;
    return;
  }
  ball = new Ball(touch.pageX, touch.pageY);
  touch.timeStamp = event.timeStamp;
  ball.held = touch;
}

document.ontouchend = function (event) {
  for (ball of balls) {
    if (ball.held && (ball.held.identifier == event.changedTouches[0].identifier)) {
      if (ball.lastHeld) ball.velocity = [(ball.held.pageX - ball.lastHeld.pageX) / (ball.held.timeStamp - ball.lastHeld.timeStamp), (ball.held.pageY - ball.lastHeld.pageY) / (ball.held.timeStamp - ball.lastHeld.timeStamp)];
      ball.lastHeld = ball.held = null;
    }
  }
}
document.ontouchmove = function (event) {
  for (touch of event.changedTouches) {
    for (ball of balls) {
      if (ball.held && (ball.held.identifier == touch.identifier)) {
        ball.lastHeld = ball.held;
        ball.held = touch;
        ball.held.timeStamp = event.timeStamp;
      }
    }
  }
};
document.oncontextmenu = function (event) {
  event.preventDefault();
}

setInterval(main, DT);