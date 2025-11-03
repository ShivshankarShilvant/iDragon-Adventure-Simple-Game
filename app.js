let score = 0;
let cross = true;

let audio = new Audio("./music/music.mp3")
let audiogo = new Audio("./music/gameover.mp3")
audio.play()
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)

    if (e.keyCode == 38) {
        let dino = document.querySelector(".dino");
        dino.classList.add("animateDino")
        setTimeout(() => {
            dino.classList.remove("animateDino")
        }, 700);
    }

    if (e.keyCode == 39) {
        let dino = document.querySelector(".dino");
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"))
        dino.style.left = dinoX + 115 + "px";
    }

    if (e.keyCode == 37) {
        let dino = document.querySelector(".dino");
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"))
        dino.style.left = (dinoX - 115) + "px";
    }
}

setInterval(() => {
    let dino = document.querySelector(".dino");
    let gameOver = document.querySelector(".gameOver");
    let obstacle = document.querySelector(".obstacle");

    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"))
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue("top"))

    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("left"))
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("top"))

    let offsetX = Math.abs(dx - ox)
    let offsetY = Math.abs(dy - oy)

    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload To Play Again"
        obstacle.classList.remove("obstacleAni")
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause()
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updatScore(score);
        cross = false
        setTimeout(() => {
            cross = true
        }, 1000);

        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue("animation-duration"))
            let newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + "s";
        }, 500);

    }
}, 10);

function updatScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}