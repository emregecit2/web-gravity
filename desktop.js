var RADIUS = 50;
var heldball = null;

document.onmousedown = function(event) {
    console.log(event);
    cursor = [event];
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
        heldball.held = false;
        heldball = null;
        break;
      case 2:
        rightclick = false;
      }
  }
  document.onmousemove = function (event) {
    cursor = [event];
    if (heldball) {
      heldball.held = event;
    }
  };
  document.oncontextmenu = function (event) {
    event.preventDefault();
  }