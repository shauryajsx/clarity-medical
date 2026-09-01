/**
 * Clarity Medical Pvt Ltd - Main JavaScript Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation toggle
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-item a");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const isActive = navMenu.classList.toggle("is-open");
      mobileToggle.classList.toggle("is-active", isActive);
      mobileToggle.setAttribute("aria-expanded", isActive);
      document.body.style.overflow = isActive ? "hidden" : "";
    });

    // Close menu when clicking on any nav link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        mobileToggle.classList.remove("is-active");
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  // Smooth click handlers for buttons
  const allBtnsKnowMore = document.querySelectorAll(".btn-know-more, .btn-know-more-navy");
  const allBtnsExplore = document.querySelectorAll(".btn-explore-product, .btn-explore-product-navy");

  allBtnsKnowMore.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector("#about") || document.querySelector(".next-section-preview");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  allBtnsExplore.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector("#categories") || document.querySelector("#products");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Hero Carousel Slider Controller
  const heroSection = document.querySelector(".hero-section");
  const heroSlides = document.querySelectorAll(".hero-slide");
  const heroDots = document.querySelectorAll(".hero-dot");
  const heroPrev = document.getElementById("heroPrev");
  const heroNext = document.getElementById("heroNext");
  const heroSlider = document.getElementById("heroSlider");

  let currentSlide = 0;
  let slideInterval = null;

  function updateSlide(index) {
    if (!heroSlides.length) return;
    
    // Wrap around index
    currentSlide = (index + heroSlides.length) % heroSlides.length;

    // Update slides visibility
    heroSlides.forEach((slide, idx) => {
      if (idx === currentSlide) {
        slide.classList.add("active");
        const theme = slide.dataset.theme || "dark";
        if (heroSection) {
          if (theme === "light") {
            heroSection.classList.remove("hero-theme-dark");
            heroSection.classList.add("hero-theme-light");
          } else {
            heroSection.classList.remove("hero-theme-light");
            heroSection.classList.add("hero-theme-dark");
          }
        }
      } else {
        slide.classList.remove("active");
      }
    });

    // Update dots
    heroDots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentSlide);
    });
  }

  function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(() => {
      updateSlide(currentSlide + 1);
    }, 6000);
  }

  function stopAutoSlide() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  if (heroSlides.length > 1) {
    if (heroPrev) {
      heroPrev.addEventListener("click", () => {
        updateSlide(currentSlide - 1);
        startAutoSlide();
      });
    }

    if (heroNext) {
      heroNext.addEventListener("click", () => {
        updateSlide(currentSlide + 1);
        startAutoSlide();
      });
    }

    heroDots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const slideIdx = parseInt(dot.dataset.slideTo, 10);
        updateSlide(slideIdx);
        startAutoSlide();
      });
    });

    if (heroSlider) {
      heroSlider.addEventListener("mouseenter", stopAutoSlide);
      heroSlider.addEventListener("mouseleave", startAutoSlide);

      // Touch swipe support
      let touchStartX = 0;
      let touchEndX = 0;

      heroSlider.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      heroSlider.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 45) {
          if (diff < 0) {
            updateSlide(currentSlide + 1);
          } else {
            updateSlide(currentSlide - 1);
          }
          startAutoSlide();
        }
      }, { passive: true });
    }

    startAutoSlide();
  }

  // Whitepapers Carousel Navigation
  const btnPrev = document.getElementById("whitepaperPrev");
  const btnNext = document.getElementById("whitepaperNext");
  const whitepapersGrid = document.querySelector(".whitepapers-grid");

  if (btnPrev && btnNext && whitepapersGrid) {
    btnNext.addEventListener("click", () => {
      whitepapersGrid.scrollBy({ left: 340, behavior: "smooth" });
    });

    btnPrev.addEventListener("click", () => {
      whitepapersGrid.scrollBy({ left: -340, behavior: "smooth" });
    });
  }

  // Quote Form Submission Feedback
  const quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    quoteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = quoteForm.querySelector(".btn-request-callback");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Thank you! We'll call you shortly...";
      submitBtn.style.backgroundColor = "#10B981";
      setTimeout(() => {
        quoteForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = "";
      }, 3500);
    });
  }
});
