// flappycanvas.js

export function initGame(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error('Canvas element not found');
    return;
  }
  const ctx = canvas.getContext('2d');

  // Assuming flappybird.js defines a function startGame that accepts ctx and canvas
  if (typeof startGame === 'function') {
    startGame(ctx, canvas);
  } else {
    console.error('startGame() not found. Make sure flappybird.js is loaded first.');
  }
}
