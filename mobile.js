document.ontouchstart = function (event) {
  let touch = event.changedTouches[0];
  let ball = findBall(touch) ?? new Ball(touch.pageX, touch.pageY);
  touch.timeStamp = event.timeStamp;
  ball.held = touch;
}

document.ontouchend = function (event) {
  for (ball of balls) {
    if (ball.held && (ball.held.identifier == event.changedTouches[0].identifier)) {
      ball.lastHeld = ball.held = null;
    }
  }
}
document.ontouchmove = function (event) {
  for (touch of event.changedTouches) {
    for (ball of balls) {
      if (ball.held && (ball.held.identifier == touch.identifier)) {
        if (ball.lastHeld)
          ball.velocity = [(touch.pageX - ball.lastHeld.pageX) / (event.timeStamp - ball.lastHeld.timeStamp), (touch.pageY - ball.lastHeld.pageY) / (event.timeStamp - ball.lastHeld.timeStamp)];
        
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
