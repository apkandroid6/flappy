// flappycanvas.js

export function initGame(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error('Canvas element not found');
    return;
  }
  const ctx = canvas.getContext('2d');

  // Example pixel art bird: 8x8 pixels, each pixel 10x10 canvas pixels
  const birdPixels = [
    '00011000',
    '00111100',
    '01111110',
    '11111111',
    '11111111',
    '01111110',
    '00100100',
    '01000010',
  ];

  function drawPixelArt(x, y, pixelSize, pixels, color) {
    ctx.fillStyle = color;
    for (let row = 0; row < pixels.length; row++) {
      for (let col = 0; col < pixels[row].length; col++) {
        if (pixels[row][col] === '1') {
          ctx.fillRect(x + col * pixelSize, y + row * pixelSize, pixelSize, pixelSize);
        }
      }
    }
  }

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw bird at position (50,50), each pixel 10x10, in red color
  drawPixelArt(50, 50, 10, birdPixels, '#ff0000');

  // You can replace this with your startGame or game loop logic...
}
