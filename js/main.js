/**
 * Saudi Controls Ltd. — Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollTop();
  initCounters();
  initAOS();
  initSmoothScroll();
  initProjectFilter();
  initCareersModal();
  initContactForm();
  initSwipers();
  setActiveNavLink();
});

/* ========== NAVBAR ========== */
function initNavbar() {
  const navbar = document.querySelector('.navbar-custom');
  const toggler = document.querySelector('.navbar-toggler');
  const navCollapse = document.querySelector('#mainNav');

  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('navbar-shrink');
    } else {
      navbar.classList.remove('navbar-shrink');
    }
  });

  if (toggler && navCollapse) {
    toggler.addEventListener('click', () => {
      navCollapse.classList.toggle('show');
    });

    navCollapse.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
          navCollapse.classList.remove('show');
        }
      });
    });
  }
}

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const isHome = currentPage === '' || currentPage === 'index.html';

  // Clear any hardcoded active states (still ok if present)
  document.querySelectorAll('.navbar-custom .nav-link, .navbar-custom .dropdown-item').forEach((el) => {
    el.classList.remove('active');
  });

  // Activate direct nav links
  document.querySelectorAll('.navbar-custom .nav-link[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    if ((isHome && href === 'index.html') || href === currentPage) {
      link.classList.add('active');
    }
  });

  // Activate dropdown items + parent toggle
  document.querySelectorAll('.navbar-custom .dropdown-item[href]').forEach((item) => {
    const href = item.getAttribute('href');
    if (!href || href === '#') return;
    if ((isHome && href === 'index.html') || href === currentPage) {
      item.classList.add('active');
      const dropdown = item.closest('.dropdown');
      const toggle = dropdown ? dropdown.querySelector('.nav-link.dropdown-toggle') : null;
      if (toggle) toggle.classList.add('active');
    }
  });
}

/* ========== SCROLL TO TOP ========== */
function initScrollTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ========== COUNTER ANIMATION ========== */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target + suffix;
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

/* ========== AOS ========== */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 80,
    });
  }
}

/* ========== SWIPER INITIALIZATION ========== */
function initSwipers() {
  // Home page testimonial swiper
  const testimonialSwiper = document.querySelector('.testimonial-swiper');
  if (testimonialSwiper && typeof Swiper !== 'undefined') {
    new Swiper('.testimonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: { delay: 5000 },
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: { 768: { slidesPerView: 2 } }
    });
  }

  // Testimonials page swiper
  const testimonialsSwiper = document.querySelector('.testimonials-swiper');
  if (testimonialsSwiper && typeof Swiper !== 'undefined') {
    new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: { delay: 5000 },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: { 768: { slidesPerView: 2 } }
    });
  }
}

/* ========== SMOOTH SCROLL ========== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ========== PROJECT FILTER ========== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-grid-item');

  if (!filterBtns.length || !projectItems.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      projectItems.forEach((item) => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

/* ========== CAREERS MODAL & FORM ========== */
function initCareersModal() {
  const applyBtns = document.querySelectorAll('[data-apply-job]');
  const modalEl = document.getElementById('applyModal');
  const form = document.getElementById('applicationForm');
  const successMsg = document.getElementById('applicationSuccess');

  if (!modalEl) return;

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  const positionSelect = document.getElementById('positionApplied');

  applyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const jobTitle = btn.getAttribute('data-apply-job');
      if (positionSelect && jobTitle) {
        positionSelect.value = jobTitle;
      }
      modal.show();
    });
  });

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    if (successMsg) {
      successMsg.classList.add('show');
    }
    form.reset();

    setTimeout(() => {
      modal.hide();
      if (successMsg) successMsg.classList.remove('show');
    }, 2500);
  });

  modalEl.addEventListener('hidden.bs.modal', () => {
    clearFormErrors(form);
    if (successMsg) successMsg.classList.remove('show');
  });
}

/* ========== CONTACT FORM ========== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('contactSuccess');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    if (successMsg) {
      successMsg.classList.add('show');
      successMsg.textContent = 'Thank you! Your message has been sent successfully.';
    }
    form.reset();

    setTimeout(() => {
      if (successMsg) successMsg.classList.remove('show');
    }, 4000);
  });
}

/* ========== FORM VALIDATION ========== */
function validateForm(form) {
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');

  clearFormErrors(form);

  requiredFields.forEach((field) => {
    const value = field.type === 'file' ? field.files.length : field.value.trim();
    if (!value) {
      isValid = false;
      field.classList.add('is-invalid');
    } else {
      field.classList.remove('is-invalid');
    }

    if (field.type === 'email' && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value.trim())) {
        isValid = false;
        field.classList.add('is-invalid');
      }
    }
  });

  return isValid;
}

function clearFormErrors(form) {
  form.querySelectorAll('.is-invalid').forEach((field) => {
    field.classList.remove('is-invalid');
  });
}
