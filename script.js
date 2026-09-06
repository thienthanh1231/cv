document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     MOBILE MENU
  ========================== */
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("open");
      menuToggle.setAttribute(
        "aria-expanded",
        menu.classList.contains("open") ? "true" : "false"
      );
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =========================
     CASE STUDY DROPDOWN
  ========================== */
  const caseBtn = document.getElementById("caseBtn");
  const caseMenu = document.getElementById("caseMenu");

  if (caseBtn && caseMenu) {
    caseBtn.addEventListener("click", (event) => {
      event.preventDefault();
      caseMenu.classList.toggle("show");
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".dropdown")) {
        caseMenu.classList.remove("show");
      }
    });
  }

  /* =========================
     SCROLL ANIMATION
  ========================== */
  const animatedItems = document.querySelectorAll("[data-animate]");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    animatedItems.forEach((item) => observer.observe(item));
  } else {
    animatedItems.forEach((item) => item.classList.add("in-view"));
  }

  /* =========================
     DESIGN FILTER
  ========================== */
  const filterButtons = document.querySelectorAll(".design-filter-btn");
  const designItems = document.querySelectorAll(".design-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      designItems.forEach((item) => {
        const category = item.dataset.category;
        const shouldShow = filter === "all" || category === filter;

        if (shouldShow) {
          item.classList.remove("is-hidden");
          item.style.animation = "none";
          void item.offsetWidth;
          item.style.animation = "";
        } else {
          item.classList.add("is-hidden");
        }
      });
    });
  });

  /* =========================
     LIGHTBOX
  ========================== */
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxCategory = document.getElementById("lightboxCategory");
  const lightboxClose = document.getElementById("lightboxClose");

  const openLightbox = (button) => {
    const src = button.dataset.lightboxSrc;
    const title = button.dataset.lightboxTitle || "";
    const category = button.dataset.lightboxCategory || "";

    lightboxImage.src = src;
    lightboxImage.alt = title;
    lightboxTitle.textContent = title;
    lightboxCategory.textContent = category.toUpperCase();

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setTimeout(() => {
      lightboxImage.src = "";
    }, 250);
  };

  document.querySelectorAll("[data-lightbox-src]").forEach((button) => {
    button.addEventListener("click", () => openLightbox(button));
  });

  lightboxClose?.addEventListener("click", closeLightbox);

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });

  /* =========================
     CONTACT FORM
     Giữ form hoạt động ở mức giao diện.
     EmailJS hiện tại của bạn có thể được
     cấu hình lại trong phần này nếu cần.
  ========================== */
  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  if (contactForm && formNote) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      formNote.textContent =
        "Cảm ơn bạn! Form đã nhận thông tin. Hãy cấu hình EmailJS để gửi email thật.";

      contactForm.reset();
    });
  }
});
