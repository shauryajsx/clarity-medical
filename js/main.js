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
  const btnKnowMore = document.querySelector(".btn-know-more");
  const btnExplore = document.querySelector(".btn-explore-product");

  if (btnKnowMore) {
    btnKnowMore.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector("#about") || document.querySelector(".next-section-preview");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  if (btnExplore) {
    btnExplore.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector("#clients") || document.querySelector("#about");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
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
