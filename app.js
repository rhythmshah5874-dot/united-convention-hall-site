const currentPage = document.body.dataset.page;
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (header) {
  const refreshHeader = () => header.classList.toggle('is-stuck', window.scrollY > 40);
  refreshHeader();
  window.addEventListener('scroll', refreshHeader, { passive: true });
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

document.querySelectorAll('.site-nav a[data-page]').forEach(link => {
  if (link.dataset.page === currentPage) link.classList.add('active');
});

const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const lightboxImage = lightbox.querySelector('img');
  const caption = lightbox.querySelector('.lightbox-caption');
  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  };
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      lightboxImage.src = item.dataset.full || item.querySelector('img').src;
      lightboxImage.alt = item.querySelector('img').alt;
      caption.textContent = item.dataset.caption || item.querySelector('figcaption')?.textContent || '';
      lightbox.classList.add('is-open');
      document.body.classList.add('no-scroll');
    });
  });
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
  window.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });
}

document.querySelectorAll('.filter-button').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('.filter-button').forEach(item => item.classList.toggle('active', item === button));
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.classList.toggle('is-hidden', filter !== 'all' && item.dataset.category !== filter);
    });
  });
});

document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const open = item.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(open));
  });
});

const enquiryForm = document.querySelector('#enquiry-form');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = enquiryForm.elements.name.value.trim();
    const phone = enquiryForm.elements.phone.value.trim();
    const error = enquiryForm.querySelector('.form-error');
    const success = enquiryForm.querySelector('.form-success');
    if (!name || !phone) {
      error.textContent = 'Please add your name and phone number so the enquiry is ready to share.';
      success.classList.remove('is-visible');
      return;
    }
    error.textContent = '';
    success.innerHTML = `<strong>Enquiry prepared for ${name}.</strong><br>Thank you — United Convention Hall can follow up using the phone number you provided. This demo keeps your details in your browser and does not send them anywhere.`;
    success.classList.add('is-visible');
    enquiryForm.querySelector('.button[type="submit"]').textContent = 'Enquiry ready ✓';
  });
}

document.querySelectorAll('[data-scroll-to]').forEach(button => {
  button.addEventListener('click', () => document.querySelector(button.dataset.scrollTo)?.scrollIntoView({ behavior: 'smooth' }));
});
