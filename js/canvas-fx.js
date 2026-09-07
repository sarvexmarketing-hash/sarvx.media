/* ==========================================================================
   SARVX.MEDIA — PROCEDURAL CANVAS VISUALS, SHADERS & SOUND SYNTHESIZER
   60FPS GPU-accelerated interactive background and visual choreography
   ========================================================================== */

class AmbientCanvasEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.width = 0;
    this.height = 0;
    this.particles = [];
    this.particleCount = 55;
    this.mouseX = 0.5;
    this.mouseY = 0.5;
    this.targetMouseX = 0.5;
    this.targetMouseY = 0.5;
    this.scrollProgress = 0;
    this.time = 0;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = e.clientX / window.innerWidth;
      this.targetMouseY = e.clientY / window.innerHeight;
    });

    // Create particles
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.35 + 0.1,
        phase: Math.random() * Math.PI * 2
      });
    }

    this.render();
  }

  resize() {
    this.width = Math.max(window.innerWidth || 1920, 320);
    this.height = Math.max(window.innerHeight || 1080, 320);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  setScrollProgress(p) {
    this.scrollProgress = p;
  }

  render() {
    this.time += 0.015;
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Subtle dark radial gradient follows mouse
    const gradX = this.mouseX * this.width;
    const gradY = this.mouseY * this.height;
    const rOuter = Math.max(this.width * 0.6, 50);
    const radial = this.ctx.createRadialGradient(gradX, gradY, 10, gradX, gradY, rOuter);
    radial.addColorStop(0, 'rgba(255, 255, 255, 0.025)');
    radial.addColorStop(0.5, 'rgba(255, 255, 255, 0.008)');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
    this.ctx.fillStyle = radial;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Dynamic floating constellation particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx + Math.sin(this.time + p.phase) * 0.2;
      p.y += p.vy + Math.cos(this.time + p.phase) * 0.2;

      // Wrap boundaries
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      // Distance to mouse
      const dx = p.x - gradX;
      const dy = p.y - gradY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const mouseBoost = Math.max(0, 1 - dist / 350) * 0.3;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha + mouseBoost})`;
      this.ctx.fill();

      // Connect nearby particles with subtle lines
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const pjdx = p.x - p2.x;
        const pjdy = p.y - p2.y;
        const pdist = Math.sqrt(pjdx * pjdx + pjdy * pjdy);

        if (pdist < 120) {
          const lineAlpha = (1 - pdist / 120) * 0.1;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.render());
  }
}

/* --- Procedural Canvas Artworks for 1/6 Stages & Case Studies --- */
class ProceduralCanvasArt {
  static createStageVisual(canvas, type) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = canvas.width = Math.max(canvas.parentElement ? canvas.parentElement.clientWidth || 600 : 600, 300);
    let height = canvas.height = Math.max(canvas.parentElement ? canvas.parentElement.clientHeight || 450 : 450, 200);
    let t = 0;

    function draw() {
      t += 0.02;
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      if (type === 'neural_grid') {
        // Futuristic isometric grid with pulsing nodes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1;
        const cols = 12;
        const rows = 9;
        const stepX = width / cols;
        const stepY = height / rows;

        for (let x = 0; x <= width; x += stepX) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y <= height; y += stepY) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Pulsing core beacon
        const pulse = (Math.sin(t * 2) + 1) * 0.5;
        const rGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 140);
        rGrad.addColorStop(0, `rgba(255, 255, 255, ${0.4 * pulse + 0.3})`);
        rGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
        rGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = rGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, 140, 0, Math.PI * 2);
        ctx.fill();

        // High-tech target crosshair
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, 45, 0, Math.PI * 2);
        ctx.stroke();

      } else if (type === 'fluid_geometry') {
        // Kinetic parametric morphing polygons
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1.2;
        const rings = 6;
        for (let r = 1; r <= rings; r++) {
          ctx.beginPath();
          const rad = r * 28 + Math.sin(t + r) * 12;
          const points = 7;
          for (let p = 0; p <= points; p++) {
            const angle = (p / points) * Math.PI * 2 + (r % 2 === 0 ? t * 0.5 : -t * 0.5);
            const px = cx + Math.cos(angle) * rad;
            const py = cy + Math.sin(angle) * rad;
            if (p === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }

      } else if (type === 'film_strip') {
        // Dynamic horizontal film raster scans
        const barCount = 14;
        const barW = width / barCount;
        for (let i = 0; i < barCount; i++) {
          const h = (Math.sin(t * 2 + i * 0.5) * 0.5 + 0.5) * (height * 0.7) + 20;
          const alpha = 0.15 + (i % 3 === 0 ? 0.35 : 0);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fillRect(i * barW + 4, (height - h) / 2, barW - 8, h);
        }

      } else if (type === 'network_mesh') {
        // High density geometric node mesh
        const nodes = 18;
        const pts = [];
        for (let i = 0; i < nodes; i++) {
          const a = (i / nodes) * Math.PI * 2 + t * 0.3;
          const rad = (i % 2 === 0 ? 110 : 70) + Math.sin(t * 1.5 + i) * 15;
          pts.push({ x: cx + Math.cos(a) * rad, y: cy + Math.sin(a) * rad });
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 0.8;
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            if ((i + j) % 3 === 0) {
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.stroke();
            }
          }
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(pts[i].x, pts[i].y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

      } else if (type === 'data_stream') {
        // Vertical cascading data luminescence
        const cols = 20;
        const step = width / cols;
        for (let c = 0; c < cols; c++) {
          const speed = (c % 4 + 1) * 1.2;
          const yPos = (t * 60 * speed + c * 40) % height;
          const len = 70 + (c % 3) * 30;
          const grad = ctx.createLinearGradient(c * step, yPos - len, c * step, yPos);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grad.addColorStop(1, 'rgba(255, 255, 255, 0.7)');
          ctx.fillStyle = grad;
          ctx.fillRect(c * step, yPos - len, 2, len);
        }

      } else if (type === 'orbital_rings') {
        // 3D Gyroscope orbital ellipse rings
        ctx.lineWidth = 1.4;
        for (let i = 0; i < 4; i++) {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(t * 0.4 * (i % 2 === 0 ? 1 : -1) + (i * Math.PI) / 4);
          ctx.beginPath();
          ctx.ellipse(0, 0, 130 - i * 15, 45 + i * 10, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 + i * 0.15})`;
          ctx.stroke();
          ctx.restore();
        }
      }

      requestAnimationFrame(draw);
    }

    draw();
  }
}

/* --- Web Audio API Ambient Sound Synthesizer --- */
class AmbientSoundSystem {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.oscillators = [];
  }

  initAudio() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  toggle() {
    this.initAudio();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Cinematic deep chord frequencies: C2, G2, D3, A3
    const freqs = [65.41, 98.00, 146.83, 220.00];

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320 + idx * 80, this.ctx.currentTime);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.035 / (idx + 1), this.ctx.currentTime + 3);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.oscillators.push({ osc, gain });
    });
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    this.oscillators.forEach(({ osc, gain }) => {
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        try { osc.stop(); } catch(e) {}
      }, 900);
    });
    this.oscillators = [];
  }

  playMicroClick() {
    if (!this.isPlaying || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch(e) {}
  }
}

window.AmbientCanvasEngine = AmbientCanvasEngine;
window.ProceduralCanvasArt = ProceduralCanvasArt;
window.AmbientSoundSystem = AmbientSoundSystem;
