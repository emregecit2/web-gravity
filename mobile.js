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
  ball.held.timeStamp = event.timeStamp;
}

document.ontouchend = function (event) {
  for (ball of balls) {
    if (ball.held && (ball.held.identifier == event.changedTouches[0].identifier)) {
      ball.velocity = [(ball.held.pageX - ball.lastheld.pageX) / (ball.held.timeStamp - ball.lastheld.timeStamp), (ball.held.pageY - ball.lastheld.pageY) / (ball.held.timeStamp - ball.lastheld.timeStamp)];
      ball.held = false;
    }
  }
}
document.ontouchmove = function (event) {
  for (touch of event.changedTouches) {
    for (ball of balls) {
      if (ball.held && (ball.held.identifier == touch.identifier)) {
        ball.lastheld = ball.held;
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