/* ========================================
   LOADER
======================================== */
window.addEventListener("load", function () {
  var loader = document.getElementById("loader");
  if (loader) {
    setTimeout(function () {
      loader.classList.add("hidden");
    }, 1200);
  }
});

/* ========================================
   CURSOR GLOW (desktop only)
======================================== */
(function () {
  var cursorGlow = document.getElementById("cursorGlow");
  if (!cursorGlow) return;

  var mouseX = 0;
  var mouseY = 0;
  var glowX = 0;
  var glowY = 0;

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;
    cursorGlow.style.left = glowX + "px";
    cursorGlow.style.top = glowY + "px";
    requestAnimationFrame(animateGlow);
  }

  animateGlow();
})();

/* ========================================
   NAVBAR SCROLL EFFECT
======================================== */
(function () {
  var navbar = document.getElementById("navbar");
  if (!navbar) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
})();

/* ========================================
   HAMBURGER MENU
======================================== */
(function () {
  var hamburger = document.getElementById("hamburger");
  var navLinks = document.getElementById("navLinks");
  var navOverlay = document.getElementById("navOverlay");

  if (!hamburger || !navLinks) return;

  function closeMenu() {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    if (navOverlay) navOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openMenu() {
    hamburger.classList.add("active");
    navLinks.classList.add("active");
    if (navOverlay) navOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  hamburger.addEventListener("click", function () {
    if (navLinks.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when a link is clicked
  var links = navLinks.querySelectorAll(".nav-link");
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", closeMenu);
  }

  // Close menu on overlay click
  if (navOverlay) {
    navOverlay.addEventListener("click", closeMenu);
  }
})();

/* ========================================
   TYPEWRITER EFFECT
======================================== */
(function () {
  var typewriterEl = document.getElementById("typewriter");
  if (!typewriterEl) return;

  var phrases = [
    "Full-Stack Developer",
    "Blockchain Enthusiast",
    "React Native Developer",
    "AI/ML Explorer",
    "Problem Solver",
  ];

  var phraseIndex = 0;
  var charIndex = 0;
  var isDeleting = false;

  function type() {
    var currentPhrase = phrases[phraseIndex];
    var speed;

    if (isDeleting) {
      charIndex--;
      speed = 40;
    } else {
      charIndex++;
      speed = 80;
    }

    typewriterEl.textContent = currentPhrase.substring(0, charIndex);

    if (!isDeleting && charIndex === currentPhrase.length) {
      speed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 400; // Pause before next word
    }

    setTimeout(type, speed);
  }

  // Start after loader finishes
  setTimeout(type, 1500);
})();

/* ========================================
   COUNTER ANIMATION
======================================== */
(function () {
  var counted = false;

  function animateCounters() {
    if (counted) return;
    counted = true;

    var numbers = document.querySelectorAll(".stat-number");
    for (var i = 0; i < numbers.length; i++) {
      (function (el) {
        var target = parseInt(el.getAttribute("data-target"), 10);
        if (isNaN(target)) return;

        var current = 0;
        var duration = 1500;
        var stepTime = 16;
        var steps = Math.ceil(duration / stepTime);
        var increment = target / steps;

        function update() {
          current += increment;
          if (current >= target) {
            el.textContent = target;
          } else {
            el.textContent = Math.ceil(current);
            requestAnimationFrame(update);
          }
        }

        update();
      })(numbers[i]);
    }
  }

  // Observe hero stats to trigger counter
  var heroStats = document.getElementById("heroStats");
  if (heroStats && "IntersectionObserver" in window) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counterObserver.observe(heroStats);
  }
})();

/* ========================================
   SCROLL REVEAL ANIMATION
======================================== */
(function () {
  if (!("IntersectionObserver" in window)) {
    // Fallback: just show everything
    var items = document.querySelectorAll(".reveal-item");
    for (var i = 0; i < items.length; i++) {
      items[i].classList.add("visible");
    }
    return;
  }

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Add stagger delay based on sibling index
          var parent = entry.target.parentElement;
          var siblings = parent
            ? parent.querySelectorAll(".reveal-item")
            : [];
          var index = Array.prototype.indexOf.call(siblings, entry.target);
          var delay = index >= 0 ? index * 80 : 0;

          setTimeout(function () {
            entry.target.classList.add("visible");
          }, delay);

          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  var revealItems = document.querySelectorAll(".reveal-item");
  for (var i = 0; i < revealItems.length; i++) {
    revealObserver.observe(revealItems[i]);
  }
})();

/* ========================================
   ACTIVE NAV LINK ON SCROLL
======================================== */
(function () {
  var sections = document.querySelectorAll("section[id]");
  var navLinksAll = document.querySelectorAll(".nav-link");

  if (sections.length === 0 || navLinksAll.length === 0) return;

  function highlightNav() {
    var scrollY = window.scrollY + 120;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute("id");

      if (scrollY >= top && scrollY < top + height) {
        navLinksAll.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  var scrollTimer = null;
  window.addEventListener("scroll", function () {
    if (scrollTimer) return;
    scrollTimer = setTimeout(function () {
      highlightNav();
      scrollTimer = null;
    }, 50);
  });
})();