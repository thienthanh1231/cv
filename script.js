const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle?.addEventListener('click', () => {
  menu?.classList.toggle('open');
});

const form = document.querySelector('#contactForm');
const formNote = document.querySelector('#formNote');

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = (data.get('name') || 'bạn').toString().trim();

  formNote.textContent = `Cảm ơn ${name}, mình đã nhận được liên hệ của bạn!`;
  form.reset();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll('[data-animate]').forEach((element) => {
  observer.observe(element);
});
