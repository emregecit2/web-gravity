document.onmousedown = function(event) {
    cursor = event;
    switch (event.button){
      case 0:
        for (ball of balls) {
          if (ball.image.contains(event.target)) {
            heldball = ball;
            return;
          }
        }
        ball = new Ball(event.x, event.y);
        heldball = ball;
        balls.push(ball);
        break;
      case 2:
        rightclick = true;
    }
  }
  
  document.onwheel = function(event) {
    for (ball of balls) {
      if (ball.image.contains(event.target)) {
        ball.radius -= event.deltaY / 10;
        if (ball.radius <= 0) {
          balls.splice(balls.indexOf(ball), 1);
          ball.image.remove();
        }
        return;
      }
    }
  }
  
  document.onmouseup = function(event) {
    switch (event.button){
      case 0:
      heldball = null;
      break;
      case 2:
        rightclick = false;
      }
  }
  document.onmousemove = function (event) {cursor = event;};
  document.oncontextmenu = function (event) {
    event.preventDefault();
  }