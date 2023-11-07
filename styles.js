(() => {
    function vh(percent) {
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        return (percent * h) / 100;
    }

    function vw(percent) {
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        return (percent * w) / 100;
    }

    const board = document.getElementById("game")

    board.clientWidth = vw(50)
    board.clientHieght = vh(50)
})()