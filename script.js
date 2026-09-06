document.addEventListener("DOMContentLoaded", () => {

  /*
   * ==================================================
   * MOBILE MENU
   * ==================================================
   */

  const menuToggle =
    document.getElementById("menuToggle");

  const mainMenu =
    document.getElementById("mainMenu");


  if (menuToggle && mainMenu) {

    menuToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          mainMenu.classList.toggle("open");

        menuToggle.setAttribute(
          "aria-expanded",
          isOpen ? "true" : "false"
        );

      }
    );


    mainMenu
      .querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener(
          "click",
          () => {

            mainMenu.classList.remove("open");

            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      });

  }


  /*
   * ==================================================
   * CASE STUDY DROPDOWN
   * ==================================================
   */

  const caseBtn =
    document.getElementById("caseBtn");

  const caseMenu =
    document.getElementById("caseMenu");


  if (caseBtn && caseMenu) {

    caseBtn.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        caseMenu.classList.toggle("show");

      }
    );


    document.addEventListener(
      "click",
      (event) => {

        if (!event.target.closest(".dropdown")) {

          caseMenu.classList.remove("show");

        }

      }
    );

  }


  /*
   * ==================================================
   * SCROLL ANIMATION
   * ==================================================
   */

  document.documentElement.classList.add("js");


  const animatedItems =
    document.querySelectorAll("[data-animate]");


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries, obs) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "in-view"
              );

              obs.unobserve(entry.target);

            }

          });

        },
        {
          threshold: 0.08,
          rootMargin:
            "0px 0px -35px 0px"
        }
      );


    animatedItems.forEach(
      (item) => observer.observe(item)
    );

  } else {

    animatedItems.forEach(
      (item) =>
        item.classList.add("in-view")
    );

  }


  /*
   * ==================================================
   * DESIGN FILTER
   * ==================================================
   */

  const filterButtons =
    document.querySelectorAll(
      ".design-filter-btn"
    );

  const designCards =
    Array.from(
      document.querySelectorAll(
        ".design-card"
      )
    );


  filterButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const filter =
          button.dataset.filter;


        filterButtons.forEach(
          (btn) =>
            btn.classList.remove("active")
        );


        button.classList.add("active");


        designCards.forEach(
          (card) => {

            const category =
              card.dataset.category;


            const show =
              filter === "all" ||
              category === filter;


            if (show) {

              card.classList.remove(
                "is-hidden"
              );

              /*
               * Re-trigger animation
               */

              card.style.animation =
                "none";

              void card.offsetWidth;

              card.style.animation = "";

            } else {

              card.classList.add(
                "is-hidden"
              );

            }

          }
        );

      }
    );

  });


  /* ==================================================
     LIGHTBOX GALLERY - ROBUST VERSION
  ================================================== */

  const galleryData = {
    "poster-01": {
      title: "Poster sự kiện thể thao",
      category: "Poster",
      images: ["images/poster/poster-01.jpg"]
    },
    "banner-01": {
      title: "Banner quảng cáo sản phẩm",
      category: "Banner",
      images: [
        "images/banner/banner-01.png"
        //,"images/banner/banner-02.png"
        //,"images/banner/banner-03.png"
      ]
    },
    "menu-01": {
      title: "Thiết kế menu nhà hàng",
      category: "Menu",
      images: ["images/menu/menu-01.jpg"]
    }
  };

  const lightbox = document.getElementById("imageLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxCategory = document.getElementById("lightboxCategory");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  let currentGallery = null;
  let currentIndex = 0;

  function updateLightbox() {
    if (!currentGallery) return;

    const src = currentGallery.images[currentIndex];
    lightboxImage.src = src;
    lightboxImage.alt = currentGallery.title;
    lightboxTitle.textContent = currentGallery.title;
    lightboxCategory.textContent = currentGallery.category.toUpperCase();

    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentIndex + 1} / ${currentGallery.images.length}`;
    }

    const multiple = currentGallery.images.length > 1;
    lightboxPrev.hidden = !multiple;
    lightboxNext.hidden = !multiple;
  }

  window.openDesignGallery = function(id) {
    const gallery = galleryData[id];
    if (!gallery || !gallery.images.length) return;

    currentGallery = gallery;
    currentIndex = 0;
    updateLightbox();

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
  }

  function previousImage() {
    if (!currentGallery || currentGallery.images.length < 2) return;
    currentIndex = (currentIndex - 1 + currentGallery.images.length) % currentGallery.images.length;
    updateLightbox();
  }

  function nextImage() {
    if (!currentGallery || currentGallery.images.length < 2) return;
    currentIndex = (currentIndex + 1) % currentGallery.images.length;
    updateLightbox();
  }

  // Hàm global được gọi trực tiếp từ từng ô sản phẩm.
  // Cách này hoạt động ổn định cả khi mở index.html trực tiếp hoặc bằng Live Server.

  lightboxClose?.addEventListener("click", (event) => {
    event.stopPropagation();
    closeLightbox();
  });

  lightboxPrev?.addEventListener("click", (event) => {
    event.stopPropagation();
    previousImage();
  });

  lightboxNext?.addEventListener("click", (event) => {
    event.stopPropagation();
    nextImage();
  });

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox?.classList.contains("active")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") previousImage();
    if (event.key === "ArrowRight") nextImage();
  });

  // Vuốt trên điện thoại
  let touchStartX = 0;
  lightbox?.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });

  lightbox?.addEventListener("touchend", (event) => {
    const distance = event.changedTouches[0].screenX - touchStartX;
    if (Math.abs(distance) < 50) return;
    if (distance < 0) nextImage();
    else previousImage();
  }, { passive: true });

  /*
   * ==================================================
   * CONTACT FORM - EMAILJS
   * ==================================================
   */

  emailjs.init("9LWR0yK5BmxEXUHkC");

  const contactForm =
    document.getElementById("contactForm");

  const formNote =
    document.getElementById("formNote");

  if (contactForm && formNote) {

    contactForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();

        const submitButton =
          contactForm.querySelector('button[type="submit"]');

        formNote.textContent = "Đang gửi liên hệ...";

        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = "Đang gửi...";
        }

        emailjs.sendForm(
          "service_2omhc7r",
          "template_gurpb3c",
          contactForm
        )
        .then(() => {

          formNote.textContent =
            "Gửi liên hệ thành công! Cảm ơn bạn đã liên hệ.";

          contactForm.reset();

        })
        .catch((error) => {

          console.error("EmailJS error:", error);

          formNote.textContent =
            "Không thể gửi email. Vui lòng thử lại sau.";

        })
        .finally(() => {

          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Gửi liên hệ";
          }

        });

      }
    );

  }

});
