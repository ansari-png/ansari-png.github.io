
/* ===============================
   PAGE LOAD
================================ */

document.addEventListener("DOMContentLoaded", () => {

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
    {
      threshold: 0.2,
    }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });


  /* ===============================
     HERO PARALLAX EFFECT
  ================================= */

  const hero = document.querySelector(".hero");

  if (hero) {

    window.addEventListener(
      "scroll",
      () => {

        const scrollY = window.scrollY;

        hero.style.backgroundPosition = `center ${scrollY * -0.05}px`;

      },
      { passive: true }
    );

  }


  /* ===============================
     THEME TOGGLE
  ================================= */

  const toggleBtn = document.getElementById("theme-toggle");

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }

  if (toggleBtn) {

    toggleBtn.addEventListener("click", () => {

      document.body.classList.toggle("dark-theme");

      if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }

    });

  }


  /* ===============================
     CONTACT FORM FEEDBACK
  ================================= */

  const form = document.querySelector(".contact-form");

  if (form) {

    form.addEventListener("submit", (e) => {

      e.preventDefault();

      const btn = form.querySelector("button");

      btn.textContent = "Sending...";
      btn.disabled = true;

      setTimeout(() => {

        btn.textContent = "Message Sent ✓";
        btn.style.background = "#22c55e";

      }, 1200);

      setTimeout(() => {

        btn.textContent = "Send Message";
        btn.disabled = false;
        btn.style.background = "";

        form.reset();

      }, 3500);

    });

  }


  /* ===============================
     SMOOTH NAVIGATION SCROLL
  ================================= */

  const navLinks = document.querySelectorAll(".navbar a");

  navLinks.forEach((link) => {

    link.addEventListener("click", (e) => {

      const targetId = link.getAttribute("href");

      if (targetId.startsWith("#")) {

        e.preventDefault();

        const target = document.querySelector(targetId);

        if (target) {

          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

        }

      }

    });

  });


  /* ===============================
     NAVBAR ACTIVE LINK ON SCROLL
  ================================= */

  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }

    });

    navLinks.forEach((link) => {

      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }

    });

  });


});

