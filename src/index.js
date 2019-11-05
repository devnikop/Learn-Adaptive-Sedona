"use strict";

const jsEnable = document.querySelector(".no-script");
jsEnable.classList.remove("no-script");

const navigationElement = document.querySelector(".navigation");
const navigationOpenElement = navigationElement.querySelector(
  ".navigation__open"
);
const navigationCloseElement = navigationElement.querySelector(
  ".navigation__close"
);

navigationElement.classList.add("navigation--closed");

navigationOpenElement.addEventListener("click", () => {
  navigationElement.classList.remove("navigation--closed");
});

navigationCloseElement.addEventListener("click", () => {
  navigationElement.classList.add("navigation--closed");
});
