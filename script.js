// Mark that JavaScript is running (enables the scroll animations)
document.documentElement.classList.add("js");

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.getElementById("nav-links");
const setMenu = (open) => {
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  navLinks.classList.toggle("is-open", open);
};
menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
// Close the menu with Escape or a tap outside it
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
document.addEventListener("click", (e) => {
  if (navLinks.classList.contains("is-open") && !e.target.closest(".nav")) setMenu(false);
});

// Image fallback: if an image file is missing, show a label instead of a broken image
document.querySelectorAll("img[data-fallback]").forEach((img) => {
  const swap = () => {
    const box = document.createElement("div");
    box.className = "img-fallback";
    box.textContent = img.dataset.fallback;
    img.replaceWith(box);
  };
  if (img.complete && img.naturalWidth === 0) swap();
  else img.addEventListener("error", swap);
});

// Project filters
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");
filters.forEach((btn) =>
  btn.addEventListener("click", () => {
    filters.forEach((b) => { b.classList.remove("is-active"); b.setAttribute("aria-pressed", "false"); });
    btn.classList.add("is-active");
    btn.setAttribute("aria-pressed", "true");
    const cat = btn.dataset.filter;
    projects.forEach((p) => p.classList.toggle("is-hidden", cat !== "all" && p.dataset.cat !== cat));
  })
);

if ("IntersectionObserver" in window) {
  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // Highlight the nav link for the section on screen
  // (skips the Contact button, which already has its own style)
  const sections = document.querySelectorAll("main section[id]");
  const linkFor = (id) => navLinks.querySelector(`a[href="#${id}"]:not(.nav-cta)`);
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.querySelectorAll("a").forEach((a) => a.classList.remove("is-current"));
      const link = linkFor(e.target.id);
      if (link) link.classList.add("is-current");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => navIO.observe(s));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
}
