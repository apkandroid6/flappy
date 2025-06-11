// flappybird.js
// Flappy Bird core logic in one file
// Usage: call initFlappyBirdGame(canvasElement, scoreElement)

function initFlappyBirdGame(canvas, scoreEl) {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error('First argument must be a canvas element');
  }
  if (!(scoreEl instanceof HTMLElement)) {
    throw new Error('Second argument must be an HTMLElement');
  }

  const ctx = canvas.getContext('2d');

  const bird = {
    x: 60,
    y: 150,
    width: 34,
    height: 24,
    velocity: 0,
    gravity: 0.6,
    lift: -10,
  };

  const pipes = [];
  const pipeWidth = 50;
  const pipeGap = 120;
  let frameCount = 0;
  let score = 0;
  let gameOver = false;

  function reset() {
    bird.y = 150;
    bird.velocity = 0;
    pipes.length = 0;
    score = 0;
    gameOver = false;
    frameCount = 0;
    scoreEl.textContent = 'Score: 0';
  }

  function createPipe() {
    const topPipeHeight = Math.random() * (canvas.height - pipeGap - 100) + 50;
    pipes.push({
      x: canvas.width,
      top: topPipeHeight,
      bottom: canvas.height - (topPipeHeight + pipeGap),
      width: pipeWidth,
      scored: false,
    });
  }

  function drawBird() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
  }

  function drawPipes() {
    ctx.fillStyle = 'green';
    for (const pipe of pipes) {
      ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
      ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
    }
  }

  function update() {
    if (gameOver) return;

    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.height > canvas.height || bird.y < 0) {
      gameOver = true;
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].x -= 2;

      if (
        bird.x < pipes[i].x + pipes[i].width &&
        bird.x + bird.width > pipes[i].x &&
        (bird.y < pipes[i].top || bird.y + bird.height > canvas.height - pipes[i].bottom)
      ) {
        gameOver = true;
      }

      if (!pipes[i].scored && pipes[i].x + pipes[i].width < bird.x) {
        score++;
        pipes[i].scored = true;
        scoreEl.textContent = 'Score: ' + score;
      }

      if (pipes[i].x + pipes[i].width < 0) {
        pipes.splice(i, 1);
      }
    }

    frameCount++;
    if (frameCount % 90 === 0) {
      createPipe();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBird();
    drawPipes();

    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fff';
      ctx.font = '32px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 20);
      ctx.font = '20px sans-serif';
      ctx.fillText('Press Space to Restart', canvas.width / 2, canvas.height / 2 + 20);
    }
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  function onKeyDown(e) {
    if (e.code === 'Space') {
      if (gameOver) {
        reset();
      } else {
        bird.velocity = bird.lift;
      }
    }
  }

  window.addEventListener('keydown', onKeyDown);

  reset();
  loop();
}
