(() => {
    const isMobile = () => {
        let check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

    let board_background = "blue";
    let snake_col = 'black';
    let food_col = 'black'

    const snakeboard = document.getElementById("game");

    const gameSize = (document.documentElement.clientWidth + document.documentElement.clientHeight / 1.5 + ((document.documentElement.clientHeight + document.documentElement.clientWidth) / 2)) / 5

    snakeboard.width = gameSize
    snakeboard.height = gameSize
    const sqrSize = snakeboard.height / 40

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
    let paused = false;

    const snakeboard_ctx = snakeboard.getContext("2d");
    const right = document.getElementById("right")
    const left = document.getElementById("left")
    const up = document.getElementById("up")
    const down = document.getElementById("down")
    const pause = document.getElementById("toggle-pause")
    const snake_colour = document.getElementById("snake-colour")
    const food_colour = document.getElementById("food-colour")
    const bg_colour = document.getElementById("bg-colour")

    if (!isMobile()) {
        left.remove()
        right.remove()
        up.remove()
        down.remove()
        pause.remove()
    }

    pause.addEventListener('click', () => {
        paused = !paused
        if (paused) pause.textContent = "UNPAUSE"
        if (!paused) pause.textContent = "PAUSE"
    })

    snake_colour.addEventListener('change', () => {
        switch (snake_colour.value) {
            case "0":
                snake_col = "#A5E2FF"
                break;
            case "1":
                snake_col = "#00A8F7"
                break;
            case "2":
                snake_col = "#002E44"
                break;
            case "3":
                snake_col = "#CBFFA5"
                break;
            case "4":
                snake_col = "#8EF73B"
                break;
            case "5":
                snake_col = "#183500"
                break;
            case "6":
                snake_col = "#EFA5A5"
                break;
            case "7":
                snake_col = "#DE4C48"
                break;
            case "8":
                snake_col = "#350A00"
                break;
            case "9":
                snake_col = "#F8A5FF"
                break;
            case "10":
                snake_col = "#EF37FF"
                break;
            case "11":
                snake_col = "#35003A"
                break;
            case "12":
                snake_col = "#FFF3A5"
                break;
            case "13":
                snake_col = "#FFEF12"
                break;
            case "14":
                snake_col = "#353200"
                break;
            default:
                snake_col = "black"
                break;
        }
    })

    bg_colour.addEventListener('change', () => {
        switch (bg_colour.value) {
            case "0":
                board_background = "#A5E2FF"
                break;
            case "1":
                board_background = "#00A8F7"
                break;
            case "2":
                board_background = "#002E44"
                break;
            case "3":
                board_background = "#CBFFA5"
                break;
            case "4":
                board_background = "#8EF73B"
                break;
            case "5":
                board_background = "#183500"
                break;
            case "6":
                board_background = "#EFA5A5"
                break;
            case "7":
                board_background = "#DE4C48"
                break;
            case "8":
                board_background = "#350A00"
                break;
            case "9":
                board_background = "#F8A5FF"
                break;
            case "10":
                board_background = "#EF37FF"
                break;
            case "11":
                board_background = "#35003A"
                break;
            case "12":
                board_background = "#FFF3A5"
                break;
            case "13":
                board_background = "#FFEF12"
                break;
            case "14":
                board_background = "#353200"
                break;
            default:
                board_background = "blue"
                break;
        }
    })

    food_colour.addEventListener('change', () => {
        switch (food_colour.value) {
            case "0":
                food_col = "#A5E2FF"
                break;
            case "1":
                food_col = "#00A8F7"
                break;
            case "2":
                food_col = "#002E44"
                break;
            case "3":
                food_col = "#CBFFA5"
                break;
            case "4":
                food_col = "#8EF73B"
                break;
            case "5":
                food_col = "#183500"
                break;
            case "6":
                food_col = "#EFA5A5"
                break;
            case "7":
                food_col = "#DE4C48"
                break;
            case "8":
                food_col = "#350A00"
                break;
            case "9":
                food_col = "#F8A5FF"
                break;
            case "10":
                food_col = "#EF37FF"
                break;
            case "11":
                food_col = "#35003A"
                break;
            case "12":
                food_col = "#FFF3A5"
                break;
            case "13":
                foode_col = "#FFEF12"
                break;
            case "14":
                food_col = "#353200"
                break;
            default:
                food_col = "black"
                break;
        }
    })

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
            gen_food()
            main();
        }, 3000)
    }

    function main() {

        if (has_game_ended()) {
            reset();
            return;
        } else if (paused) {
            setTimeout(() => {
                clear_board()
                const text = `Paused. Score: ${score}.`;
                snakeboard_ctx.fillText(text, snakeboard.width / 2.5, snakeboard.height / 2.5);
                // I AM RECURSION
                main()
            }, 100)
        } else if (!paused) {
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
        snakeboard_ctx.strokestyle = board_background;
        snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
        snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
    }

    function drawSnake() {
        snake.forEach(drawSnakePart)
    }

    function drawFood() {
        snakeboard_ctx.fillStyle = food_col;
        snakeboard_ctx.strokeStyle = food_col;
        snakeboard_ctx.fillRect(food_x, food_y, sqrSize, sqrSize);
        snakeboard_ctx.strokeRect(food_x, food_y, sqrSize, sqrSize);
    }

    function drawSnakePart(snakePart) {
        snakeboard_ctx.fillStyle = snake_col;
        snakeboard_ctx.strokeStyle = snake_col;
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

        const has_eaten_food = (snake[0].x >= food_x && snake[0].x <= food_x + sqrSize && snake[0].y >= food_y && snake[0].y <= food_y + sqrSize) || (snake[0].x === food_x && snake[0].y === food_y);
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
            const has_eaten = (part.x === food_x && part.y === food_y) || (part.x >= food_x && part.x <= food_x + sqrSize && part.y >= food_y && part.y <= food_y + sqrSize);
            if (has_eaten) gen_food();
        });
    }

    function change_direction(event) {
        event.preventDefault();

        const LEFT_KEY = 37;
        const RIGHT_KEY = 39;
        const UP_KEY = 38;
        const DOWN_KEY = 40;
        const SPACE_KEY = 32;

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
        if (keyPressed === SPACE_KEY) {
            paused = !paused
            if (paused && isMobile()) pause.textContent = "UNPAUSE"
            if (!paused && isMobile()) pause.textContent = "PAUSE"
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
        localStorage.setItem("snake_bg_colour", board_background)
        localStorage.setItem("snake_player_colour", snake_col)
        localStorage.setItem("snake_food_colour", food_col)
        let snook = []
        snake.forEach((part) => {
            snook.push(`${part.x}+${part.y}`)
        })
        localStorage.setItem("snake_player", snook.toString())
    }

    function load() {
        const loaded_score = Number(localStorage.getItem("snake_score")) || 0
        const loaded_best = Number(localStorage.getItem("snake_best")) || 0
        const loaded_snake_col = Number(localStorage.getItem("snake_player_colour")) || "black"
        const loaded_food_col = Number(localStorage.getItem("snake_food_colour")) || "black"
        const loaded_board_background = Number(localStorage.getItem("snake_bg_colour")) || "blue"
        let loaded_snook = null

        if (localStorage.getItem("snake_score")) {
            loaded_snook = []
            localStorage.getItem("snake_score").split(",").forEach((part) => {
                loaded_snook.push({
                    x: Number(part.split("+")[0]) || null,
                    y: Number(part.split("+")[1]) || null
                })
            })
        }

        score = loaded_score
        high_score = loaded_best
        snake_col = loaded_snake_col
        food_col = loaded_food_col
        board_background = loaded_board_background
        snake = loaded_snook.every(element => element !== null) ? loaded_snook
            : [{ x: snakeboard.width / 2.5, y: snakeboard.height / 2.5 }]

        main()
        gen_food();
    }

    load()
})()