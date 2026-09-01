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

  // ==========================================================================
  // Blog Page Interactive Controllers (Category Filter & Live Search)
  // ==========================================================================
  const blogSearchInput = document.getElementById("blogSearchInput");
  const blogSearchClear = document.getElementById("blogSearchClear");
  const categoryPills = document.querySelectorAll(".category-pill");
  const blogCards = document.querySelectorAll(".blog-card");
  const featuredCard = document.querySelector(".featured-blog-card");
  const articleCountBadge = document.getElementById("articleCountBadge");
  const noResultsNotice = document.getElementById("noResultsNotice");
  const btnResetFilters = document.getElementById("btnResetFilters");
  const blogNewsletterForm = document.getElementById("blogNewsletterForm");

  let activeCategory = "all";
  let activeSearchQuery = "";

  function filterBlogPosts() {
    if (!blogCards.length) return;

    let visibleCount = 0;
    const query = activeSearchQuery.toLowerCase().trim();

    // Filter regular cards
    blogCards.forEach((card) => {
      const category = card.dataset.category || "";
      const title = (card.dataset.title || card.textContent).toLowerCase();

      const matchesCategory = activeCategory === "all" || category === activeCategory;
      const matchesSearch = !query || title.includes(query);

      if (matchesCategory && matchesSearch) {
        card.style.display = "flex";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    // Update featured card visibility
    if (featuredCard) {
      const featuredCategory = featuredCard.dataset.category || "";
      const featuredTitle = featuredCard.textContent.toLowerCase();
      const matchesFeaturedCat = activeCategory === "all" || featuredCategory === activeCategory;
      const matchesFeaturedSearch = !query || featuredTitle.includes(query);

      if (matchesFeaturedCat && matchesFeaturedSearch) {
        featuredCard.style.display = "block";
      } else {
        featuredCard.style.display = "none";
      }
    }

    // Update Count and No Results Notice
    if (articleCountBadge) {
      articleCountBadge.textContent = `Showing ${visibleCount} Article${visibleCount === 1 ? '' : 's'}`;
    }

    if (noResultsNotice) {
      noResultsNotice.style.display = visibleCount === 0 ? "block" : "none";
    }
  }

  // Category Pills Click
  if (categoryPills.length) {
    categoryPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        categoryPills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        activeCategory = pill.dataset.filter || "all";
        filterBlogPosts();
      });
    });
  }

  // Live Search
  if (blogSearchInput) {
    blogSearchInput.addEventListener("input", (e) => {
      activeSearchQuery = e.target.value;
      if (blogSearchClear) {
        blogSearchClear.style.display = activeSearchQuery.length > 0 ? "block" : "none";
      }
      filterBlogPosts();
    });

    if (blogSearchClear) {
      blogSearchClear.addEventListener("click", () => {
        blogSearchInput.value = "";
        activeSearchQuery = "";
        blogSearchClear.style.display = "none";
        blogSearchInput.focus();
        filterBlogPosts();
      });
    }
  }

  // Reset Filters Button
  if (btnResetFilters) {
    btnResetFilters.addEventListener("click", () => {
      activeCategory = "all";
      activeSearchQuery = "";
      if (blogSearchInput) blogSearchInput.value = "";
      if (blogSearchClear) blogSearchClear.style.display = "none";
      categoryPills.forEach((p) => p.classList.toggle("active", p.dataset.filter === "all"));
      filterBlogPosts();
    });
  }

  // Blog Newsletter Subscription Form
  if (blogNewsletterForm) {
    blogNewsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = blogNewsletterForm.querySelector(".btn-newsletter-subscribe");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Subscribed! ✓";
      submitBtn.style.backgroundColor = "#10B981";
      setTimeout(() => {
        blogNewsletterForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = "";
      }, 3500);
    });
  }

  // ==========================================================================
  // Blog Article Page Controllers (Reading Progress & TOC Scroll-Spy)
  // ==========================================================================
  const readingProgressBar = document.getElementById("readingProgressBar");
  const articleContent = document.querySelector(".article-content-column");
  const tocLinks = document.querySelectorAll(".toc-link");
  const articleSections = document.querySelectorAll(".article-section");
  const btnCopyLink = document.getElementById("btnCopyLink");
  const copyBtnText = document.getElementById("copyBtnText");
  const sidebarNewsletterForm = document.getElementById("sidebarNewsletterForm");

  // Reading Progress Bar Calculation
  if (readingProgressBar && articleContent) {
    window.addEventListener("scroll", () => {
      const articleRect = articleContent.getBoundingClientRect();
      const articleTop = articleContent.offsetTop;
      const articleHeight = articleContent.offsetHeight;
      const windowScroll = window.scrollY;
      const windowHeight = window.innerHeight;

      if (windowScroll >= articleTop - 120) {
        const scrolled = ((windowScroll - (articleTop - 120)) / (articleHeight - windowHeight + 200)) * 100;
        readingProgressBar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
      } else {
        readingProgressBar.style.width = "0%";
      }

      // TOC Scroll-Spy
      let currentSectionId = "";
      articleSections.forEach((section) => {
        const top = section.offsetTop - 140;
        if (windowScroll >= top) {
          currentSectionId = section.getAttribute("id");
        }
      });

      if (currentSectionId) {
        tocLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${currentSectionId}`);
        });
      }
    }, { passive: true });
  }

  // Copy Link Button
  if (btnCopyLink && copyBtnText) {
    btnCopyLink.addEventListener("click", () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          const orig = copyBtnText.textContent;
          copyBtnText.textContent = "Copied! ✓";
          btnCopyLink.style.borderColor = "#10B981";
          btnCopyLink.style.color = "#10B981";
          setTimeout(() => {
            copyBtnText.textContent = orig;
            btnCopyLink.style.borderColor = "";
            btnCopyLink.style.color = "";
          }, 2500);
        });
      }
    });
  }

  // Sidebar Newsletter Form
  if (sidebarNewsletterForm) {
    sidebarNewsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = sidebarNewsletterForm.querySelector(".btn-mini-subscribe");
      const orig = btn.textContent;
      btn.textContent = "Subscribed! ✓";
      btn.style.backgroundColor = "#10B981";
      setTimeout(() => {
        sidebarNewsletterForm.reset();
        btn.textContent = orig;
        btn.style.backgroundColor = "";
      }, 3500);
    });
  }
});
