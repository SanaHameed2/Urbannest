const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav-actions");

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});
