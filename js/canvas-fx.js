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

  /* --- Interactive Visual Generator for Web & App Showcases (No Static Pics) --- */
  static createAppVisual(canvas, type) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (canvas._animId) {
      cancelAnimationFrame(canvas._animId);
      canvas._animId = null;
    }

    const parent = canvas.parentElement || canvas;
    const rect = parent.getBoundingClientRect();
    const width = canvas.width = Math.max(rect.width || 640, 320);
    const height = canvas.height = Math.max(rect.height || 400, 220);

    let t = 0;
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const onMouseMove = (e) => {
      const b = canvas.getBoundingClientRect();
      mouseX = e.clientX - b.left;
      mouseY = e.clientY - b.top;
      targetTiltX = (mouseX / width - 0.5) * 0.8;
      targetTiltY = (mouseY / height - 0.5) * 0.8;
    };

    const onMouseLeave = () => {
      targetTiltX = 0;
      targetTiltY = 0;
    };

    canvas.removeEventListener('mousemove', canvas._mouseMoveHandler);
    canvas.removeEventListener('mouseleave', canvas._mouseLeaveHandler);
    canvas._mouseMoveHandler = onMouseMove;
    canvas._mouseLeaveHandler = onMouseLeave;
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    // Generate 3D Polyhedron Vertices for WebGL Mesh
    const polyVerts = [];
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVerts = [
      [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
      [0, -1,  phi], [0,  1,  phi], [0, -1, -phi], [0,  1, -phi],
      [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1]
    ];
    rawVerts.forEach(v => {
      const len = Math.hypot(v[0], v[1], v[2]);
      polyVerts.push({ x: (v[0] / len) * 90, y: (v[1] / len) * 90, z: (v[2] / len) * 90 });
    });

    function draw() {
      t += 0.02;
      currentTiltX += (targetTiltX - currentTiltX) * 0.08;
      currentTiltY += (targetTiltY - currentTiltY) * 0.08;

      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Sub-grid background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSpacing = 36;
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (type === 'webgl_mesh' || type === 'web-flagship') {
        // --- 1. 3D INTERACTIVE WEBGL WIREFRAME & SHADER SIMULATION ---
        const rotX = t * 0.6 + currentTiltY;
        const rotY = t * 0.8 + currentTiltX;
        const rotZ = t * 0.3;

        const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
        const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
        const cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);

        const proj = polyVerts.map(v => {
          let x1 = v.x * cosY + v.z * sinY;
          let z1 = -v.x * sinY + v.z * cosY;
          let y1 = v.y * cosX - z1 * sinX;
          let z2 = v.y * sinX + z1 * cosX;
          let x2 = x1 * cosZ - y1 * sinZ;
          let y2 = x1 * sinZ + y1 * cosZ;
          const fov = 320 / (320 + z2);
          return { x: cx + x2 * fov, y: cy + y2 * fov, z: z2, fov };
        });

        // Outer Kinetic Orbital Rings
        for (let r = 0; r < 3; r++) {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(t * 0.3 * (r % 2 === 0 ? 1 : -1) + currentTiltX * 0.5 + (r * Math.PI) / 3);
          ctx.beginPath();
          ctx.ellipse(0, 0, 130 + r * 22, 50 + r * 14, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 + r * 0.08})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        }

        // 3D Polyhedron Wireframe Edges
        ctx.lineWidth = 1.2;
        for (let i = 0; i < proj.length; i++) {
          for (let j = i + 1; j < proj.length; j++) {
            const dx = polyVerts[i].x - polyVerts[j].x;
            const dy = polyVerts[i].y - polyVerts[j].y;
            const dz = polyVerts[i].z - polyVerts[j].z;
            const dist = Math.hypot(dx, dy, dz);
            if (dist < 105) {
              const alpha = Math.max(0.1, 0.5 + (proj[i].z + proj[j].z) / 250);
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.7})`;
              ctx.beginPath();
              ctx.moveTo(proj[i].x, proj[i].y);
              ctx.lineTo(proj[j].x, proj[j].y);
              ctx.stroke();
            }
          }
        }

        // Glowing Vertices
        proj.forEach((p, idx) => {
          const alpha = 0.4 + (p.z + 90) / 180;
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3 * p.fov, 0, Math.PI * 2);
          ctx.fill();

          if (idx === 0 || idx === 5) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 8 + Math.sin(t * 4 + idx) * 3, 0, Math.PI * 2);
            ctx.stroke();
          }
        });

        // Scanning Laser Bar
        const scanY = (t * 70) % height;
        const scanGrad = ctx.createLinearGradient(0, scanY - 15, 0, scanY + 15);
        scanGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        scanGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.35)');
        scanGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = scanGrad;
        ctx.fillRect(0, scanY - 15, width, 30);

        // Cyberpunk HUD Overlay (Positioned below top window bar)
        ctx.font = '9.5px monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        if (width < 450) {
          ctx.fillText('[THREE.JS / GLSL]', 16, 48);
          ctx.textAlign = 'right';
          ctx.fillText('60 FPS · 48.2K V', width - 16, 48);
          ctx.textAlign = 'left';
          ctx.fillText('TTI: 740ms // WEBGL 2.0', 16, height - 12);
        } else {
          ctx.fillText('[ENGINE: THREE.JS + CUSTOM GLSL]', 18, 52);
          ctx.fillText('FPS: 60.0  TTI: 740ms  VERTICES: 48.2K', 18, 66);
          ctx.textAlign = 'right';
          ctx.fillText('RENDER: WEBGL 2.0', width - 18, 52);
          ctx.fillText('BUFFER: 14 DRAW CALLS', width - 18, 66);
          ctx.textAlign = 'left';
        }

        // Target Crosshair
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, 45, 0, Math.PI * 2);
        ctx.stroke();

      } else if (type === 'mobile_wireframe' || type === 'mobile-app') {
        // --- 2. NATIVE MOBILE APP WIREFRAME & 120HZ GESTURE WAVE ---
        const phoneW = Math.min(150, width * 0.4);
        const phoneH = Math.min(230, height * 0.65);
        const px = cx - phoneW / 2 + currentTiltX * 20;
        const py = cy - phoneH / 2 + currentTiltY * 12;

        // Mobile Device Glass Chassis
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(px, py, phoneW, phoneH, 18);
        ctx.fill();
        ctx.stroke();

        // Dynamic Island Notch
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.roundRect(px + phoneW / 2 - 18, py + 8, 36, 8, 4);
        ctx.fill();

        // 120Hz Gesture Sine Wave inside phone screen
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(px + 8, py + 24, phoneW - 16, phoneH - 36, 10);
        ctx.clip();

        // Fluid Waveforms
        for (let w = 0; w < 3; w++) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 + w * 0.25})`;
          ctx.lineWidth = 1.5;
          const waveY = py + 95 + w * 24;
          for (let x = px + 8; x <= px + phoneW - 8; x += 3) {
            const relX = (x - px) * 0.06;
            const y = waveY + Math.sin(t * 3 + relX + w) * 12;
            if (x === px + 8) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

        // Biometric Radar Rings
        const bioPulse = (t * 1.5) % 1;
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - bioPulse})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(px + phoneW / 2, py + phoneH - 35, bioPulse * 24, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(px + phoneW / 2, py + phoneH - 35, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // HUD Overlay
        ctx.font = '9.5px monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        if (width < 450) {
          ctx.fillText('[REACT NATIVE 0.76]', 16, 48);
          ctx.textAlign = 'right';
          ctx.fillText('120Hz · 3.2ms', width - 16, 48);
          ctx.textAlign = 'left';
          ctx.fillText('SYNC: OFFLINE-FIRST', 16, height - 12);
        } else {
          ctx.fillText('[RUNTIME: REACT NATIVE 0.76]', 18, 52);
          ctx.fillText('REFRESH: 120Hz  INPUT LATENCY: 3.2ms', 18, 66);
          ctx.textAlign = 'right';
          ctx.fillText('GESTURE ENGINE: REANIMATED 3', width - 18, 52);
          ctx.fillText('STATE: ZUSTAND + TANSTACK', width - 18, 66);
          ctx.textAlign = 'left';
        }

      } else if (type === 'saas_telemetry' || type === 'saas-dashboard') {
        // --- 3. ENTERPRISE SAAS TELEMETRY & MULTI-SERIES CHART ---
        const chartLeft = 35;
        const chartRight = width - 35;
        const chartBottom = height - 45;
        const chartTop = 65;
        const chartH = chartBottom - chartTop;

        // Animated Baseline Grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 3; i++) {
          const y = chartTop + (chartH / 3) * i;
          ctx.beginPath();
          ctx.moveTo(chartLeft, y);
          ctx.lineTo(chartRight, y);
          ctx.stroke();
        }

        // Two Real-Time Spline Curves
        const series = [
          { speed: 1.5, amp: 30, freq: 0.02, offset: 0, alpha: 0.8 },
          { speed: 2.2, amp: 18, freq: 0.035, offset: 2, alpha: 0.4 }
        ];

        series.forEach((s) => {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${s.alpha})`;
          ctx.lineWidth = 1.8;
          const step = 8;
          for (let x = chartLeft; x <= chartRight; x += step) {
            const progress = (x - chartLeft) * s.freq;
            const noise = Math.sin(t * s.speed + progress + s.offset) * s.amp
                        + Math.cos(t * s.speed * 0.5 + progress * 2) * 10;
            const y = chartBottom - chartH * 0.5 - noise;
            if (x === chartLeft) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();

          // Gradient fill under top curve
          if (s.alpha > 0.5) {
            ctx.lineTo(chartRight, chartBottom);
            ctx.lineTo(chartLeft, chartBottom);
            ctx.closePath();
            const fillGrad = ctx.createLinearGradient(0, chartTop, 0, chartBottom);
            fillGrad.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
            fillGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = fillGrad;
            ctx.fill();
          }
        });

        // Pulsing Live Data Node at Head
        const headX = chartRight - 15;
        const headNoise = Math.sin(t * 1.5 + (headX - chartLeft) * 0.02) * 30
                        + Math.cos(t * 0.75 + (headX - chartLeft) * 0.04) * 10;
        const headY = chartBottom - chartH * 0.5 - headNoise;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(headX, headY, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(headX, headY, 8 + Math.sin(t * 6) * 3, 0, Math.PI * 2);
        ctx.stroke();

        // HUD Overlay
        ctx.font = '9.5px monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        if (width < 450) {
          ctx.fillText('[FASTAPI + POSTGRES]', 16, 48);
          ctx.textAlign = 'right';
          ctx.fillText('P99: 16ms · 99.99%', width - 16, 48);
          ctx.textAlign = 'left';
          ctx.fillText('STREAM: LIVE // 142.8K req/s', 16, height - 12);
        } else {
          ctx.fillText('[BACKEND: FASTAPI + POSTGRES]', 18, 52);
          ctx.fillText('STREAM: LIVE (50ms)  P99 QUERY: 16ms', 18, 66);
          ctx.textAlign = 'right';
          ctx.fillText('EVENTS: 142.8K req/s', width - 18, 52);
          ctx.fillText('STATUS: 99.99% SLA // 12 NODES', width - 18, 66);
          ctx.textAlign = 'left';
        }

      } else if (type === 'commerce_stream' || type === 'headless-commerce') {
        // --- 4. HEADLESS E-COMMERCE EDGE NETWORK & ROTATING PRODUCT CUBE ---
        const cubeSize = Math.min(48, width * 0.12);
        const rotY = t * 0.8 + currentTiltX;
        const rotX = Math.PI / 6 + currentTiltY * 0.5;

        // 3D Isometric Cube Projected
        const cubeNodes = [
          [-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
          [-1,-1, 1],[1,-1, 1],[1,1, 1],[-1,1, 1]
        ].map(p => {
          let x = p[0] * cubeSize;
          let y = p[1] * cubeSize;
          let z = p[2] * cubeSize;
          let x1 = x * Math.cos(rotY) + z * Math.sin(rotY);
          let z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);
          let y1 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
          let z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
          return { x: cx + x1, y: cy + y1, z: z2 };
        });

        const cubeEdges = [
          [0,1],[1,2],[2,3],[3,0],
          [4,5],[5,6],[6,7],[7,4],
          [0,4],[1,5],[2,6],[3,7]
        ];

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 1.5;
        cubeEdges.forEach(([i, j]) => {
          ctx.beginPath();
          ctx.moveTo(cubeNodes[i].x, cubeNodes[i].y);
          ctx.lineTo(cubeNodes[j].x, cubeNodes[j].y);
          ctx.stroke();
        });

        // Global Edge Nodes routing data packets
        const edgeCount = 6;
        const dist = Math.min(130, width * 0.35);
        for (let i = 0; i < edgeCount; i++) {
          const angle = (i / edgeCount) * Math.PI * 2 + t * 0.2;
          const ex = cx + Math.cos(angle) * dist;
          const ey = cy + Math.sin(angle) * (dist * 0.55);

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(ex, ey);
          ctx.stroke();

          // Packet packet moving toward center
          const packetProgress = (t * 1.5 + i * 0.3) % 1;
          const px = ex + (cx - ex) * packetProgress;
          const py = ey + (cy - ey) * packetProgress;
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.beginPath();
          ctx.arc(ex, ey, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // HUD Overlay
        ctx.font = '9.5px monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        if (width < 450) {
          ctx.fillText('[SHOPIFY PLUS + VERCEL]', 16, 48);
          ctx.textAlign = 'right';
          ctx.fillText('99.8% HIT · 28ms', width - 16, 48);
          ctx.textAlign = 'left';
          ctx.fillText('CHECKOUT: 0.42s // 42 EDGES', 16, height - 12);
        } else {
          ctx.fillText('[STOREFRONT: SHOPIFY PLUS + SANITY]', 18, 52);
          ctx.fillText('GLOBAL CACHE: 99.8% HIT  TTFB: 28ms', 18, 66);
          ctx.textAlign = 'right';
          ctx.fillText('CHECKOUT: SUB-SECOND (0.42s)', width - 18, 52);
          ctx.fillText('EDGE ROUTING: 42 LOCATIONS', width - 18, 66);
          ctx.textAlign = 'left';
        }
      }

      canvas._animId = requestAnimationFrame(draw);
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

/* ==========================================================================
   ELVA LABS SPRING SOLVER ENGINE
   Physics-based spring animation controller for smooth liquid responses
   ========================================================================== */
class SpringSolver {
  constructor(config = {}) {
    this.listeners = [];
    this.currentValue = config.fromValue ?? 0;
    this.targetValue = config.toValue ?? 0;
    this.currentVelocity = config.initialVelocity ?? 0;
    this.stiffness = config.stiffness ?? 100;
    this.damping = config.damping ?? 12;
    this.mass = config.mass ?? 1;
    this.isAnimating = false;
    this.animFrameId = null;
    this.lastTime = performance.now();
  }

  updateConfig(cfg) {
    if (cfg.toValue !== undefined) this.targetValue = cfg.toValue;
    if (cfg.fromValue !== undefined) this.currentValue = cfg.fromValue;
    if (cfg.stiffness !== undefined) this.stiffness = cfg.stiffness;
    if (cfg.damping !== undefined) this.damping = cfg.damping;
    if (cfg.mass !== undefined) this.mass = cfg.mass;
    return this;
  }

  onUpdate(fn) {
    this.listeners.push(fn);
    return this;
  }

  start() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.lastTime = performance.now();
      this.step();
    }
    return this;
  }

  stop() {
    this.isAnimating = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    return this;
  }

  step() {
    if (!this.isAnimating) return;
    const now = performance.now();
    let dt = (now - this.lastTime) / 1000;
    this.lastTime = now;
    if (dt > 0.064) dt = 0.064; // Clamp large frame jumps

    const displacement = this.currentValue - this.targetValue;
    const springForce = -this.stiffness * displacement;
    const dampingForce = -this.damping * this.currentVelocity;
    const acceleration = (springForce + dampingForce) / this.mass;

    this.currentVelocity += acceleration * dt;
    this.currentValue += this.currentVelocity * dt;

    this.listeners.forEach(fn => fn(this.currentValue, this.currentVelocity));

    // Check rest threshold
    if (Math.abs(displacement) < 0.001 && Math.abs(this.currentVelocity) < 0.001) {
      this.currentValue = this.targetValue;
      this.currentVelocity = 0;
      this.listeners.forEach(fn => fn(this.currentValue, 0));
      this.stop();
      return;
    }

    this.animFrameId = requestAnimationFrame(() => this.step());
  }
}

/* ==========================================================================
   ELVA LABS THREE.JS LIQUID METABALL & CHROMATIC DISPERSION WEBGL SCENE
   60FPS GPU-accelerated shader fluid with fresnel reflection & mouse inertia
   ========================================================================== */
class ElvaThreeMetaballsEngine {
  constructor(containerId = 'threeWebglContainer') {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = containerId;
      document.body.insertBefore(this.container, document.body.firstChild);
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.mainMesh = null;
    this.orbitMeshes = [];
    this.time = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.scrollProgress = 0;

    this.springTiltX = new SpringSolver({ stiffness: 70, damping: 14 });
    this.springTiltY = new SpringSolver({ stiffness: 70, damping: 14 });
    this.springScale = new SpringSolver({ fromValue: 0.8, toValue: 1, stiffness: 45, damping: 12 });

    this.init();
  }

  init() {
    if (typeof THREE === 'undefined') {
      console.log('Three.js not yet loaded, waiting for script ready');
      window.addEventListener('load', () => this.setupThree());
      return;
    }
    this.setupThree();
  }

  setupThree() {
    if (typeof THREE === 'undefined' || this.renderer) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 5.5);

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.container.appendChild(this.renderer.domElement);

    // Liquid Metaball Custom Shader Material with Chromatic Dispersion
    const metaballVertexShader = `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      uniform float uTime;
      uniform vec2 uMouse;

      // Simplex-style 3D noise for organic liquid deformation
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

      float snoise(vec3 v){
        const vec2  C = vec2(1.0/6.0, 1.0/3.0);
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 = v - i + dot(i, C.xxx) ;
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );
        vec3 x1 = x0 - i1 + 1.0 * C.xxx;
        vec3 x2 = x0 - i2 + 2.0 * C.xxx;
        vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
        i = mod(i, 289.0 );
        vec4 p = permute( permute( permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
      }

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        
        // Fluid organic pulse wave
        float noise = snoise(position * 1.35 + vec3(uTime * 0.45, uTime * 0.3, uTime * 0.25));
        vec3 displaced = position + normal * (noise * 0.28);

        vec4 worldPos = modelMatrix * vec4(displaced, 1.0);
        vWorldPosition = worldPos.xyz;
        vec4 mvPosition = viewMatrix * worldPos;
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const metaballFragmentShader = `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uScrollProgress;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);

        // Fresnel dispersion
        float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.2);

        // Chromatic dispersion base colors (Elva Cyan -> Deep Indigo/Purple)
        vec3 cyanGlow = vec3(0.035, 0.537, 0.847);   // #0989d8
        vec3 purpleGlow = vec3(0.521, 0.051, 0.933); // #850dee
        vec3 whiteGlow = vec3(1.0, 1.0, 1.0);

        // Angle-based iridescent shift
        float angle = dot(normal, vec3(0.0, 1.0, 0.5));
        vec3 iridescence = mix(cyanGlow, purpleGlow, sin(angle * 2.5 + uTime * 0.6) * 0.5 + 0.5);

        // Subtle specular highlight
        vec3 lightDir = normalize(vec3(uMouse.x * 2.0, uMouse.y * 2.0 + 1.0, 2.5));
        vec3 halfVector = normalize(lightDir + viewDir);
        float specular = pow(max(dot(normal, halfVector), 0.0), 64.0);

        // Blend colors
        vec3 finalColor = mix(iridescence * 0.25, whiteGlow, fresnel * 0.7);
        finalColor += specular * 0.45 * whiteGlow;
        finalColor += fresnel * iridescence * 0.85;

        // Alpha transparency: Higher at fresnel rims
        float alpha = clamp(fresnel * 0.75 + specular * 0.35 + 0.04, 0.0, 0.88);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    this.mainUniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScrollProgress: { value: 0 }
    };

    const mainGeo = new THREE.SphereGeometry(1.65, 64, 64);
    const mainMat = new THREE.ShaderMaterial({
      vertexShader: metaballVertexShader,
      fragmentShader: metaballFragmentShader,
      uniforms: this.mainUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    this.mainMesh = new THREE.Mesh(mainGeo, mainMat);
    this.mainMesh.position.set(0.8, -0.2, 0);
    this.scene.add(this.mainMesh);

    // Orbiting Satellites / Gravity Spheres
    const orbitCount = 4;
    for (let i = 0; i < orbitCount; i++) {
      const sGeo = new THREE.SphereGeometry(0.35 + i * 0.12, 32, 32);
      const sMat = new THREE.ShaderMaterial({
        vertexShader: metaballVertexShader,
        fragmentShader: metaballFragmentShader,
        uniforms: this.mainUniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      const sMesh = new THREE.Mesh(sGeo, sMat);
      sMesh.userData = {
        radius: 2.2 + i * 0.6,
        speed: 0.45 / (i + 1),
        phase: (i * Math.PI * 2) / orbitCount,
        verticalPhase: i * 1.5
      };
      this.scene.add(sMesh);
      this.orbitMeshes.push(sMesh);
    }

    // Setup mouse & resize listeners
    window.addEventListener('resize', () => this.onResize());
    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      this.targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      this.springTiltX.updateConfig({ toValue: this.targetMouseX }).start();
      this.springTiltY.updateConfig({ toValue: this.targetMouseY }).start();
    });

    window.addEventListener('scroll', () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    });

    this.animate();
  }

  onResize() {
    if (!this.renderer || !this.camera) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  }

  animate() {
    this.time += 0.018;

    if (this.mainUniforms) {
      this.mainUniforms.uTime.value = this.time;
      this.mainUniforms.uMouse.value.set(this.springTiltX.currentValue, this.springTiltY.currentValue);
      this.mainUniforms.uScrollProgress.value = this.scrollProgress;
    }

    if (this.mainMesh) {
      // Rotation and float motion
      this.mainMesh.rotation.y = this.time * 0.2 + this.springTiltX.currentValue * 0.5;
      this.mainMesh.rotation.x = this.time * 0.15 + this.springTiltY.currentValue * 0.4;
      this.mainMesh.position.y = Math.sin(this.time * 0.8) * 0.15 - this.scrollProgress * 2.5;
      this.mainMesh.position.x = 0.6 + Math.cos(this.time * 0.5) * 0.1 + this.springTiltX.currentValue * 0.35;
    }

    // Orbiting gravity spheres
    this.orbitMeshes.forEach((mesh) => {
      const u = mesh.userData;
      const angle = this.time * u.speed + u.phase + this.springTiltX.currentValue * 0.4;
      const orbitY = Math.sin(this.time * u.speed * 1.5 + u.verticalPhase) * 0.8;
      
      mesh.position.x = this.mainMesh.position.x + Math.cos(angle) * u.radius;
      mesh.position.y = this.mainMesh.position.y + orbitY;
      mesh.position.z = Math.sin(angle) * (u.radius * 0.7);
    });

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }

    requestAnimationFrame(() => this.animate());
  }
}

window.AmbientCanvasEngine = AmbientCanvasEngine;
window.ProceduralCanvasArt = ProceduralCanvasArt;
window.AmbientSoundSystem = AmbientSoundSystem;
window.SpringSolver = SpringSolver;
window.ElvaThreeMetaballsEngine = ElvaThreeMetaballsEngine;
