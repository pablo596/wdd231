// navigation.js

// Select the button and the nav
const menuBtn = document.getElementById("menuBtn");
const primaryNav = document.getElementById("primaryNav");

menuBtn.addEventListener("click", () => {
  // Toggle the menu
  if (primaryNav.classList.contains("nav-closed")) {
    primaryNav.classList.remove("nav-closed");
    primaryNav.classList.add("nav-open");
    primaryNav.querySelector("ul").style.display = "block";
  } else {
    primaryNav.classList.remove("nav-open");
    primaryNav.classList.add("nav-closed");
    primaryNav.querySelector("ul").style.display = "none";
  }
});
