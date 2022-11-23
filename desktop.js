let heldBall = null;
let lastCursor = null;
let cursor = null;

document.onmousedown = function(event) {
  lastCursor = cursor;
    cursor = event;
    switch (event.button){
      case 0:
        ball = findBall(event);
        if (ball) {
          ball.held = event;
          heldBall = ball;
          return;
        }

        ball = new Ball(event.x, event.y);
        heldBall = ball;
        ball.held = event;
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
        heldBall.velocity = [(event.x - lastCursor.x) / (event.timeStamp - lastCursor.timeStamp), (event.y - lastCursor.y) / (event.timeStamp - lastCursor.timeStamp)];
        heldBall.held = heldBall = null;
        break;
      case 2:
        isRightClick = false;
      }
  }
  document.onmousemove = function (event) {
    lastCursor = cursor;
    cursor = event;
    if (heldBall) {
      heldBall.held = event;
    }
  };
  document.oncontextmenu = function (event) {
    event.preventDefault();
  }