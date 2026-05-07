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

// Fade landing out as journey begins
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
    gsap.to('#chapterLabel', { opacity: 1, duration: 0.8 });
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
