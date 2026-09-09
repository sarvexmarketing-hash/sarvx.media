/* ==========================================================================
   SARVX TECH — GSAP SCROLLTRIGGER & LENIS CHOREOGRAPHY ENGINE
   ========================================================================== */

class SarvxAnimationEngine {
  constructor() {
    this.lenis = null;
    this.soundSys = new AmbientSoundSystem();
    this.init();
  }

  init() {
    try { this.initLenis(); } catch(e) { console.warn('initLenis error:', e); }
    try { this.initCursor(); } catch(e) { console.warn('initCursor error:', e); }
    try { this.initKineticTextTokens(); } catch(e) { console.warn('initKineticTextTokens error:', e); }
    try { this.initHeroChoreography(); } catch(e) { console.warn('initHero error:', e); }
    try { this.initIntroChoreography(); } catch(e) { console.warn('initIntro error:', e); }
    try { this.initAboutParallax(); } catch(e) { console.warn('initAbout error:', e); }
    try { this.initProblemNoiseScrub(); } catch(e) { console.warn('initProblem error:', e); }
    try { this.initSignatureSystemPinned(); } catch(e) { console.warn('initSignature error:', e); }
    try { this.initElvaProgressRing(); } catch(e) { console.warn('initElvaProgressRing error:', e); }
    try { this.initServicesAccordions(); } catch(e) { console.warn('initServices error:', e); }
    try { this.initElvaFeatureHoverTracking(); } catch(e) { console.warn('initElvaFeatureHoverTracking error:', e); }
    try { this.initPerformanceCounters(); } catch(e) { console.warn('initPerformance error:', e); }
    try { this.initWebBrowser3D(); } catch(e) { console.warn('initWebBrowser error:', e); }
    try { this.initCaseStudiesStacking(); } catch(e) { console.warn('initCaseStudies error:', e); }
    try { this.initResultsMatrix(); } catch(e) { console.warn('initResults error:', e); }
    try { this.initEmotionalOutro(); } catch(e) { console.warn('initEmotional error:', e); }
    try { this.initFinalCTA(); } catch(e) { console.warn('initFinalCTA error:', e); }
    try { this.initMagneticButtons(); } catch(e) { console.warn('initMagneticButtons error:', e); }
    try { this.initHeaderScroll(); } catch(e) { console.warn('initHeaderScroll error:', e); }
    try { this.initSoundToggle(); } catch(e) { console.warn('initSoundToggle error:', e); }

    // Refresh ScrollTrigger after dynamic modules render
    setTimeout(() => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 250);
  }

