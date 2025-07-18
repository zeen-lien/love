// Form logic
const nameForm = document.getElementById('nameForm');
if (nameForm) {
  nameForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const nickname = document.getElementById('nickname').value;
    localStorage.setItem('nickname', nickname);
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.currentTime = 0;
    bgMusic.play();
    setTimeout(function() {
      window.location.href = 'next.html';
    }, 800); // kasih jeda biar musik sempat play
  });
}

// Animasi bintang-bintang warna-warni
const canvas = document.getElementById('loveCanvas');
const ctx = canvas.getContext('2d');

// Helper: cek halaman
const isLanding = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '';
const isNext = window.location.pathname.endsWith('next.html');

// --- ANIMASI NEXT: BOKEH BLUR + PARTICLE GLOW ---
let bokehCircles = [];
let glowParticles = [];
function createBokehCircle() {
  const colors = [
    'rgba(255,182,213,0.18)', 'rgba(182,224,254,0.16)', 'rgba(247,200,255,0.14)', 'rgba(255,246,180,0.13)', 'rgba(193,255,215,0.13)', 'rgba(255,255,255,0.12)'
  ];
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 40 + Math.random() * 80,
    color: colors[Math.floor(Math.random() * colors.length)],
    alpha: 0.18 + Math.random() * 0.18,
    vx: (Math.random() - 0.5) * 0.12,
    vy: (Math.random() - 0.5) * 0.12,
    life: 200 + Math.random() * 200,
    age: 0
  };
}
function drawBokehCircle(c) {
  ctx.save();
  ctx.globalAlpha = c.alpha * (1 - c.age / c.life);
  ctx.beginPath();
  ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
  ctx.fillStyle = c.color;
  ctx.filter = 'blur(8px)';
  ctx.fill();
  ctx.restore();
}
function animateBokehGlow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Bokeh
  for (let i = 0; i < bokehCircles.length; i++) {
    let c = bokehCircles[i];
    drawBokehCircle(c);
    c.x += c.vx;
    c.y += c.vy;
    c.age++;
    if (c.x < -c.r) c.x = canvas.width + c.r;
    if (c.x > canvas.width + c.r) c.x = -c.r;
    if (c.y < -c.r) c.y = canvas.height + c.r;
    if (c.y > canvas.height + c.r) c.y = -c.r;
  }
  // Hapus bokeh yang sudah tua, tambah baru
  bokehCircles = bokehCircles.filter(c => c.age < c.life);
  while (bokehCircles.length < 18) bokehCircles.push(createBokehCircle());
  // Particle glow
  for (let i = 0; i < glowParticles.length; i++) {
    let p = glowParticles[i];
    drawGlowParticle(p);
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  }
  if (isNext) requestAnimationFrame(animateBokehGlow);
}

// Fireworks kata romantis unik setiap klik
let usedWords = [];
function getUniqueRomanticWord() {
  const romanticWords = [
    'I love you', 'I miss you', 'Sayang', 'Kamu spesial', 'My everything', 'Selalu di hati', 'Cinta', 'Rindu', 'Peluk', 'Kamu lucu', 'Sweetheart', 'Dear', 'Honey', 'My love', 'Forever', 'Always', '❤️', '💖', '💘', '💕'
  ];
  if (usedWords.length === romanticWords.length) usedWords = [];
  let word;
  do {
    word = romanticWords[Math.floor(Math.random() * romanticWords.length)];
  } while (usedWords.includes(word));
  usedWords.push(word);
  return word;
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Recreate bokeh and particles on resize
  if (isNext) {
    bokehCircles = [];
    for (let i = 0; i < 18; i++) bokehCircles.push(createBokehCircle());
    glowParticles = [];
    for (let i = 0; i < 48; i++) glowParticles.push(createGlowParticle());
  }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

if (isNext) {
  bokehCircles = [];
  for (let i = 0; i < 18; i++) bokehCircles.push(createBokehCircle());
  glowParticles = [];
  for (let i = 0; i < 48; i++) glowParticles.push(createGlowParticle());
  animateBokehGlow();
} 

// Tambahkan fungsi createGlowParticle dan drawGlowParticle
function createGlowParticle() {
  const neonColors = [
    '#39ff14', '#00fff7', '#ff00c8', '#fff700', '#ff5e00', '#00ffea', '#ff61a6', '#fff'
  ];
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 2 + Math.random() * 5,
    color: neonColors[Math.floor(Math.random() * neonColors.length)],
    alpha: 0.18 + Math.random() * 0.32,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3
  };
}
function drawGlowParticle(p) {
  ctx.save();
  ctx.globalAlpha = p.alpha;
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
  ctx.fillStyle = p.color;
  ctx.shadowColor = p.color;
  ctx.shadowBlur = 18;
  ctx.fill();
  ctx.restore();
} 