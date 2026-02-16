// Theme toggle logic
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleIcon = document.querySelector(".theme-toggle-icon");

function applyTheme(theme) {
  const isDark = theme === "dark";
  
  if (isDark) {
    document.body.classList.add("dark");
    if (themeToggleIcon) themeToggleIcon.textContent = "☀";
  } else {
    document.body.classList.remove("dark");
    if (themeToggleIcon) themeToggleIcon.textContent = "☾";
  }
}

// Load initial theme
const storedTheme = window.localStorage.getItem("theme");
if (storedTheme) {
  applyTheme(storedTheme);
} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  applyTheme("dark");
} else {
  applyTheme("light");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    const nextTheme = isDark ? "light" : "dark";
    applyTheme(nextTheme);
    window.localStorage.setItem("theme", nextTheme);
  });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Add shadow to header on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (!header) return;
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Highlight active navigation link
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a[href^='#']");

function setActiveLink() {
  let currentId = "";
  const offset = 150;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top - offset <= 0 && rect.bottom - offset > 0) {
      currentId = section.id;
    }
  });
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    const id = href.replace("#", "");
    if (id === currentId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinksContainer = document.querySelector(".nav-links");

if (navToggle && navLinksContainer) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinksContainer.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  navLinksContainer.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", () => {
      navLinksContainer.classList.remove("open");
      navToggle.classList.remove("open");
    });
  });
}

// Init AOS
window.addEventListener("load", () => {
  if (window.AOS) {
    window.AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80
    });
  }
});

// Scroll-to-top arrow
const scrollTopButton = document.querySelector(".scroll-top");

function updateScrollTopVisibility() {
  if (!scrollTopButton) return;
  const scrolled = window.scrollY || document.documentElement.scrollTop;
  if (scrolled > 400) {
    scrollTopButton.classList.add("visible");
  } else {
    scrollTopButton.classList.remove("visible");
  }
}

if (scrollTopButton) {
  window.addEventListener("scroll", updateScrollTopVisibility);
  window.addEventListener("load", updateScrollTopVisibility);
  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}