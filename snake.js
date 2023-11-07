const board = document.getElementById("game")
const boardCtx = board.getContext("2")

let snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 }
]

const drawSnakePart = (snakePart) => {
    boardCtx.fillStyle = 'grey'
    boardCtx.strokeStyle = 'black'
    boardCtx.fillRect(snakePart.x, snakePart.y, 10, 10)
    boardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10)
}

const drawSnake = () => {
    snake.forEach(drawSnakePart);
}

drawSnake()