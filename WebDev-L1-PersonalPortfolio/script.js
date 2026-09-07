/* ==========================================================================
   Personal Portfolio — interactions (vanilla JavaScript)
   • Mobile menu toggle
   • Scroll-spy: highlight the nav link for the section in view
   • Demo contact-form validation
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Mobile menu toggle ---------- */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  toggle.addEventListener("click", function () {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Close the mobile menu after clicking any link
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Scroll-spy ---------- */
  const navAnchors = Array.from(links.querySelectorAll("a"));
  const sections = navAnchors
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navAnchors.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Demo contact form ---------- */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !email || !message) {
      setStatus("Please fill in every field.", "err");
      return;
    }
    if (!emailOk) {
      setStatus("That email address doesn't look right.", "err");
      return;
    }

    // Front-end demo only — connect to a form service or backend to actually send.
    setStatus("Thanks, " + name + "! Your message has been captured (demo).", "ok");
    form.reset();
  });

  function setStatus(text, kind) {
    status.textContent = text;
    status.className = "form__status " + kind;
  }
})();
