var heldball = null;
var lastcursor = null;
var cursor = null;

document.onmousedown = function(event) {
  lastcursor = cursor;
    cursor = event;
    switch (event.button){
      case 0:
        ball = findBall(event);
        if (ball) {
          ball.held = event;
          heldball = ball;
          return;
        }

        ball = new Ball(event.x, event.y);
        heldball = ball;
        ball.held = event;
        break;
      case 2:
        rightclick = true;
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
        heldball.velocity = [(event.x - lastcursor.x) / (event.timeStamp - lastcursor.timeStamp), (event.y - lastcursor.y) / (event.timeStamp - lastcursor.timeStamp)];
        heldball.held = false;
        heldball = null;
        break;
      case 2:
        rightclick = false;
      }
  }
  document.onmousemove = function (event) {
    lastcursor = cursor;
    cursor = event;
    if (heldball) {
      heldball.held = event;
    }
  };
  document.oncontextmenu = function (event) {
    event.preventDefault();
  }