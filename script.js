// ---------- routing ----------
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');

function getRoute() {
  const hash = window.location.hash.replace('#', '');
  return hash === '' ? 'home' : hash;
}

function showPage(route) {
  pages.forEach(page => {
    page.classList.toggle('active', page.id === route);
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.page === route);
  });
}

window.addEventListener('hashchange', () => showPage(getRoute()));
showPage(getRoute());

// ---------- aest clock ----------
const clockEl = document.getElementById('clock');

function tickClock() {
  const now = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Sydney',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date());
  clockEl.textContent = now;
}

tickClock();
setInterval(tickClock, 1000);

// ---------- snow effect ----------
const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');
const FLAKE_COUNT = 140;
const flakes = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createFlake() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2.2 + 0.6,
    speed: Math.random() * 0.9 + 0.35,
    drift: Math.random() * 0.6 - 0.3,
    opacity: Math.random() * 0.55 + 0.25,
  };
}

function initFlakes() {
  flakes.length = 0;
  for (let i = 0; i < FLAKE_COUNT; i++) {
    flakes.push(createFlake());
  }
}

function drawSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';

  for (const flake of flakes) {
    ctx.globalAlpha = flake.opacity;
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    ctx.fill();

    flake.y += flake.speed;
    flake.x += flake.drift;

    if (flake.y > canvas.height + 5) {
      flake.y = -5;
      flake.x = Math.random() * canvas.width;
    }
    if (flake.x > canvas.width + 5) flake.x = -5;
    if (flake.x < -5) flake.x = canvas.width + 5;
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(drawSnow);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  initFlakes();
});

resizeCanvas();
initFlakes();
drawSnow();
