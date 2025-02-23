//source:How to create an animated background - JavaScript Canvas Animated Background | HTML | CSS. #2
//https://www.youtube.com/watch?v=CvOjIKbqFjE&list=PLlqnNdO52hi-imjOrZ4hAKnat48h6Wj9e&index=5

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
let isMouseActive = false;

let mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 80) * (canvas.width / 80),
};

// Handle mouse movement efficiently
window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  isMouseActive = true;
  setTimeout(() => (isMouseActive = false), 100);
});

class Particle {
  constructor(x, y, directionX, directionY, size) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.baseSize = size; // For dynamic resizing
    this.hue = Math.random() * 360; // Dynamic colors
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = `hsl(${this.hue}, 80%, 50%)`;
    ctx.fill();
  }

  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    // Mouse interaction effect
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius) {
      this.size = Math.min(this.baseSize * 2, 10); // Grow effect
    } else {
      this.size = this.baseSize;
    }

    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 8000; // Adjusted for better performance
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 5 + 1;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let directionX = (Math.random() * 2) - 1;
    let directionY = (Math.random() * 2) - 1;
    particlesArray.push(new Particle(x, y, directionX, directionY, size));
  }
}

function connect() {
  let opacityValue;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a + 1; b < particlesArray.length; b++) {
      let distance = (particlesArray[a].x - particlesArray[b].x) ** 2 + 
                     (particlesArray[a].y - particlesArray[b].y) ** 2;
      if (distance < (canvas.width / 10) * (canvas.height / 10)) {
        opacityValue = 1 - distance / 20000;
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Creates a smooth fade effect
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  if (isMouseActive) {
    connect();
  }

  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  mouse.radius = (canvas.height / 80) * (canvas.height / 80);
  init();
});

window.addEventListener("mouseout", () => {
  mouse.x = undefined;
  mouse.y = undefined;
});

init();
animate();