  /* --- 0. Elva Labs Kinetic Liquid Text Tokenizer (Word-by-Word Blur Reveal) --- */
  initKineticTextTokens() {
    // Select elements to tokenize with deblurring words
    const targetSelectors = [
      '.about-lead',
      '.about-subtext',
      '.section-label',
      '.funnel-stage-headline',
      '.funnel-stage-desc',
      '.modal-heading',
      '.modal-subheading'
    ];

    targetSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (el.dataset.tokenized) return;
        el.dataset.tokenized = 'true';

        const rawText = el.innerText || el.textContent;
        const words = rawText.split(/\s+/).filter(w => w.length > 0);
        if (!words.length) return;

        el.innerHTML = '';
        words.forEach((word, idx) => {
          const span = document.createElement('span');
          span.className = 'elva-token';
          span.textContent = word + (idx < words.length - 1 ? ' ' : '');
          span.style.transitionDelay = `${Math.min(idx * 0.035, 0.6)}s`;
          el.appendChild(span);
        });

        // Setup Intersection Observer or ScrollTrigger for deblurring
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              el.querySelectorAll('.elva-token').forEach(token => token.classList.add('revealed'));
              observer.unobserve(el);
            }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        observer.observe(el);
      });
    });
  }

  /* --- 1. Lenis + GSAP ScrollTrigger Integration --- */
  initLenis() {
    if (typeof Lenis === 'undefined') {
      console.warn('Lenis library not detected, continuing with native smooth scroll');
      return;
    }

    this.lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false
    });

    // Connect Lenis to ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      this.lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        this.lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }

    function raf(time) {
      if (window.sarvxEngine && window.sarvxEngine.lenis) {
        window.sarvxEngine.lenis.raf(time);
      }
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  /* --- 2. Custom Magnetic Cursor Engine --- */
  initCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    if (!cursor || !follower) return;

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.05, ease: "power2.out" });
    });

    gsap.ticker.add(() => {
      posX += (mouseX - posX) * 0.15;
      posY += (mouseY - posY) * 0.15;
      follower.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%)`;
    });

    // Interactive Hover States
    document.querySelectorAll('a, button, .interactive-hover').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
        gsap.to(follower, { scale: 1.4, borderColor: 'rgba(255,255,255,0.6)', duration: 0.3 });
        this.soundSys.playMicroClick();
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
        gsap.to(follower, { scale: 1, borderColor: 'rgba(255,255,255,0.25)', duration: 0.3 });
      });
    });

    // Project Case Study Hover States
    document.querySelectorAll('.case-study-card').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering-project');
        gsap.to(follower, { opacity: 0, duration: 0.2 });
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering-project');
        gsap.to(follower, { opacity: 1, duration: 0.2 });
      });
    });
  }

  /* --- 3. Hero Section Pinned Scrubbed Progression --- */
  initHeroChoreography() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const hero = document.querySelector('.hero-section');
    const backdrop = document.querySelector('.hero-visual-layer');
    const phrases = document.querySelectorAll('.hero-phrase');
    if (!hero || phrases.length < 4) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "+=2800",
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    // Background visual zoom & brightness shift
    if (backdrop) {
      tl.to(backdrop, { scale: 1.22, filter: "brightness(0.35) contrast(1.2)", ease: "none" }, 0);
    }

    // Step 0: "BRANDS DESERVE MORE THAN ATTENTION."
    tl.set(phrases[0], { opacity: 1, y: 0, scale: 1 })
      .to(phrases[0], { opacity: 0, y: -40, scale: 0.95, duration: 1 }, 1)

      // Step 1: "THEY DESERVE IMPACT."
      .fromTo(phrases[1], { opacity: 0, y: 50, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 1 }, 1.2)
      .to(phrases[1], { opacity: 0, y: -40, scale: 0.95, duration: 1 }, 2.4)

      // Step 2: "THEY DESERVE TO MOVE."
      .fromTo(phrases[2], { opacity: 0, y: 50, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 1 }, 2.6)
      .to(phrases[2], { opacity: 0, y: -40, scale: 0.95, duration: 1 }, 3.8)

      // Step 3: "SARVX TECH"
      .fromTo(phrases[3], { opacity: 0, y: 60, scale: 0.88, letterSpacing: '0.1em' }, { opacity: 1, y: 0, scale: 1, letterSpacing: '-0.04em', duration: 1.2 }, 4.0);
  }

  /* --- 4. Intro Pinned Cinematic Narrative Sequence (§20) --- */
  initIntroChoreography() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const sec = document.querySelector('.pinned-intro-section');
    const statements = document.querySelectorAll('.intro-statement');
    if (!sec || statements.length < 6) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sec,
        start: "top top",
        end: "+=3200",
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    // 0: WE DON'T DO MARKETING.
    tl.set(statements[0], { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' })
      .to(statements[0], { opacity: 0, y: -45, scale: 0.94, filter: 'blur(10px)', duration: 1 }, 1)

      // 1: WE CREATE MOVEMENT.
      .fromTo(statements[1], { opacity: 0, y: 55, scale: 0.92, filter: 'blur(10px)' }, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1 }, 1.3)
      .to(statements[1], { opacity: 0, y: -45, scale: 0.94, filter: 'blur(10px)', duration: 1 }, 2.5)

      // 2: ATTENTION.
      .fromTo(statements[2], { opacity: 0, y: 55, scale: 0.92, filter: 'blur(10px)' }, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1 }, 2.8)
      .to(statements[2], { opacity: 0, y: -45, scale: 0.94, filter: 'blur(10px)', duration: 1 }, 4.0)

      // 3: DESIRE.
      .fromTo(statements[3], { opacity: 0, y: 55, scale: 0.92, filter: 'blur(10px)' }, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1 }, 4.3)
      .to(statements[3], { opacity: 0, y: -45, scale: 0.94, filter: 'blur(10px)', duration: 1 }, 5.5)

      // 4: ACTION.
      .fromTo(statements[4], { opacity: 0, y: 55, scale: 0.92, filter: 'blur(10px)' }, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1 }, 5.8)
      .to(statements[4], { opacity: 0, y: -45, scale: 0.94, filter: 'blur(10px)', duration: 1 }, 7.0)

      // 5: SARVX.
      .fromTo(statements[5], { opacity: 0, y: 65, scale: 0.88, filter: 'blur(14px)' }, { opacity: 1, y: 0, scale: 1.05, filter: 'blur(0px)', duration: 1.2 }, 7.3);
  }

  /* --- 5. Editorial About Multi-Speed Parallax --- */
  initAboutParallax() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const tokens = document.querySelectorAll('.parallax-token');
    const aboutSec = document.querySelector('.about-section');
    if (!tokens.length || !aboutSec) return;

    const speeds = [-80, -160, -240];

    tokens.forEach((token, idx) => {
      gsap.to(token, {
        y: speeds[idx % speeds.length],
        ease: "none",
        scrollTrigger: {
          trigger: aboutSec,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2
        }
      });
    });
  }

  /* --- 6. The Problem Overlapping ATTENTION Drift --- */
  initProblemNoiseScrub() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const sec = document.querySelector('.problem-section');
    const duplicates = document.querySelectorAll('.attention-duplicate');
    const resolution = document.querySelector('.problem-resolution');
    if (!sec || !duplicates.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sec,
        start: "top top",
        end: "+=1800",
        scrub: 1,
        pin: true
      }
    });

    // Expand attention clutter in different angles
    const coords = [
      { x: -280, y: -120, rot: -8, alpha: 0.3 },
      { x: 320, y: -80, rot: 12, alpha: 0.25 },
      { x: -200, y: 140, rot: 6, alpha: 0.35 },
      { x: 260, y: 160, rot: -14, alpha: 0.2 },
      { x: 0, y: -190, rot: 3, alpha: 0.4 }
    ];

    duplicates.forEach((el, idx) => {
      const c = coords[idx % coords.length];
      tl.to(el, { x: c.x, y: c.y, rotation: c.rot, color: `rgba(255,255,255,${c.alpha})`, duration: 2 }, 0);
    });

    // Collapse noise into dark void and reveal statement
    tl.to(duplicates, { opacity: 0, scale: 0.5, filter: "blur(12px)", duration: 1.5 }, 2.5);
    if (resolution) {
      tl.to(resolution, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, 3.2);
    }
  }

  /* --- 7. Signature 1/6 Interactive Pinned System with Elva Circular Ring --- */
  initSignatureSystemPinned() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const sec = document.querySelector('.signature-system-section');
    const currentNum = document.querySelector('.system-counter-current');
    const stageItems = document.querySelectorAll('.system-stage-item');
    const visualFrames = document.querySelectorAll('.system-visual-frame');
    const progressDots = document.querySelectorAll('.system-progress-dot');
    const circleBar = document.querySelector('.elva-progress-circle-bar');
    const stepBadge = document.querySelector('.elva-step-badge');
    if (!sec || !stageItems.length) return;

    const stageCount = stageItems.length;
    const totalDash = 113.1;

    ScrollTrigger.create({
      trigger: sec,
      start: "top top",
      end: `+=${stageCount * 850}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const activeIdx = Math.min(stageCount - 1, Math.floor(progress * stageCount));

        // Update Circular SVG Progress Ring
        if (circleBar) {
          const offset = totalDash * (1 - progress);
          circleBar.style.strokeDashoffset = `${offset}`;
        }

        if (stepBadge) {
          stepBadge.textContent = `0${activeIdx + 1} / 0${stageCount}`;
        }

        if (currentNum) {
          const numStr = String(activeIdx + 1).padStart(2, '0');
          currentNum.textContent = numStr;
        }

        stageItems.forEach((item, idx) => {
          if (idx === activeIdx) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });

        visualFrames.forEach((frame, idx) => {
          if (idx === activeIdx) {
            frame.classList.add('active');
          } else {
            frame.classList.remove('active');
          }
        });

        progressDots.forEach((dot, idx) => {
          if (idx === activeIdx) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    });
  }

  /* --- 7b. Elva Circular Progress Ring Initialization Helper --- */
  initElvaProgressRing() {
    const ring = document.querySelector('.elva-progress-circle-bar');
    if (ring) {
      ring.style.strokeDasharray = '144.51';
      ring.style.strokeDashoffset = '144.51';
    }
  }

  /* --- 8. Services Accordions --- */
  initServicesAccordions() {
    const items = document.querySelectorAll('.service-row-item');
    items.forEach((item) => {
      item.addEventListener('click', () => {
        const body = item.querySelector('.service-drawer-body');
        if (!body) return;
        const isClosed = body.style.display === 'none' || !body.style.display;
        body.style.display = isClosed ? 'grid' : 'none';
      });
    });
  }

  /* --- 8b. Elva Spring Physics Floating Device Hover Follower --- */
  initElvaFeatureHoverTracking() {
    const featureRows = document.querySelectorAll('.service-row-item, .client-brand-card, .pillar-card');
    if (!featureRows.length || typeof SpringSolver === 'undefined') return;

    featureRows.forEach(row => {
      const springX = new SpringSolver({ stiffness: 280, damping: 22 });
      const springY = new SpringSolver({ stiffness: 280, damping: 22 });

      row.addEventListener('mousemove', (e) => {
        const rect = row.getBoundingClientRect();
        const relX = (e.clientX - rect.left - rect.width / 2) * 0.15;
        const relY = (e.clientY - rect.top - rect.height / 2) * 0.15;

        springX.updateConfig({ toValue: relX }).start();
        springY.updateConfig({ toValue: relY }).start();
        
        row.style.transform = `translate3d(${springX.currentValue}px, ${springY.currentValue}px, 0)`;
      });

      row.addEventListener('mouseleave', () => {
        springX.updateConfig({ toValue: 0 }).start();
        springY.updateConfig({ toValue: 0 }).start();
        row.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }


  /* --- 9. Performance Metrics Counter Animation --- */
  initPerformanceCounters() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const cards = document.querySelectorAll('.metric-data-card');
    cards.forEach((card) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%"
        }
      });
    });
  }

  /* --- 10. Web Experience 3D Perspective Rotation --- */
  initWebBrowser3D() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const mockup = document.querySelector('.browser-mockup');
    const sec = document.querySelector('.web-experience-section');
    if (!mockup || !sec) return;

    gsap.to(mockup, {
      rotateX: 0,
      scale: 1.02,
      ease: "none",
      scrollTrigger: {
        trigger: sec,
        start: "top 70%",
        end: "center center",
        scrub: 1
      }
    });
  }

  /* --- 11. Stacking Case Studies --- */
  initCaseStudiesStacking() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const cards = document.querySelectorAll('.case-study-card');
    cards.forEach((card, idx) => {
      if (idx === cards.length - 1) return;
      gsap.to(card, {
        scale: 0.9,
        opacity: 0.3,
        filter: "blur(8px)",
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });
    });
  }

  /* --- 12. Results Matrix Multi-Axis Entrance --- */
  initResultsMatrix() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const sec = document.querySelector('.results-section');
    const numCards = document.querySelectorAll('.results-metric-giant');
    if (!sec || !numCards.length) return;

    const dirs = [
      { x: -150, y: 0 },
      { x: 150, y: 0 },
      { x: 0, y: 150 },
      { x: 0, y: -150 }
    ];

    numCards.forEach((card, i) => {
      const d = dirs[i % dirs.length];
      gsap.from(card, {
        x: d.x,
        y: d.y,
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%"
        }
      });
    });
  }

  /* --- 13. Pinned Emotional Outro Choreography (§25) --- */
  initEmotionalOutro() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const sec = document.querySelector('.pinned-outro-section');
    const phrases = document.querySelectorAll('.outro-phrase-item');
    if (!sec || phrases.length < 5) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sec,
        start: "top top",
        end: "+=2600",
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    // 0: PEOPLE DON'T REMEMBER ADS.
    tl.set(phrases[0], { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' })
      .to(phrases[0], { opacity: 0, y: -40, scale: 0.95, filter: 'blur(8px)', duration: 1 }, 1)

      // 1: THEY REMEMBER HOW THEY FELT.
      .fromTo(phrases[1], { opacity: 0, y: 50, scale: 0.94, filter: 'blur(8px)' }, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1 }, 1.2)
      .to(phrases[1], { opacity: 0, y: -40, scale: 0.95, filter: 'blur(8px)', duration: 1 }, 2.4)

      // 2: IDEAS.
      .fromTo(phrases[2], { opacity: 0, y: 50, scale: 0.92, filter: 'blur(8px)' }, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1 }, 2.6)
      .to(phrases[2], { opacity: 0, y: -40, scale: 0.95, filter: 'blur(8px)', duration: 1 }, 3.8)

      // 3: MOMENTS.
      .fromTo(phrases[3], { opacity: 0, y: 50, scale: 0.92, filter: 'blur(8px)' }, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1 }, 4.0)
      .to(phrases[3], { opacity: 0, y: -40, scale: 0.95, filter: 'blur(8px)', duration: 1 }, 5.2)

      // 4: MOVEMENT.
      .fromTo(phrases[4], { opacity: 0, y: 60, scale: 0.88, filter: 'blur(12px)' }, { opacity: 1, y: 0, scale: 1.05, filter: 'blur(0px)', duration: 1.2 }, 5.4);
  }

  /* --- 14. Final CTA Giant Scaling Choreography (§26) --- */
  initFinalCTA() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const sec = document.querySelector('.final-cta-section');
    const moveWord = document.querySelector('.cta-word-move');
    const ctaAction = document.querySelector('.cta-actions-wrap');
    const readyBadge = document.querySelector('.cta-ready-badge');
    const hugeWords = document.querySelectorAll('.cta-huge-word');
    if (!sec || !moveWord) return;

    // Ensure ctaAction is fully visible initially
    if (ctaAction) {
      gsap.set(ctaAction, { opacity: 1, y: 0, scale: 1 });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sec,
        start: "top top",
        end: "+=1800",
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });

    // "MOVE." scales massively beyond viewport with liquid blur
    tl.to(moveWord, { scale: 3.2, opacity: 0.1, filter: "blur(14px)", ease: "power2.in" }, 0);
    
    // Other words fade out slightly to keep focus on button and liquid WebGL
    if (hugeWords.length) {
      hugeWords.forEach((word) => {
        if (!word.classList.contains('cta-word-move')) {
          tl.to(word, { opacity: 0.25, y: -30, filter: "blur(4px)" }, 0);
        }
      });
    }

    if (readyBadge) {
      tl.to(readyBadge, { opacity: 0.4, y: -15 }, 0);
    }

    // Enhance CTA button focus without dropping below viewport
    if (ctaAction) {
      tl.fromTo(ctaAction, 
        { opacity: 0.85, scale: 0.96, y: 0 }, 
        { opacity: 1, scale: 1.05, y: 0, ease: "power2.out", duration: 1 }, 
        0.2
      );
    }
  }

  /* --- 15. Magnetic Button Physics --- */
  initMagneticButtons() {
    const btns = document.querySelectorAll('.magnetic-btn, .magnetic-btn-huge, .nav-cta-btn');
    btns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: "power2.out" });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      });
    });
  }

  /* --- 16. Header Glassmorphism on Scroll --- */
  initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  /* --- 17. Sound Synthesizer Toggle --- */
  initSoundToggle() {
    const btn = document.querySelector('.sound-toggle-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const playing = this.soundSys.toggle();
      if (playing) {
        btn.classList.add('playing');
        btn.querySelector('.sound-label').textContent = 'SOUND: ON';
      } else {
        btn.classList.remove('playing');
        btn.querySelector('.sound-label').textContent = 'SOUND: OFF';
      }
    });
  }
}

window.SarvxAnimationEngine = SarvxAnimationEngine;
