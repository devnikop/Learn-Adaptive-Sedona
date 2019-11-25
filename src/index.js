"use strict";

const jsEnable = document.querySelector(".no-script");
if (jsEnable) {
  jsEnable.classList.remove("no-script");
}

const navigationElement = document.querySelector(".navigation");
if (navigationElement) {
  const navigationOpenElement = navigationElement.querySelector(
    ".navigation__open"
  );
  const navigationCloseElement = navigationElement.querySelector(
    ".navigation__close"
  );

  navigationElement.classList.add("navigation--closed");

  if (navigationOpenElement && navigationCloseElement) {
    navigationOpenElement.addEventListener("click", () => {
      navigationElement.classList.remove("navigation--closed");
    });

    navigationCloseElement.addEventListener("click", () => {
      navigationElement.classList.add("navigation--closed");
    });
  }
}

// form.html modal
const formModal = () => {
  const modalFailureElement = document.querySelector(`.modal--failure`);
  if (!modalFailureElement) {
    return;
  }
  const modalFailureCloseElement = modalFailureElement.querySelector(
    `.modal__close`
  );

  const containerElement = document.querySelector(`.form`);
  if (!containerElement) {
    return;
  }
};

formModal();
