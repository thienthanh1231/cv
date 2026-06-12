/* ==========================
   ENABLE JS
========================== */

document.documentElement.classList.add('js');

/* ==========================
   MOBILE MENU
========================== */

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle?.addEventListener('click', () => {
  menu?.classList.toggle('open');
});

/* ==========================
   CONTACT FORM
========================== */

const form = document.querySelector('#contactForm');
const formNote = document.querySelector('#formNote');

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = (data.get('name') || 'bạn').toString().trim();

  formNote.textContent =
    `Cảm ơn ${name}, mình đã nhận được liên hệ của bạn!`;

  form.reset();
});

/* ==========================
   SCROLL ANIMATION
========================== */

const animatedElements = document.querySelectorAll('[data-animate]');

if ('IntersectionObserver' in window) {

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }

      });
    },
    {
      threshold: 0.16
    }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });

} else {

  animatedElements.forEach((element) => {
    element.classList.add('in-view');
  });

}

/* ==========================
   CASE STUDY DROPDOWN
========================== */

const caseBtn = document.getElementById('caseBtn');
const caseMenu = document.getElementById('caseMenu');

if (caseBtn && caseMenu) {

  caseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    caseMenu.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    caseMenu.classList.remove('show');
  });

  caseMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  });

}

/* ==========================
   DEBUG
========================== */
