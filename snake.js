
const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';

const snakeboard = document.getElementById("game");

snakeboard.width = document.documentElement.clientWidth
snakeboard.height = document.documentElement.clientHeight

const sqrSize = snakeboard.height / 20

let snake = [
    { x: snakeboard.width / 2, y: snakeboard.height / 2 },
    { x: snakeboard.width / 2 - sqrSize, y: snakeboard.height / 2 },
    { x: snakeboard.width / 2 - sqrSize * 2, y: snakeboard.height / 2 },
    { x: snakeboard.width / 2 - sqrSize * 3, y: snakeboard.height / 2 },
    { x: snakeboard.width / 2 - sqrSize * 4, y: snakeboard.height / 2 }
]

let score = 0;
let changing_direction = false;
let food_x;
let food_y;
let dx = sqrSize;
let dy = 0;

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
    snakeboard_ctx.fillStyle = 'black';
    snakeboard_ctx.font = "48px sans-serif";
    const text = `You lost. Score: ${score}.`;
    snakeboard_ctx.fillText(text, snakeboard.width / 2, snakeboard.height / 2);
    setTimeout(() => {
        clear_board();
        snake = [
            { x: snakeboard.width / 2, y: snakeboard.height / 2 },
            { x: snakeboard.width / 2 - sqrSize, y: snakeboard.height / 2 },
            { x: snakeboard.width / 2 - sqrSize * 2, y: snakeboard.height / 2 },
            { x: snakeboard.width / 2 - sqrSize * 3, y: snakeboard.height / 2 },
            { x: snakeboard.width / 2 - sqrSize * 4, y: snakeboard.height / 2 }
        ]
        document.getElementById('score').innerHTML = score;
        score = 0;
        changing_direction = false;
        food_x;
        food_y;
        dx = sqrSize;
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
    snakeboard_ctx.fillRect(food_x, food_y, sqrSize, sqrSize);
    snakeboard_ctx.strokeRect(food_x, food_y, sqrSize, sqrSize);
}

function drawSnakePart(snakePart) {
    snakeboard_ctx.fillStyle = snake_col;
    snakeboard_ctx.strokestyle = snake_border;
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, sqrSize, sqrSize);
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, sqrSize, sqrSize);
}

function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeboard.width - sqrSize;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeboard.height - sqrSize;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function random_food(min, max) {
    return Math.round((Math.random() * (max - min) + min) / sqrSize) * sqrSize;
}

function gen_food() {
    food_x = random_food(0, snakeboard.width - sqrSize);
    food_y = random_food(0, snakeboard.height - sqrSize);
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
    const goingUp = dy === -sqrSize;
    const goingDown = dy === sqrSize;
    const goingRight = dx === sqrSize;
    const goingLeft = dx === -sqrSize;
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -sqrSize;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -sqrSize;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = sqrSize;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = sqrSize;
    }
}

down.addEventListener('click', () => {
    const goingUp = dy === sqrSize;

    if (!goingUp) {
        dx = 0;
        dy = sqrSize;
    }
})



up.addEventListener('click', () => {
    const goingDown = dy === -sqrSize;

    if (!goingDown) {
        dx = 0;
        dy = -sqrSize;
    }
})

left.addEventListener('click', () => {
    const goingRight = dx === sqrSize;

    if (!goingRight) {
        dx = -sqrSize;
        dy = 0;
    }
})

right.addEventListener('click', () => {
    const goingLeft = dx === -sqrSize;

    if (!goingLeft) {
        dx = sqrSize;
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