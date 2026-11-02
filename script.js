const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

function closeMenu() {
  menuButton?.classList.remove('is-open');
  nav?.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Открыть меню');
}

menuButton?.addEventListener('click', () => {
  const opening = !nav.classList.contains('is-open');
  menuButton.classList.toggle('is-open', opening);
  nav.classList.toggle('is-open', opening);
  document.body.classList.toggle('menu-open', opening);
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.setAttribute('aria-label', opening ? 'Закрыть меню' : 'Открыть меню');
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

document.querySelectorAll('[data-scroll-to]').forEach((button) => {
  button.addEventListener('click', () => {
    document.getElementById(button.dataset.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
  });
});

const slider = document.querySelector('[data-slider]');
const scrollReviews = (direction) => {
  if (!slider) return;
  const card = slider.querySelector('.review-card');
  const distance = (card?.getBoundingClientRect().width || 350) + 18;
  slider.scrollBy({ left: distance * direction, behavior: 'smooth' });
};

document.querySelector('[data-review-prev]')?.addEventListener('click', () => scrollReviews(-1));
document.querySelector('[data-review-next]')?.addEventListener('click', () => scrollReviews(1));

document.querySelectorAll('.faq-list details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('.faq-list details').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

const form = document.getElementById('booking-form');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Кот печатает…';

  window.setTimeout(() => {
    form.querySelector('.form-success')?.classList.add('is-visible');
    form.reset();
  }, 650);
});

const toTop = document.querySelector('.to-top');
const updateTopButton = () => toTop?.classList.toggle('is-visible', window.scrollY > 700);
window.addEventListener('scroll', updateTopButton, { passive: true });
updateTopButton();
toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const revealTargets = document.querySelectorAll('.program-card, .review-card, .price-card, .steps li');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach((element) => element.classList.add('reveal-ready'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((element, index) => {
    element.style.setProperty('--reveal-delay', `${(index % 3) * 80}ms`);
    observer.observe(element);
  });
}
