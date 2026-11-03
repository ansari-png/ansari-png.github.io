document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     DYNAMIC COPYRIGHT YEAR
  ================================= */
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ===============================
     MOBILE NAVBAR TOGGLE
  ================================= */
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll("#nav-menu a");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const icon = navToggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
      }
    });

    // Close menu when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        const icon = navToggle.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-xmark");
        }
      });
    });
  }

  /* ===============================
     SCROLL REVEAL ANIMATION
  ================================= */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  /* ===============================
     NAVBAR ACTIVE LINK ON SCROLL
  ================================= */
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener(
    "scroll",
    () => {
      let currentSection = "";
      const scrollPos = window.scrollY + 140;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSection = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
          link.classList.add("active");
        }
      });
    },
    { passive: true }
  );

  /* ===============================
     CONTACT FORM AJAX (FORMSPREE)
  ================================= */
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector("button[type='submit']");
      const originalHtml = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
          submitBtn.style.background = "#22c55e";
          contactForm.reset();
        } else {
          throw new Error("Form submission failed");
        }
      } catch (err) {
        submitBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Error Sending';
        submitBtn.style.background = "#ef4444";
      }

      setTimeout(() => {
        submitBtn.innerHTML = originalHtml;
        submitBtn.disabled = false;
        submitBtn.style.background = "";
      }, 4000);
    });
  }

});