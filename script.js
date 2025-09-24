const navToggle = document.querySelector(".nav-toggle");
const navLinksWrapper = document.querySelector(".nav-links");
const navMenuLinks = document.querySelectorAll(".nav-menu a");
const workEls = document.querySelectorAll(".work-box");
const workImgs = document.querySelectorAll(".work-img");
const mainEl = document.querySelector("main");
const yearEl = document.querySelector(".footer-text span");

const setNavState = (isOpen) => {
  if (!navToggle || !navLinksWrapper) return;

  navToggle.setAttribute("aria-expanded", isOpen);
  navToggle.classList.toggle("is-open", isOpen);
  navLinksWrapper.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("lock-screen", isOpen);
};

if (navToggle && navLinksWrapper) {
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    setNavState(!isExpanded);
  });
}

navMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!navToggle) return;

    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      setNavState(false);
      navToggle.focus();
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    navLinksWrapper?.classList.contains("is-open")
  ) {
    setNavState(false);
    navToggle?.focus();
  }
});

// Animating work instances on scroll

workImgs.forEach((workImg) => workImg.classList.add("transform"));

let observer = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;
    const [textbox, picture] = Array.from(entry.target.children);
    if (entry.isIntersecting) {
      picture.classList.remove("transform");
      Array.from(textbox.children).forEach(
        (el) => (el.style.animationPlayState = "running"),
      );
    }
  },
  { threshold: 0.3 },
);

workEls.forEach((workEl) => {
  observer.observe(workEl);
});

// Toggle theme and store user preferred theme for future

const switchThemeEl = document.querySelector('input[type="checkbox"]');
const storedTheme = localStorage.getItem("theme");

switchThemeEl.checked = storedTheme === "dark" || storedTheme === null;

switchThemeEl.addEventListener("click", () => {
  const isChecked = switchThemeEl.checked;

  if (!isChecked) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
    switchThemeEl.checked = false;
  } else {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
});

// Trap the tab when menu is opened

const lastFocusedEl = document.querySelector('a[data-focused="last-focused"]');

document.body.addEventListener("keydown", (event) => {
  const isTab = event.key === "Tab" && !event.shiftKey;
  const navIsOpen = navToggle?.getAttribute("aria-expanded") === "true";

  if (isTab && navIsOpen && document.activeElement === lastFocusedEl) {
    event.preventDefault();
    navToggle.focus();
  }
});

// Rotating logos animation

const logosWrappers = document.querySelectorAll(".logo-group");

const sleep = (number) => new Promise((res) => setTimeout(res, number));

logosWrappers.forEach(async (logoWrapper, i) => {
  const logos = Array.from(logoWrapper.children);
  await sleep(1400 * i);
  setInterval(() => {
    let temp = logos[0];
    logos[0] = logos[1];
    logos[1] = logos[2];
    logos[2] = temp;
    logos[0].classList.add("hide", "to-top");
    logos[1].classList.remove("hide", "to-top", "to-bottom");
    logos[2].classList.add("hide", "to-bottom");
  }, 5600);
});

yearEl.textContent = new Date().getFullYear();
