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

/* ==========================
   EMAILJS CONTACT FORM
========================== */

emailjs.init("9LWR0yK5BmxEXUHkC");

const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

form?.addEventListener("submit", function (e) {

  e.preventDefault();

  formNote.textContent = "⏳ Đang gửi...";

  emailjs.sendForm(
    "service_2omhc7r",
    "template_gurpb3c",
    this
  )
  .then(() => {

    formNote.textContent = "✅ Gửi liên hệ thành công!";
    form.reset();

  })
  .catch((error) => {

    console.error(error);
    formNote.textContent = "❌ Gửi thất bại. Vui lòng thử lại.";

  });

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
