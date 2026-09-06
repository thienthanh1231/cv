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
   * LIGHTBOX
   *
   * Bấm toàn bộ ô sản phẩm
   * → mở ảnh full.
   *
   * Có:
   * - ảnh trước
   * - ảnh sau
   * - nút X
   * - click nền để đóng
   * - phím ESC
   * - phím ← →
   * ==================================================
   */

  const lightbox =
    document.getElementById(
      "imageLightbox"
    );

  const lightboxImage =
    document.getElementById(
      "lightboxImage"
    );

  const lightboxTitle =
    document.getElementById(
      "lightboxTitle"
    );

  const lightboxCategory =
    document.getElementById(
      "lightboxCategory"
    );

  const lightboxClose =
    document.getElementById(
      "lightboxClose"
    );

  const lightboxPrev =
    document.getElementById(
      "lightboxPrev"
    );

  const lightboxNext =
    document.getElementById(
      "lightboxNext"
    );


  const imageButtons =
    Array.from(
      document.querySelectorAll(
        ".design-image[data-image]"
      )
    );


  let currentIndex = 0;


  /*
   * Mở ảnh
   */

  function openLightbox(index) {

    if (
      !imageButtons.length ||
      !lightbox
    ) {
      return;
    }


    /*
     * Đảm bảo index hợp lệ
     */

    currentIndex =
      (
        index +
        imageButtons.length
      ) %
      imageButtons.length;


    const button =
      imageButtons[currentIndex];


    const src =
      button.dataset.image;


    const title =
      button.dataset.title ||
      "Sản phẩm thiết kế";


    const category =
      button.dataset.category ||
      "Design";


    /*
     * QUAN TRỌNG:
     * dùng đường dẫn ảnh gốc
     * chứ không lấy ảnh thumbnail.
     */

    lightboxImage.src = src;

    lightboxImage.alt = title;

    lightboxTitle.textContent =
      title;

    lightboxCategory.textContent =
      category.toUpperCase();


    lightbox.classList.add("active");

    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.classList.add(
      "lightbox-open"
    );


    /*
     * preload ảnh
     */

    const preload =
      new Image();

    preload.src = src;

  }


  /*
   * Đóng ảnh
   */

  function closeLightbox() {

    if (!lightbox) {
      return;
    }


    lightbox.classList.remove(
      "active"
    );


    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.classList.remove(
      "lightbox-open"
    );


    setTimeout(() => {

      if (
        !lightbox.classList.contains(
          "active"
        )
      ) {

        lightboxImage.src = "";

      }

    }, 200);

  }


  /*
   * Ảnh trước
   */

  function previousImage() {

    openLightbox(
      currentIndex - 1
    );

  }


  /*
   * Ảnh sau
   */

  function nextImage() {

    openLightbox(
      currentIndex + 1
    );

  }


  /*
   * CLICK VÀO CARD / ẢNH
   */

  imageButtons.forEach(
    (button, index) => {

      button.addEventListener(
        "click",
        (event) => {

          event.preventDefault();

          openLightbox(index);

        }
      );

    }
  );


  /*
   * Nút X
   */

  if (lightboxClose) {

    lightboxClose.addEventListener(
      "click",
      closeLightbox
    );

  }


  /*
   * Nút trái
   */

  if (lightboxPrev) {

    lightboxPrev.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

        previousImage();

      }
    );

  }


  /*
   * Nút phải
   */

  if (lightboxNext) {

    lightboxNext.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

        nextImage();

      }
    );

  }


  /*
   * Click vùng nền đen
   */

  if (lightbox) {

    lightbox.addEventListener(
      "click",
      (event) => {

        if (
          event.target === lightbox
        ) {

          closeLightbox();

        }

      }
    );

  }


  /*
   * Phím ESC + ← →
   */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        !lightbox ||
        !lightbox.classList.contains(
          "active"
        )
      ) {
        return;
      }


      if (
        event.key === "Escape"
      ) {

        closeLightbox();

      }


      if (
        event.key === "ArrowLeft"
      ) {

        previousImage();

      }


      if (
        event.key === "ArrowRight"
      ) {

        nextImage();

      }

    }
  );


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
