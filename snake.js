
const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';

const snakeboard = document.getElementById("game");

const gameSize = (document.documentElement.clientWidth + document.documentElement.clientHeight / 1.5 + ((document.documentElement.clientHeight + document.documentElement.clientWidth) / 2)) / 5

snakeboard.width = gameSize
snakeboard.height = gameSize
const sqrSize = snakeboard.height / 50

let snake = [
    { x: snakeboard.width / 2.5, y: snakeboard.height / 2.5 }
]

let score = 0;
let high_score = 0;
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

document.addEventListener("keydown", change_direction);

function reset() {
    clear_board();
    snakeboard_ctx.fillStyle = 'black';
    snakeboard_ctx.font = `${sqrSize * 2.5}px sans-serif`;
    const text = `You lost. Score: ${score}.`;
    snakeboard_ctx.fillText(text, snakeboard.width / 2.5, snakeboard.height / 2.5);
    setTimeout(() => {
        clear_board();
        snake = [
            { x: snakeboard.width / 2.5, y: snakeboard.height / 2.5 }
        ]
        score = 0;
        document.getElementById('score').innerHTML = score;
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
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    const hitLeftWall = head.x < 0;
    const hitRightWall = head.x > snakeboard.width - sqrSize;
    const hitToptWall = head.y < 0;
    const hitBottomWall = head.y > snakeboard.height - sqrSize;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

function move_snake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    const has_eaten_food = snake[0].x >= food_x && snake[0].x < food_x + sqrSize && snake[0].y >= food_y && snake[0].y < food_y + sqrSize;
    if (has_eaten_food) {
        score += 1;
        document.getElementById('score').innerHTML = score;
        if (score > high_score) {
            high_score = score
        }
        document.getElementById('best').innerHTML = high_score;
        gen_food();
    } else {
        snake.pop();
    }

    save()
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

function save() {
    localStorage.setItem("snake_score", score)
    localStorage.setItem("snake_best", high_score)
    let snook = []
    snake.forEach((part) => {
        snook.push(`${part.x}+${part.y}`)
    })
    localStorage.setItem("snake_player", snook.toString())
}

function load() {
    const loaded_score = Number(localStorage.getItem("snake_score")) || 0
    const loaded_best = Number(localStorage.getItem("snake_best")) || 0
    let loaded_snook = null

    if (localStorage.getItem("snake_score")) {
        loaded_snook = []
        localStorage.getItem("snake_score").split(",").forEach((part) => {
            loaded_snook.push({
                x: Number(part.split("+")[0]) || snakeboard.width / 2.5 - sqrSize * loaded_snook.length,
                y: Number(part.split("+")[1]) || snakeboard.height / 2.5
            })
        })
    }

    score = loaded_score
    high_score = loaded_best
    snake = loaded_snook || [
        { x: snakeboard.width / 2.5, y: snakeboard.height / 2.5 }
    ]
    main()
    gen_food();
}

load()