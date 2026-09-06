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


  /*
   * ==================================================
   * LIGHTBOX GALLERY THEO TỪNG BỘ
   *
   * Mỗi card là một bộ thiết kế.
   * Một bộ có thể có 1, 10 hoặc 100 ảnh.
   * ==================================================
   */

  const galleryData = {
    "poster-01": {
      title: "Poster sự kiện thể thao",
      category: "Poster",
      images: [
        "images/poster/poster-01.jpg"
        // Thêm ảnh tại đây:
        // ,"images/poster/poster-02.jpg"
        // ,"images/poster/poster-03.jpg"
        // ,"images/poster/poster-04.jpg"
      ]
    },

    "banner-01": {
      title: "Banner quảng cáo sản phẩm",
      category: "Banner",
      images: [
        "images/banner/banner-01.png"
        // ,"images/banner/banner-02.png"
        // ,"images/banner/banner-03.png"
        // ,"images/banner/banner-04.png"
      ]
    },

    "menu-01": {
      title: "Thiết kế menu nhà hàng",
      category: "Menu",
      images: [
        "images/menu/menu-01.jpg"
        // ,"images/menu/menu-02.jpg"
        // ,"images/menu/menu-03.jpg"
        // ,"images/menu/menu-04.jpg"
      ]
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

  const galleryButtons = Array.from(
    document.querySelectorAll(".design-image[data-gallery-id]")
  );

  let currentGallery = null;
  let currentIndex = 0;

  // Tự cập nhật số lượng ảnh trên từng card
  galleryButtons.forEach((button) => {
    const gallery = galleryData[button.dataset.galleryId];
    const countElement = button.querySelector(".design-count");

    if (gallery && countElement) {
      countElement.textContent = `${gallery.images.length} ${gallery.images.length === 1 ? "thiết kế" : "thiết kế"}`;
    }
  });

  function updateLightbox() {
    if (!currentGallery || !currentGallery.images.length) return;

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

    if (multiple) {
      new Image().src = currentGallery.images[
        (currentIndex + 1) % currentGallery.images.length
      ];
      new Image().src = currentGallery.images[
        (currentIndex - 1 + currentGallery.images.length) % currentGallery.images.length
      ];
    }
  }

  function openGallery(galleryId, index = 0) {
    const gallery = galleryData[galleryId];
    if (!gallery || !gallery.images.length || !lightbox) return;

    currentGallery = gallery;
    currentIndex = Math.max(0, Math.min(index, gallery.images.length - 1));
    updateLightbox();

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");

    setTimeout(() => {
      if (!lightbox.classList.contains("active")) {
        lightboxImage.src = "";
      }
    }, 200);
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

  galleryButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openGallery(button.dataset.galleryId);
    });
  });

  lightboxClose?.addEventListener("click", closeLightbox);

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

  // Vuốt trái/phải trên điện thoại
  let touchStartX = 0;

  lightbox?.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });

  lightbox?.addEventListener("touchend", (event) => {
    const touchEndX = event.changedTouches[0].screenX;
    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) < 50) return;
    if (distance < 0) nextImage();
    else previousImage();
  }, { passive: true });

  /*
   * ==================================================
   * CONTACT FORM
   *
   * Chưa điền thông tin EmailJS vì bạn chưa cung cấp
   * Public Key / Service ID / Template ID.
   *
   * Tạm thời form sẽ mở email người dùng.
   * Bạn có thể cấu hình EmailJS sau.
   * ==================================================
   */

  const contactForm =
    document.getElementById(
      "contactForm"
    );

  const formNote =
    document.getElementById(
      "formNote"
    );


  if (
    contactForm &&
    formNote
  ) {

    contactForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        const formData =
          new FormData(
            contactForm
          );


        const name =
          formData.get("name") || "";


        const email =
          formData.get("email") || "";


        const message =
          formData.get("message") || "";


        /*
         * Tạo email bằng mailto.
         *
         * Cách này không cần Service ID
         * hay Template ID.
         */

        const subject =
          encodeURIComponent(
            "Liên hệ từ Portfolio - " +
            name
          );


        const body =
          encodeURIComponent(
            "Họ và tên: " +
            name +
            "\nEmail: " +
            email +
            "\n\nNội dung:\n" +
            message
          );


        window.location.href =
          "mailto:contactjob.thienthanh@gmail.com" +
          "?subject=" +
          subject +
          "&body=" +
          body;


        formNote.textContent =
          "Đang mở ứng dụng email của bạn...";

      }
    );

  }

});
