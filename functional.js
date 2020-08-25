scoreCount = 0;
cross = true;
jump = new Audio("sound/jump.mp3");
end = new Audio("sound/end game.mp3")


document.onkeydown = function (e) {

    if (e.keyCode == 38 || e.keyCode == 87 || e.keyCode == 13 || e.keyCode == 32) {
        dino = document.querySelector(".dino");
        dino.classList.add("animateDino");

        setTimeout(() => {
            dino.classList.remove("animateDino");
        }, 500);
    }
    if (e.keyCode == 37 || e.keyCode == 65) {
        dino = document.querySelector(".dino");
        gameSite = document.querySelector(".gameSite");
        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        if (21 < dx) {
            dino.style.left = `${dx - 65}px`
        }


    }
    if (e.keyCode == 39 || e.keyCode == 68) {
        dino = document.querySelector(".dino");
        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        if (dx < 987) {
            dino.style.left = `${dx + 65}px`
        }


    }

}


setInterval(() => {
    dino = document.querySelector(".dino");
    bush = document.querySelector(".bush");
    KO = document.querySelector(".game-over");

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue("top"));

    bx = parseInt(window.getComputedStyle(bush, null).getPropertyValue("left"));
    by = parseInt(window.getComputedStyle(bush, null).getPropertyValue("top"));

    cx = Math.abs(dx - bx);
    cy = Math.abs(dy - by);

    if (cx < 40 && cy < 35) {
        KO.style.visibility = "visible";
        score.style.visibility = "hidden";
        document.onkeydown = function (e) {
            if(e.keyCode==32)
            restart();
        }
        jump.pause();
        end.play();
        setTimeout(() => {
            end.pause();
        }, 2000);
        bush.classList.remove("animateBush");
        final.innerHTML = ' Game Over &nbsp;<img onclick="restart()" style="cursor : pointer;" src="images/restart.svg" alt="" width="30px" height ="30px" title="To restart"> <br> Your Final Score is: ' + (scoreCount-1);
    }
    else if (cx < 100 && cross) {
        scoreCount+=1;
        updateScore(scoreCount);
        cross = false;
        jump.play();
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniSpeed = parseFloat(window.getComputedStyle(bush, null).getPropertyValue("animation-duration"));
            fast = aniSpeed - 0.05;
            bush.style.animationDuration = fast + "s";
            console.log('New animation duration: ', fast)
        }, 5000);

    }

}, 10);

function updateScore(scoreCount) {
    
    score.innerHTML = "Your Score : " + scoreCount ;
}

function restart() {
    window.location.reload();
}
