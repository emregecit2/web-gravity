var canvas = document.getElementById("myCanvas");
var context =  canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawCircle(event){
  context.beginPath();
  context.arc(event.x, event.y, 50, 0, 2 * Math.PI);
  context.stroke();
}

document.addEventListener("click", drawCircle);