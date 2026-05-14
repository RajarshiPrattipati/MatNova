/* ============================================================
   THE SPACE BETWEEN THE SHADOW AND THE LIGHT
   Chinoy Mathew — Portfolio JavaScript
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   SMOOTH SCROLL — LENIS
   ============================================================ */
const lenis = new Lenis({
  duration: 1.8,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  syncTouch: false,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

/* ============================================================
   LANDING SEQUENCE
   ============================================================ */
const landingTL = gsap.timeline({ delay: 0.4 });

landingTL
  .to('.landing-title', {
    opacity: 1,
    duration: 2.2,
    ease: 'power2.out',
  })
  .to('.landing-byline', {
    opacity: 1,
    duration: 1.6,
    ease: 'power2.out',
  }, '-=0.8')
  .to('.scroll-hint', {
    opacity: 1,
    duration: 0.01,
  }, '-=0.2');

// Fade landing out as journey begins, reveal nav
ScrollTrigger.create({
  trigger: '#journey',
  start: 'top 85%',
  onEnter: () => {
    gsap.to('#landing', {
      opacity: 0,
      duration: 1.4,
      ease: 'power2.inOut',
      onComplete: () => {
        const el = document.getElementById('landing');
        if (el) el.style.display = 'none';
      },
    });
    document.getElementById('siteNav').classList.add('revealed');
  },
});

/* ============================================================
   PROGRESS BAR
   ============================================================ */
ScrollTrigger.create({
  trigger: '#journey',
  start: 'top top',
  end: 'bottom bottom',
  onUpdate: self => {
    document.getElementById('progressFill').style.height =
      (self.progress * 100) + '%';
  },
});

/* ============================================================
   CHAPTER LABELS
   ============================================================ */
let labelTimer;

function flashChapterLabel(text) {
  const el = document.getElementById('chapterLabel');
  clearTimeout(labelTimer);
  el.textContent = text;
  el.style.opacity = '0.55';
  labelTimer = setTimeout(() => { el.style.opacity = '0'; }, 3200);
}

document.querySelectorAll('.chapter[data-chapter]').forEach(ch => {
  ScrollTrigger.create({
    trigger: ch,
    start: 'top 55%',
    onEnter:     () => flashChapterLabel(ch.dataset.chapter),
    onEnterBack: () => flashChapterLabel(ch.dataset.chapter),
  });
});

/* ============================================================
   PARALLAX — images move subtly as you scroll
   Since images are no longer position:absolute with inset,
   we apply a gentle translateY to the img element itself.
   The scene has overflow:hidden so movement stays clean.
   ============================================================ */
document.querySelectorAll('.parallax-img').forEach(img => {
  const scene = img.closest('.scene');
  if (!scene) return;

  // Gentle travel: image drifts 40px upward across full scroll through scene
  gsap.fromTo(img,
    { y: 20 },
    {
      y: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: scene,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    }
  );
});

/* ============================================================
   TEXT ANIMATIONS
   ============================================================ */

// Primary quotes
document.querySelectorAll('.quote').forEach(el => {
  const trigger = el.closest('.scene') || el.closest('.chapter-divider');
  if (!trigger) return;
  gsap.to(el, {
    opacity: 1, y: 0,
    duration: 1.8, ease: 'power2.out',
    scrollTrigger: {
      trigger,
      start: 'top 65%',
      toggleActions: 'play none none reverse',
    },
  });
});

// Secondary quotes
document.querySelectorAll('.quote-sm').forEach(el => {
  const trigger = el.closest('.scene') || el.closest('.chapter-divider');
  if (!trigger) return;
  gsap.to(el, {
    opacity: 1, y: 0,
    duration: 1.6, ease: 'power2.out', delay: 0.2,
    scrollTrigger: {
      trigger,
      start: 'top 62%',
      toggleActions: 'play none none reverse',
    },
  });
});

// Caption tags
document.querySelectorAll('.caption-tag').forEach(el => {
  const trigger = el.closest('.scene');
  if (!trigger) return;
  gsap.to(el, {
    opacity: 1, y: 0,
    duration: 1.2, ease: 'power2.out',
    scrollTrigger: {
      trigger,
      start: 'top 68%',
      toggleActions: 'play none none reverse',
    },
  });
});

// Exhibition notes
document.querySelectorAll('.exhibition-note').forEach(el => {
  const trigger = el.closest('.scene');
  if (!trigger) return;
  gsap.to(el, {
    opacity: 1, y: 0,
    duration: 1.2, ease: 'power2.out', delay: 0.5,
    scrollTrigger: {
      trigger,
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });
});

// Chapter divider texts
document.querySelectorAll('.divider-text').forEach(el => {
  const trigger = el.closest('.chapter-divider');
  if (!trigger) return;
  gsap.to(el, {
    opacity: 1, y: 0,
    duration: 2.2, ease: 'power2.out',
    scrollTrigger: {
      trigger,
      start: 'top 68%',
      toggleActions: 'play none none reverse',
    },
  });
});

/* ============================================================
   ABYSS & PHANTOM — images rise from darkness
   ============================================================ */
document.querySelectorAll('.parallax-img--abyss, .parallax-img--phantom').forEach(img => {
  const scene = img.closest('.scene');
  if (!scene) return;
  gsap.from(img, {
    opacity: 0,
    duration: 2.8, ease: 'power2.inOut',
    scrollTrigger: {
      trigger: scene,
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  });
});

/* ============================================================
   FINAL SCENE — slow golden reveal
   ============================================================ */
const finalScene = document.getElementById('finalScene');
if (finalScene) {
  const finalImg  = finalScene.querySelector('.parallax-img--final');
  const finalText = finalScene.querySelector('.final-quote');

  if (finalImg) {
    gsap.from(finalImg, {
      opacity: 0,
      scale: 1.04,
      duration: 3.5, ease: 'power2.inOut',
      scrollTrigger: {
        trigger: finalScene,
        start: 'top 72%',
        toggleActions: 'play none none none',
      },
    });
  }

  if (finalText) {
    gsap.to(finalText, {
      opacity: 1, y: 0,
      duration: 2.5, ease: 'power2.out', delay: 1,
      scrollTrigger: {
        trigger: finalScene,
        start: 'top 58%',
        toggleActions: 'play none none none',
      },
    });
  }
}

/* ============================================================
   COLLECTED WORKS — NFT SECTION
   ============================================================ */

// Stagger-animate tally numbers on scroll entry
gsap.from('.tally-item', {
  opacity: 0, y: 16,
  duration: 1.4, ease: 'power2.out',
  stagger: 0.18,
  scrollTrigger: {
    trigger: '.collected-tally',
    start: 'top 82%',
    toggleActions: 'play none none none',
  },
});

// Fade in header elements
gsap.from('.collected-eyebrow', {
  opacity: 0, y: 12, duration: 1.2, ease: 'power2.out',
  scrollTrigger: { trigger: '#collected', start: 'top 78%', toggleActions: 'play none none none' },
});
gsap.from('.collected-title', {
  opacity: 0, y: 20, duration: 1.6, ease: 'power2.out', delay: 0.2,
  scrollTrigger: { trigger: '#collected', start: 'top 78%', toggleActions: 'play none none none' },
});

// Stagger cards in
gsap.from('.nft-card', {
  opacity: 0, y: 30,
  duration: 1.2, ease: 'power2.out',
  stagger: 0.08,
  scrollTrigger: {
    trigger: '.nft-grid',
    start: 'top 82%',
    toggleActions: 'play none none none',
  },
});

// NFT Lightbox
const nftLightbox = document.getElementById('nftLightbox');
const nftLbClose  = document.getElementById('nftLbClose');

function openNftLightbox(card) {
  document.getElementById('nftLbImg').src     = card.dataset.img;
  document.getElementById('nftLbImg').alt     = card.dataset.title;
  document.getElementById('nftLbTitle').textContent   = card.dataset.title;
  document.getElementById('nftLbDesc').textContent    = card.dataset.desc;
  document.getElementById('nftLbEdition').textContent = card.dataset.edition;
  document.getElementById('nftLbPrice').textContent   = card.dataset.price;

  const cta = document.getElementById('nftLbCta');
  cta.href = card.dataset.url;
  const isSold = card.dataset.status === 'sold' || card.dataset.status === 'sold-out';
  cta.textContent = isSold ? 'view on objkt →' : 'collect on objkt →';

  nftLightbox.classList.add('active');
  nftLightbox.removeAttribute('aria-hidden');
  lenis.stop();
}

function closeNftLightbox() {
  nftLightbox.classList.remove('active');
  nftLightbox.setAttribute('aria-hidden', 'true');
  lenis.start();
}

document.querySelectorAll('.nft-card').forEach(card => {
  card.addEventListener('click', e => {
    if (e.target.closest('a')) return; // allow link clicks to pass through
    openNftLightbox(card);
  });
});

nftLbClose.addEventListener('click', closeNftLightbox);
nftLightbox.addEventListener('click', e => { if (e.target === nftLightbox) closeNftLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNftLightbox(); });

/* ============================================================
   CHAPTER NAVIGATION
   ============================================================ */

/* Nav chapter display */
const navChapterNumEl  = document.getElementById('navChapterNum');
const navChapterNameEl = document.getElementById('navChapterName');
const navHamburger     = document.getElementById('navHamburger');

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', '—'];
let navFirstSet = true;

function animateNavChapter(roman, name) {
  if (navFirstSet) {
    navFirstSet = false;
    navChapterNumEl.textContent  = roman;
    navChapterNameEl.textContent = name;
    return;
  }
  // Clip name out upward, bring new name in from below
  gsap.to(navChapterNameEl, {
    y: '-120%', opacity: 0, duration: 0.22, ease: 'power2.in',
    onComplete: () => {
      navChapterNameEl.textContent = name;
      gsap.fromTo(navChapterNameEl,
        { y: '120%', opacity: 0 },
        { y: '0%',   opacity: 1, duration: 0.38, ease: 'power2.out' }
      );
    },
  });
  // 3D-flip the roman numeral on X axis
  gsap.to(navChapterNumEl, {
    rotateX: -90, duration: 0.2, ease: 'power2.in',
    onComplete: () => {
      navChapterNumEl.textContent = roman;
      gsap.fromTo(navChapterNumEl,
        { rotateX: 90 },
        { rotateX: 0,  duration: 0.32, ease: 'power2.out' }
      );
    },
  });
}

const CHAPTERS = [
  { id: 'ch-surface',      label: 'Surface' },
  { id: 'ch-glass',        label: 'The Glass Between' },
  { id: 'ch-mirrors',      label: 'Others as Mirrors' },
  { id: 'ch-burden',       label: 'The Burden of the Body' },
  { id: 'ch-shadow',       label: 'Shadow Work' },
  { id: 'ch-inside',       label: 'Inside' },
  { id: 'ch-mural',        label: 'Mural of a Muse' },
  { id: 'ch-phantom',      label: 'Phantom of My Mind\'s Design' },
  { id: 'ch-moon',         label: 'Conversations with the Moon' },
  { id: 'ch-illumination', label: 'Illumination' },
  { id: 'collected',       label: 'Collected Works' },
];

let currentChapterIndex = 0;

const contentsBtn      = document.getElementById('contentsBtn');
const contentsPanel    = document.getElementById('contentsPanel');
const contentsClose    = document.getElementById('contentsClose');
const contentsBackdrop = document.getElementById('contentsBackdrop');
const jumpPrev         = document.getElementById('jumpPrev');
const jumpNext         = document.getElementById('jumpNext');
const jumpPrevLabel    = document.getElementById('jumpPrevLabel');
const jumpNextLabel    = document.getElementById('jumpNextLabel');

function openContents() {
  contentsPanel.classList.add('open');
  contentsBackdrop.classList.add('open');
  contentsPanel.removeAttribute('aria-hidden');
  lenis.stop();
}
function closeContents() {
  contentsPanel.classList.remove('open');
  contentsBackdrop.classList.remove('open');
  contentsPanel.setAttribute('aria-hidden', 'true');
  lenis.start();
  navHamburger.classList.remove('open');
  navHamburger.setAttribute('aria-expanded', 'false');
}

contentsBtn.addEventListener('click', openContents);
contentsClose.addEventListener('click', closeContents);
contentsBackdrop.addEventListener('click', closeContents);

// Mobile hamburger — same panel, morph animation via CSS class
navHamburger.addEventListener('click', () => {
  const isOpen = contentsPanel.classList.contains('open');
  if (isOpen) {
    closeContents();
  } else {
    navHamburger.classList.add('open');
    navHamburger.setAttribute('aria-expanded', 'true');
    openContents();
  }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeContents(); });

// Navigate to a chapter by index
function goToChapter(idx) {
  const ch = CHAPTERS[idx];
  if (!ch) return;
  const el = document.getElementById(ch.id);
  if (!el) return;
  closeContents();
  lenis.scrollTo(el, { offset: 0, duration: 1.6 });
}

// Smooth-scroll all contents links via Lenis
document.querySelectorAll('.contents-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const idx = parseInt(link.dataset.index, 10);
    goToChapter(idx);
  });
});

// Prev / next buttons
jumpPrev.addEventListener('click', () => goToChapter(currentChapterIndex - 1));
jumpNext.addEventListener('click', () => goToChapter(currentChapterIndex + 1));

function setActiveChapter(idx) {
  currentChapterIndex = idx;
  animateNavChapter(ROMAN[idx], CHAPTERS[idx].label);

  // Highlight active item in panel
  document.querySelectorAll('.contents-link').forEach((l, i) => {
    l.classList.toggle('active', i === idx);
  });

  // Update prev / next labels
  const prev = CHAPTERS[idx - 1];
  const next = CHAPTERS[idx + 1];

  if (prev) {
    jumpPrevLabel.textContent = prev.label;
    jumpPrev.classList.add('visible');
  } else {
    jumpPrevLabel.textContent = '';
    jumpPrev.classList.remove('visible');
  }

  if (next) {
    jumpNextLabel.textContent = next.label;
    jumpNext.classList.add('visible');
  } else {
    jumpNextLabel.textContent = '';
    jumpNext.classList.remove('visible');
  }
}

// Track which chapter is in view
CHAPTERS.forEach((ch, idx) => {
  const el = document.getElementById(ch.id);
  if (!el) return;
  ScrollTrigger.create({
    trigger: el,
    start: 'top 60%',
    onEnter:      () => setActiveChapter(idx),
    onEnterBack:  () => setActiveChapter(idx),
  });
});

// Init first chapter
setActiveChapter(0);

/* ============================================================
   ABOUT OVERLAY
   ============================================================ */
const overlay  = document.getElementById('aboutOverlay');
const aboutBtn = document.getElementById('aboutBtn');
const closeBtn = document.getElementById('aboutClose');

function openAbout()  { overlay.classList.add('active');    lenis.stop();  }
function closeAbout() { overlay.classList.remove('active'); lenis.start(); }

aboutBtn.addEventListener('click', openAbout);
closeBtn.addEventListener('click', closeAbout);
overlay.addEventListener('click', e => { if (e.target === overlay) closeAbout(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAbout(); });
