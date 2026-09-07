/* ==========================================================================
   SARVX.MEDIA — COMPREHENSIVE DIGITAL MARKETING APPLICATION CONTROLLER
   ========================================================================== */

function initApp() {
  // 1. Initialize Ambient Canvas Shader safely
  try {
    const ambientEngine = new AmbientCanvasEngine('ambientCanvas');
  } catch (err) {
    console.warn('AmbientCanvasEngine init warning:', err);
  }

  // 2. Render Dynamic Digital Marketing, Web & App Modules
  try { renderApproachStages(); } catch(e) { console.warn(e); }
  try { renderServicesAccordion(); } catch(e) { console.warn(e); }
  try { renderAppShowcases(); } catch(e) { console.warn(e); }
  try { renderFunnelFramework(); } catch(e) { console.warn(e); }
  try { renderClientsRoster(); } catch(e) { console.warn(e); }
  try { renderPackageStandards(); } catch(e) { console.warn(e); }
  try { renderTechStack(); } catch(e) { console.warn(e); }
  try { renderCaseStudies(); } catch(e) { console.warn(e); }
  try { renderPerformanceMetrics(); } catch(e) { console.warn(e); }
  try { renderWhyPillars(); } catch(e) { console.warn(e); }
  try { initFooterTime(); } catch(e) { console.warn(e); }

  // 3. Preloader Orchestration
  runPreloaderSequence(() => {
    try {
      window.sarvxEngine = new SarvxAnimationEngine();
    } catch (e) {
      console.warn('SarvxAnimationEngine init warning:', e);
    }
    try { initContactModal(); } catch(e) { console.warn(e); }
    try { initMobileNav(); } catch(e) { console.warn(e); }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

/* --- Preloader Sequence --- */
function runPreloaderSequence(onComplete) {
  const preloader = document.querySelector('.preloader');
  const numberEl = document.querySelector('.preloader-number');
  const barFill = document.querySelector('.preloader-bar-fill');
  const logoEl = document.querySelector('.preloader-logo');
  const taglineEl = document.querySelector('.preloader-tagline');

  let completed = false;
  const finishPreloader = () => {
    if (completed) return;
    completed = true;
    if (preloader) {
      preloader.classList.add('completed');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 1100);
    }
    if (onComplete) onComplete();
  };

  if (!preloader || !numberEl) {
    finishPreloader();
    return;
  }

  // Safety fallback: Never remain stuck under any circumstance
  const safetyTimer = setTimeout(finishPreloader, 2000);

  // Animate elements visibility
  if (logoEl) {
    logoEl.style.opacity = '1';
    logoEl.style.transform = 'translateY(0)';
  }
  if (taglineEl) {
    taglineEl.style.opacity = '0.8';
  }

  let progress = 0;
  const startTime = performance.now();
  const duration = 850; // ms

  function updateProgress(now) {
    const elapsed = now - startTime;
    const rawProgress = Math.min(1, elapsed / duration);
    const eased = 1 - Math.pow(1 - rawProgress, 4);
    progress = Math.round(eased * 100);

    numberEl.textContent = `${progress}%`;
    if (barFill) barFill.style.width = `${progress}%`;

    if (rawProgress < 1) {
      requestAnimationFrame(updateProgress);
    } else {
      numberEl.textContent = '100%';
      if (barFill) barFill.style.width = '100%';

      setTimeout(() => {
        if (logoEl) logoEl.style.transform = 'scale(1.08)';
        if (logoEl) logoEl.style.opacity = '0';
        if (taglineEl) taglineEl.style.opacity = '0';
        if (numberEl) numberEl.style.opacity = '0';
        if (barFill && barFill.parentElement) barFill.parentElement.style.opacity = '0';

        setTimeout(() => {
          clearTimeout(safetyTimer);
          finishPreloader();
        }, 350);
      }, 150);
    }
  }

  requestAnimationFrame(updateProgress);
}

/* --- Render 1/6 Signature Approach Stages --- */
function renderApproachStages() {
  const titlesStack = document.querySelector('.system-titles-stack');
  const visualFramesWrap = document.querySelector('.system-right-visual');
  const progressWrap = document.querySelector('.system-progress-indicator');
  if (!titlesStack || !window.SARVX_DATA) return;

  const { approachStages } = window.SARVX_DATA;

  titlesStack.innerHTML = '';
  if (visualFramesWrap) visualFramesWrap.innerHTML = '';
  if (progressWrap) progressWrap.innerHTML = '';

  approachStages.forEach((stage, idx) => {
    // Text Stage Item
    const stageEl = document.createElement('div');
    stageEl.className = `system-stage-item ${idx === 0 ? 'active' : ''}`;
    stageEl.innerHTML = `
      <div class="system-stage-title">${stage.title}</div>
      <div class="system-stage-desc">${stage.description}</div>
      <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 1rem;">
        ${stage.tags.map(t => `<span style="font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); background: rgba(255,255,255,0.04); border: 1px solid var(--border-glass); padding: 3px 8px; border-radius: 4px;">${t}</span>`).join('')}
      </div>
    `;
    titlesStack.appendChild(stageEl);

    // Visual Frame with Procedural Canvas
    if (visualFramesWrap) {
      const frameEl = document.createElement('div');
      frameEl.className = `system-visual-frame ${idx === 0 ? 'active' : ''}`;
      const canvasEl = document.createElement('canvas');
      canvasEl.className = 'system-visual-canvas';
      frameEl.appendChild(canvasEl);
      visualFramesWrap.appendChild(frameEl);

      setTimeout(() => {
        ProceduralCanvasArt.createStageVisual(canvasEl, stage.visualType);
      }, 100);
    }

    // Progress Dot
    if (progressWrap) {
      const dotEl = document.createElement('div');
      dotEl.className = `system-progress-dot ${idx === 0 ? 'active' : ''}`;
      progressWrap.appendChild(dotEl);
    }
  });
}

/* --- Render Comprehensive Digital Marketing Services Accordion --- */
function renderServicesAccordion() {
  const container = document.querySelector('.services-accordion-list');
  if (!container || !window.SARVX_DATA) return;

  const { services } = window.SARVX_DATA;
  container.innerHTML = '';

  services.forEach((s) => {
    const row = document.createElement('div');
    row.className = 'service-row-item';
    row.innerHTML = `
      <div class="service-row-main">
        <div class="service-num-title">
          <span class="service-num">${s.number}</span>
          <h3 class="service-title">${s.title}</h3>
        </div>
        <div class="service-arrow-icon">↘</div>
      </div>
      <div class="service-drawer-body">
        <div class="service-drawer-left">
          <div>
            <div class="service-subheading">CORE MISSION</div>
            <h4 style="font-family: var(--font-display); font-size: 1.35rem; color: #FFFFFF; margin: 0.5rem 0 1rem; line-height: 1.3;">${s.headline}</h4>
            <p style="color: var(--text-silver); font-size: 1.05rem; line-height: 1.6;">${s.description}</p>
          </div>
          <div>
            <div class="service-subheading" style="margin-bottom: 0.75rem;">KEY DELIVERABLES & CAPABILITIES</div>
            <div class="service-deliverables-grid">
              ${s.deliverables.map(d => `<div class="service-deliverable-item">${d}</div>`).join('')}
            </div>
          </div>
        </div>

        <div class="service-drawer-right">
          <div>
            <div class="service-subheading" style="margin-bottom: 0.75rem;">ENTERPRISE TECH STACK</div>
            <div class="service-pills-wrap">
              ${s.techStack.map(t => `<span class="service-tech-pill">${t}</span>`).join('')}
            </div>
          </div>
          <div>
            <div class="service-subheading" style="margin-bottom: 0.75rem;">TARGET BUSINESS KPIS</div>
            <div class="service-pills-wrap">
              ${s.kpis.map(k => `<span class="service-kpi-pill">★ ${k}</span>`).join('')}
            </div>
          </div>
          <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.06);">
            <button class="open-contact-modal" style="font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.15em; color: #FFFFFF; text-transform: uppercase; display: flex; align-items: center; gap: 6px;">
              REQUEST ${s.title} PROPOSAL →
            </button>
          </div>
        </div>
      </div>
    `;

    // Toggle drawer on click
    const headerRow = row.querySelector('.service-row-main');
    const drawer = row.querySelector('.service-drawer-body');
    const arrow = row.querySelector('.service-arrow-icon');

    headerRow.addEventListener('click', () => {
      const isOpen = drawer.style.display === 'grid';
      // Close all other drawers
      document.querySelectorAll('.service-drawer-body').forEach(d => d.style.display = 'none');
      document.querySelectorAll('.service-arrow-icon').forEach(a => a.textContent = '↘');

      if (!isOpen) {
        drawer.style.display = 'grid';
        arrow.textContent = '✕';
      }
    });

    container.appendChild(row);
  });
}

/* --- Render 5-Stage Customer Funnel Interactive Matrix --- */
function renderFunnelFramework() {
  const tabsContainer = document.querySelector('.funnel-nav-tabs');
  const cardContainer = document.querySelector('.funnel-content-card');
  if (!tabsContainer || !cardContainer || !window.SARVX_DATA) return;

  const { funnelFramework } = window.SARVX_DATA;
  tabsContainer.innerHTML = '';

  funnelFramework.forEach((stage, idx) => {
    const tabBtn = document.createElement('button');
    tabBtn.className = `funnel-tab-btn ${idx === 0 ? 'active' : ''}`;
    tabBtn.innerHTML = `
      <div class="funnel-tab-step">STAGE 0${idx + 1}</div>
      <div class="funnel-tab-title">${stage.stage.split('. ')[1] || stage.stage}</div>
    `;

    tabBtn.addEventListener('click', () => {
      document.querySelectorAll('.funnel-tab-btn').forEach(b => b.classList.remove('active'));
      tabBtn.classList.add('active');
      updateFunnelCard(stage);
    });

    tabsContainer.appendChild(tabBtn);
  });

  function updateFunnelCard(stage) {
    cardContainer.innerHTML = `
      <div class="funnel-card-grid">
        <div>
          <div class="funnel-card-header">
            <span class="funnel-stage-badge">${stage.label}</span>
            <h3 class="funnel-stage-headline">${stage.stage}</h3>
            <p class="funnel-stage-desc">${stage.objective}</p>
          </div>

          <div class="funnel-metrics-box">
            <div class="service-subheading" style="margin-bottom: 0.75rem;">TARGET NORTH-STAR METRICS</div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${stage.metrics.map(m => `<span class="service-kpi-pill">● ${m}</span>`).join('')}
            </div>
          </div>
        </div>

        <div class="funnel-channels-wrap">
          <div class="service-subheading">DEPLOYED CHANNELS & INFRASTRUCTURE</div>
          <div class="funnel-channels-list">
            ${stage.channels.map(c => `
              <div class="funnel-channel-item">
                <span class="funnel-channel-dot"></span>
                <span>${c}</span>
              </div>
            `).join('')}
          </div>

          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: var(--radius-sm); padding: 1.25rem;">
            <div class="service-subheading" style="margin-bottom: 0.4rem;">TANGIBLE ENTERPRISE OUTCOME</div>
            <p style="font-size: 0.95rem; color: #FFFFFF; line-height: 1.5;">${stage.outcome}</p>
          </div>
        </div>
      </div>
    `;
  }

  // Initial render with stage 0
  updateFunnelCard(funnelFramework[0]);
}

/* --- Render Interactive Websites & Applications Showcase --- */
function renderAppShowcases() {
  const tabsContainer = document.querySelector('.apps-showcase-tabs');
  const displayContainer = document.querySelector('.app-showcase-display');
  if (!tabsContainer || !displayContainer || !window.SARVX_DATA || !window.SARVX_DATA.appShowcases) return;

  const { appShowcases } = window.SARVX_DATA;
  tabsContainer.innerHTML = '';

  appShowcases.forEach((item, idx) => {
    const tabBtn = document.createElement('button');
    tabBtn.className = `app-tab-btn ${idx === 0 ? 'active' : ''}`;
    tabBtn.textContent = item.title;

    tabBtn.addEventListener('click', () => {
      document.querySelectorAll('.app-tab-btn').forEach(b => b.classList.remove('active'));
      tabBtn.classList.add('active');
      updateAppDisplay(item);
    });

    tabsContainer.appendChild(tabBtn);
  });

  function updateAppDisplay(item) {
    displayContainer.innerHTML = `
      <div class="app-mockup-frame">
        <div class="app-mockup-bar">
          <div class="app-window-dot"></div>
          <div class="app-window-dot"></div>
          <div class="app-window-dot"></div>
          <div class="app-window-title">SARVX // ${item.badge}</div>
        </div>
        <img class="app-mockup-img" src="${item.previewUrl}" alt="${item.title}">
      </div>

      <div class="app-info-column">
        <div>
          <span class="app-category-badge">${item.category}</span>
          <h3 class="app-headline" style="margin-top: 0.85rem;">${item.headline}</h3>
          <p class="app-description" style="margin-top: 0.75rem;">${item.description}</p>
        </div>

        <div class="app-specs-grid">
          ${item.specs.map(s => `
            <div class="app-spec-item">
              <span class="app-spec-label">${s.label}</span>
              <span class="app-spec-value">${s.value}</span>
            </div>
          `).join('')}
        </div>

        <div style="margin-top: 0.5rem;">
          <button class="nav-cta-btn open-contact-modal" style="width: fit-content; padding: 12px 28px;">
            BUILD A ${item.title.toUpperCase()} →
          </button>
        </div>
      </div>
    `;
  }

  // Initial render with first item
  updateAppDisplay(appShowcases[0]);
}

/* --- Render Clients Roster & Filtering --- */
function renderClientsRoster() {
  const marqueeTrack = document.querySelector('.client-marquee-track');
  const filterTabsContainer = document.querySelector('.client-filter-tabs');
  const matrixGrid = document.querySelector('.clients-matrix-grid');
  const searchInput = document.getElementById('clientSearchInput');
  const countIndicator = document.getElementById('directoryResultsCount');
  
  if (!window.SARVX_DATA || !window.SARVX_DATA.clients) return;
  const { clients } = window.SARVX_DATA;

  const isPreviewMode = matrixGrid && matrixGrid.getAttribute('data-preview-mode') === 'true';

  // 1. Render Infinite Marquee Ticker (duplicated for continuous seamless loop)
  if (marqueeTrack) {
    marqueeTrack.innerHTML = '';
    const loopItems = [...clients, ...clients];
    loopItems.forEach(client => {
      const item = document.createElement('div');
      item.className = 'marquee-brand-item';
      item.innerHTML = `
        <div class="marquee-brand-logo-wrap">
          <img src="${client.logoImg}" alt="${client.name}" class="marquee-logo-img" loading="lazy" />
        </div>
        <span class="marquee-brand-text">${client.name}</span>
        <span class="marquee-brand-dot"></span>
      `;
      marqueeTrack.appendChild(item);
    });
  }

  // 2. Categories for Filter Tabs
  const categories = [
    "All Clients (68+)",
    "Real Estate & Infra",
    "Jewellery & Luxury",
    "Hospitality & F&B",
    "Healthcare & Wellness",
    "Education & Career",
    "Automotive & Services"
  ];

  let currentCategory = "All Clients (68+)";
  let currentSearchQuery = "";

  if (filterTabsContainer) {
    filterTabsContainer.innerHTML = '';
    categories.forEach((cat, idx) => {
      const btn = document.createElement('button');
      btn.className = `client-filter-btn ${idx === 0 ? 'active' : ''}`;
      btn.textContent = cat;

      btn.addEventListener('click', () => {
        document.querySelectorAll('.client-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = cat;
        applyFilters();
      });

      filterTabsContainer.appendChild(btn);
    });
  }

  // Live Search listener on clients.html
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  function applyFilters() {
    if (!matrixGrid) return;
    matrixGrid.innerHTML = '';

    let filtered = currentCategory.startsWith("All")
      ? clients
      : clients.filter(c => c.category === currentCategory);

    if (currentSearchQuery) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(currentSearchQuery) || 
        (c.tag && c.tag.toLowerCase().includes(currentSearchQuery)) ||
        c.category.toLowerCase().includes(currentSearchQuery)
      );
    }

    if (countIndicator) {
      countIndicator.textContent = `SHOWING ${filtered.length} OF ${clients.length} CLIENTS`;
    }

    // If on homepage preview mode, limit to 12 featured cards
    const displayList = isPreviewMode ? filtered.slice(0, 12) : filtered;

    if (displayList.length === 0) {
      matrixGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px;">
          NO CLIENTS FOUND MATCHING "${currentSearchQuery.toUpperCase()}"
        </div>
      `;
      return;
    }

    displayList.forEach(client => {
      const card = document.createElement('div');
      card.className = 'client-brand-card';
      
      card.innerHTML = `
        <div class="client-card-top">
          <div class="client-logo-badge">
            <img src="${client.logoImg}" alt="${client.name}" class="client-logo-img" loading="lazy" />
          </div>
        </div>
        <div class="client-card-bottom">
          <div class="client-brand-name">${client.name}</div>
          <div class="client-brand-tag">${client.tag || client.category}</div>
        </div>
      `;
      matrixGrid.appendChild(card);
    });
  }

  // Initial render
  if (matrixGrid) {
    applyFilters();
  }
}

/* --- Render Package Standards (What's Included) --- */
function renderPackageStandards() {
  const container = document.querySelector('.package-inclusions-grid');
  if (!container || !window.SARVX_DATA || !window.SARVX_DATA.packageStandards) return;

  const { packageStandards } = window.SARVX_DATA;
  container.innerHTML = '';

  packageStandards.forEach(std => {
    const card = document.createElement('div');
    card.className = 'package-inclusion-card';
    card.innerHTML = `
      <div class="package-inclusion-title">✓ ${std.title}</div>
      <p class="package-inclusion-desc">${std.desc}</p>
    `;
    container.appendChild(card);
  });
}

/* --- Render Full-Stack Tech Ecosystem (Web, Apps, Media & Data) --- */
function renderTechStack() {
  const container = document.querySelector('.tech-ecosystem-grid');
  if (!container) return;

  const tools = [
    // Web & Frontend
    { name: "Next.js 15", cat: "React Web Flagships" },
    { name: "React & TypeScript", cat: "Web Application UI" },
    { name: "Three.js / WebGL", cat: "3D Interactive Shaders" },
    { name: "Tailwind & GSAP", cat: "Kinetic Micro-Interactions" },
    { name: "Shopify Plus / Hydrogen", cat: "Headless E-Commerce" },
    { name: "Sanity & Strapi", cat: "Headless Structured CMS" },
    
    // Mobile & Apps
    { name: "React Native", cat: "iOS & Android Mobile" },
    { name: "Flutter", cat: "Cross-Platform Apps" },
    { name: "Swift / iOS", cat: "Native Apple Ecosystem" },
    { name: "Node.js & FastAPI", cat: "Real-Time Microservices" },
    { name: "PostgreSQL & Supabase", cat: "Scalable Databases" },
    { name: "AWS & Docker", cat: "Cloud Infrastructure" },

    // Digital Marketing & Media
    { name: "Meta Ads & CAPI", cat: "Server-Side Tracking" },
    { name: "Google SA360 & PMax", cat: "High-Intent Paid Search" },
    { name: "TikTok Ads API", cat: "Short-Form Video Scaling" },
    { name: "Klaviyo & Braze", cat: "Lifecycle & Push Retention" },
    { name: "Triple Whale & Northbeam", cat: "Multi-Touch Attribution" },
    { name: "Semrush & Ahrefs", cat: "Technical SEO & AEO" },
    { name: "Google BigQuery & GA4", cat: "Enterprise Analytics" },
    { name: "VWO & Optimizely", cat: "Multivariate CRO" }
  ];

  container.innerHTML = '';
  tools.forEach(tool => {
    const badge = document.createElement('div');
    badge.className = 'tech-tool-badge';
    badge.innerHTML = `
      <div class="tech-tool-name">${tool.name}</div>
      <div class="tech-tool-category">${tool.cat}</div>
    `;
    container.appendChild(badge);
  });
}

/* --- Render Case Studies --- */
function renderCaseStudies() {
  const container = document.querySelector('.case-studies-container');
  if (!container || !window.SARVX_DATA) return;

  const { caseStudies } = window.SARVX_DATA;
  container.innerHTML = '';

  caseStudies.forEach((cs) => {
    const card = document.createElement('div');
    card.className = 'case-study-card';
    card.innerHTML = `
      <div class="case-study-inner">
        <canvas class="case-study-bg-media case-study-canvas-${cs.id}"></canvas>
        <div class="case-study-content">
          <div class="case-study-meta">
            <span>${cs.number}</span>
            <span>//</span>
            <span>${cs.category}</span>
            <span>//</span>
            <span>${cs.year}</span>
          </div>
          <h3 class="case-study-title">${cs.client}</h3>
          <p class="case-study-desc">${cs.description}</p>
          <div style="font-family: var(--font-mono); font-size: 13px; color: #FFFFFF; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.5rem;">
            RESULT: ${cs.result}
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);

    // Draw custom procedural backdrop
    setTimeout(() => {
      const c = card.querySelector(`.case-study-canvas-${cs.id}`);
      if (c) {
        ProceduralCanvasArt.createStageVisual(c, cs.visualTheme === 'aetheria' ? 'fluid_geometry' : (cs.visualTheme === 'monolith' ? 'film_strip' : 'neural_grid'));
      }
    }, 150);
  });
}

