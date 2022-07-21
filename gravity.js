var ball = document.getElementById('ball');

function myFunction(){
  ball.style.left = parseInt(ball.style.left) + 1;
}

setInterval(myFunction, 1);