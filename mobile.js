var RADIUS = 50;

document.ontouchstart = function (event) {
  cursor = event.touches;
  for (touch of event.touches) {
    document.getElementById("info").innerHTML = document.getElementById("info").innerHTML + touch.identifier;
  }
  let ball = findBall(event);
  if (ball) {
    ball.held = true;
    return;
  }
  ball = new Ball(cursor[cursor.length - 1].pageX, cursor[cursor.length - 1].pageY);
}

document.ontouchend = function (event) {
  for (ball of balls) {
    if (math.norm(math.subtract(ball.coordinates, [event.changedTouches[event.changedTouches.length - 1].pageX, event.changedTouches[event.changedTouches.length - 1].pageY])) <= ball.radius) {
      ball.held = false;
    }
  }
}
document.ontouchmove = function (event) { cursor = event.touches; };
document.oncontextmenu = function (event) {
  event.preventDefault();
}

setInterval(main, DT);