/* --- Render Metrics & Pillars --- */
function renderPerformanceMetrics() {
  const grid = document.querySelector('.metrics-hero-grid');
  if (!grid || !window.SARVX_DATA) return;

  const { metrics } = window.SARVX_DATA;
  grid.innerHTML = '';

  metrics.forEach((m) => {
    const card = document.createElement('div');
    card.className = 'metric-data-card';
    card.innerHTML = `
      <div>
        <div class="metric-number-display">${m.value}</div>
        <div class="metric-label-display">${m.label}</div>
      </div>
      <p style="font-size: 0.85rem; color: var(--text-dim); margin-top: 1.5rem; font-family: var(--font-mono);">${m.detail}</p>
    `;
    grid.appendChild(card);
  });
}

function renderWhyPillars() {
  const grid = document.querySelector('.pillars-grid');
  if (!grid || !window.SARVX_DATA) return;

  const { pillars } = window.SARVX_DATA;
  grid.innerHTML = '';

  pillars.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'pillar-card';
    card.innerHTML = `
      <div class="pillar-num">${p.num}</div>
      <div>
        <div class="pillar-title">${p.title}</div>
        <p class="pillar-desc">${p.desc}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* --- Live World Clocks in Footer --- */
function initFooterTime() {
  const timeEl = document.getElementById('footerUtcTime');
  if (!timeEl) return;

  function update() {
    const now = new Date();
    const utc = now.toUTCString().split(' ').slice(4, 5)[0] + ' UTC';
    timeEl.textContent = `${utc} · NY · LDN · TYO · SGP`;
  }
  update();
  setInterval(update, 1000);
}

/* --- Contact Modal & Drawer Controller --- */
function initContactModal() {
  const overlay = document.querySelector('.contact-modal-overlay');
  const triggers = document.querySelectorAll('.open-contact-modal');
  const closeBtn = document.querySelector('.modal-close-btn');
  const form = document.querySelector('.contact-form');

  if (!overlay) return;

  triggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
    });
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      overlay.classList.remove('active');
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('.form-submit-btn');
      submitBtn.textContent = 'TRANSMITTING DIGITAL MARKETING INQUIRY...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = 'INQUIRY RECEIVED — SENIOR PARTNER WILL TRANSMIT BRIEF';
        submitBtn.style.backgroundColor = '#10B981';
        submitBtn.style.color = '#FFFFFF';

        setTimeout(() => {
          overlay.classList.remove('active');
          form.reset();
          submitBtn.textContent = 'TRANSMIT INQUIRY →';
          submitBtn.style.backgroundColor = '#FFFFFF';
          submitBtn.style.color = '#000000';
          submitBtn.disabled = false;
        }, 2200);
      }, 1000);
    });
  }
}

/* --- Mobile Navigation Overlay --- */
function initMobileNav() {
  const btn = document.querySelector('.mobile-menu-btn');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!btn || !overlay) return;

  btn.addEventListener('click', () => {
    overlay.classList.toggle('active');
  });

  links.forEach((l) => {
    l.addEventListener('click', () => {
      overlay.classList.remove('active');
    });
  });
}
