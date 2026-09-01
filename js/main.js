/**
 * Clarity Medical Pvt Ltd - Main JavaScript Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation toggle
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navMenu.style.display === "flex";
      navMenu.style.display = isOpen ? "none" : "flex";
      if (!isOpen) {
        navMenu.style.flexDirection = "column";
        navMenu.style.position = "absolute";
        navMenu.style.top = "100%";
        navMenu.style.left = "0";
        navMenu.style.right = "0";
        navMenu.style.background = "rgba(9, 26, 48, 0.95)";
        navMenu.style.padding = "20px";
        navMenu.style.backdropFilter = "blur(10px)";
      }
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
});
