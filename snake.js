const board_border = 'black';
const board_background = "white";
const snake_col = 'white';
const snake_border = 'black';

let snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 }
]

const snakeboard = document.getElementById("game");
const snakeboard_ctx = snakeboard.getContext("2d");
main();

function main() {
    setTimeout(function onTick() {    
     clearCanvas();    
     advanceSnake();  
     drawSnake();
     // I AM RECURSION
     main();
   }, 100)
}

function clearCanvas() {
    snakeboard_ctx.fillStyle = board_background;
    snakeboard_ctx.strokestyle = board_border;
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function drawSnake() {
    snake.forEach(drawSnakePart)
}

function drawSnakePart(snakePart) {

    snakeboard_ctx.fillStyle = snake_col;
    snakeboard_ctx.strokestyle = snake_border;
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function move_snake() {  
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
  snake.pop();
}