var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var sideLength = 100;
var fps = 100;
var hasLost = false;
var firstPlay = true;
var score;

var scl = window.innerHeight < window.innerWidth ? Math.floor(window.innerHeight / sideLength):
                                                   Math.floor(window.innerWidth / sideLength);
console.log(scl);
var bird;
var pipes;
var pipeHoleSize = 25 * scl;

canvas.width = sideLength * scl - scl;
canvas.height = sideLength * scl - scl;

function mainLoop() {
    setTimeout(function () {
        window.requestAnimationFrame(mainLoop);
        ctx.fillStyle = '#696969';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (firstPlay) {
            drawStartScreen();
        } else if (hasLost) {
            if (bird.outOfBounds()) {
                drawLostScreen()
            } else {
                death();
            }
        } else {
            run();
        }
    }, 1000 / fps)
}

function run() {
    bird.update();
    bird.draw();
    for (var i = 0; i < pipes.length; i++) {
        pipes[i].update();
        pipes[i].draw();
        if (bird.touchesPipe(pipes[i])) {
            hasLost = true;
        }

        if (pipes[i].passedScreen()) {
            score++;
            pipes[i].newPipe();
        }
    }
    if (bird.outOfBounds()) {
        hasLost = true;
    }
}

function drawStartScreen() {
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';

    ctx.font = '40px Helvetica';
    ctx.strokeText('Flappie Berd', 50, 100);

    ctx.font = '30px Helvetica';
    ctx.fillText('Press Space to jump', 50, canvas.height / 2);
    ctx.fillText('and enter to start!', 50, canvas.height / 2 + 40);
}

function drawLostScreen() {
    ctx.fillStyle = 'white';

    ctx.font = '40px Helvetica';
    ctx.fillText("You lose! Score: " + score, 30, 150);

    ctx.font = '30px Helvetica';
    ctx.fillText('Press Enter to try again', 30, 250);
}

function death() {
    bird.update();
    bird.draw();
    for (var i = 0; i < pipes.length; i++) {
        pipes[i].draw();
    }
}

function setUp() {
    score = 0;
    bird = new Bird();
    pipes = [];
    for (var i = 0; i < 3; i++) {
        pipes.push(new Pipe(canvas.width * (1 + i/3)));
    }
}

document.onkeydown = function(e) {
    switch(e.keyCode) {
        case 32: //space
            if (!hasLost) {
                bird.jump();
            }
            break;
        case 13: //enter
            if (firstPlay || hasLost) {
                setUp();
                hasLost = false;
                firstPlay = false;
            }
            break;
    }
};

mainLoop();