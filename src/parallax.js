export function initParallax() {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  container.appendChild(canvas);

  let width, height;
  let bubbles = [];
  let fishes = [];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initParticles();
  }

  function initParticles() {
    bubbles = [];
    fishes = [];
    
    // Bubbles
    const numBubbles = Math.min(80, (width * height) / 12000);
    for (let i = 0; i < numBubbles; i++) {
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 1 - 0.2, // Move upwards like bubbles
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    // Premium glowing fishes
    const numFishes = Math.min(6, Math.max(3, Math.floor(width / 300)));
    for (let i = 0; i < numFishes; i++) {
      fishes.push(createFish());
    }
  }

  function createFish() {
    const isRight = Math.random() > 0.5;
    return {
      x: isRight ? -150 : width + 150,
      y: Math.random() * (height * 0.7) + height * 0.15,
      size: Math.random() * 12 + 8,
      speed: (Math.random() * 0.4 + 0.3) * (isRight ? 1 : -1),
      wobbleSpeed: Math.random() * 0.02 + 0.01,
      wobbleDistance: Math.random() * 15 + 10,
      angle: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.15 + 0.05,
      isRight: isRight
    };
  }

  function drawFish(ctx, fish) {
    ctx.save();
    // Translate to fish position including the sine wave wobble
    ctx.translate(fish.x, fish.y + Math.sin(fish.angle) * fish.wobbleDistance);
    
    // Flip horizontally if moving left
    if (!fish.isRight) {
      ctx.scale(-1, 1);
    }

    // Draw an elegant, sleek fish silhouette
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(fish.size, -fish.size / 2, fish.size * 2, 0);
    ctx.quadraticCurveTo(fish.size * 2.5, -fish.size / 4, fish.size * 3, -fish.size / 2); // Tail top
    ctx.quadraticCurveTo(fish.size * 2.2, 0, fish.size * 3, fish.size / 2); // Tail bottom
    ctx.quadraticCurveTo(fish.size * 2.5, fish.size / 4, fish.size * 2, 0);
    ctx.quadraticCurveTo(fish.size, fish.size / 2, 0, 0);
    
    // Magical glowing effect
    ctx.shadowBlur = 20;
    ctx.shadowColor = `rgba(144, 224, 239, ${fish.opacity * 3})`;
    ctx.fillStyle = `rgba(255, 255, 255, ${fish.opacity})`;
    ctx.fill();
    
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw bubbles
    bubbles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      ctx.fill();
      
      // Update position
      p.x += p.vx;
      p.y += p.vy;
      
      // Reset if off screen
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
    });

    // Draw fishes
    fishes.forEach((fish, index) => {
      drawFish(ctx, fish);
      
      fish.x += fish.speed;
      fish.angle += fish.wobbleSpeed;
      
      // Reset fish if it goes far off screen
      if ((fish.isRight && fish.x > width + 200) || (!fish.isRight && fish.x < -200)) {
        fishes[index] = createFish();
      }
    });
    
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    // Debounce resize
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(resize, 200);
  });

  resize();
  draw();
}
