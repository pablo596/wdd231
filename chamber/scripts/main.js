document.addEventListener("DOMContentLoaded", () => {
  // Update footer dates
  const currentYearSpan = document.getElementById("currentYear");
  const lastModifiedSpan = document.getElementById("lastModified");

  const currentYear = new Date().getFullYear();
  currentYearSpan.textContent = currentYear;
  lastModifiedSpan.textContent = document.lastModified;

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
});
