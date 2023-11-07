const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';

let snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 }
]

let score = 0;
let changing_direction = false;
let food_x;
let food_y;
let dx = 10;
let dy = 0;

const snakeboard = document.getElementById("game");
const snakeboard_ctx = snakeboard.getContext("2d");
const right = document.getElementById("right")
const left = document.getElementById("left")
const up = document.getElementById("up")
const down = document.getElementById("down")
main();

gen_food();

document.addEventListener("keydown", change_direction);

function reset() {
    clear_board();
    score = 0;
    snakeboard_ctx.fillStyle = 'black';
    snakeboard_ctx.font = "48px serif";
    const text = `You lost. Score: ${score}.`;
    snakeboard_ctx.fillText(text, snakeboard.width / 2, snakeboard.height / 2);
    setTimeout(() => {
        clear_board();
        snake = [
            { x: 200, y: 200 },
            { x: 190, y: 200 },
            { x: 180, y: 200 },
            { x: 170, y: 200 },
            { x: 160, y: 200 }
        ]
        score = 0;
        document.getElementById('score').innerHTML = score;
        changing_direction = false;
        food_x;
        food_y;
        dx = 10;
        dy = 0;
        main();
    }, 3000)
}

function main() {

    if (has_game_ended()) {
        reset();
        return;
    } else {
        changing_direction = false;
        setTimeout(function onTick() {
            clear_board();
            drawFood();
            move_snake();
            drawSnake();
            // I AM RECURSION
            main();
        }, 100)
    }
}

function clear_board() {
    snakeboard_ctx.fillStyle = board_background;
    snakeboard_ctx.strokestyle = board_border;
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function drawSnake() {
    snake.forEach(drawSnakePart)
}

function drawFood() {
    snakeboard_ctx.fillStyle = 'lightgreen';
    snakeboard_ctx.strokestyle = 'darkgreen';
    snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
    snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}

function drawSnakePart(snakePart) {
    snakeboard_ctx.fillStyle = snake_col;
    snakeboard_ctx.strokestyle = snake_border;
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeboard.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeboard.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function random_food(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function gen_food() {
    food_x = random_food(0, snakeboard.width - 10);
    food_y = random_food(0, snakeboard.height - 10);
    snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) gen_food();
    });
}

function change_direction(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (changing_direction) return;
    changing_direction = true;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }
}

down.addEventListener('click', () => {
    const goingUp = dy === 10;
    
    if (!goingUp) {
        dx = 0;
        dy = 10;
    }
})



up.addEventListener('click', () => {
    const goingDown = dy === -10;
    
    if (!goingDown) {
        dx = 0;
        dy = -10;
    }
})

left.addEventListener('click', () => {
    const goingRight = dx === 10;
    
    if (!goingRight) {
        dx = -10;
        dy = 0;
    }
})

right.addEventListener('click', () => {
    const goingLeft = dx === -10;
    
    if (!goingLeft) {
        dx = 10;
        dy = 0;
    }
})

function move_snake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food) {
        score += 1;
        document.getElementById('score').innerHTML = score;
        gen_food();
    } else {
        snake.pop();
    }
}