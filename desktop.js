let heldBall = null;
let lastCursor = null;
let cursor_ = null;

document.onmousedown = function(event) {
  lastCursor = cursor_;
    cursor_ = event;
    switch (event.button){
      case 0:
        heldBall = findBall(event) ?? new Ball(event.x, event.y);
        heldBall = heldBall;
        heldBall.held = event;
        break;
      case 2:
        isRightClick = true;
    }
  }
  
  document.onwheel = function(event) {
    let ball = findBall(event);
    if (ball) {
      ball.radius -= event.deltaY / 10;
      if (ball.radius <= 0) {
        ball.clear();
      }
    }
  }
  
  document.onmouseup = function(event) {
    switch (event.button){
      case 0:
        heldBall.held = heldBall = null;
        break;
      case 2:
        isRightClick = false;
      }
  }
  document.onmousemove = function (event) {
    lastCursor = cursor_;
    cursor_ = event;
    if (heldBall) {
      heldBall.held = event;
      heldBall.velocity = [(event.x - lastCursor.x) / (event.timeStamp - lastCursor.timeStamp), (event.y - lastCursor.y) / (event.timeStamp - lastCursor.timeStamp)];
    }
  };
  document.oncontextmenu = function (event) {
    event.preventDefault();
  }