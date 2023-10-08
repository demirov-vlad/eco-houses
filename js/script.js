const swiper = new Swiper(".slider-materials", {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

window.addEventListener("scroll", function () {
  scrollY > 0
    ? document.querySelector(".header").classList.add("scroll")
    : document.querySelector(".header").classList.remove("scroll");
});

// device type recognition
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

//show the arrow for sub-menu on mobile screens

if (isMobile.any()) {
  document.body.classList.add("_touch");
  let menuArrows = document.querySelectorAll(".menu__arrow");
  if (menuArrows.length > 0) {
    for (let index = 0; index < menuArrows.length; index++) {
      const menuArrow = menuArrows[index];
      menuArrow.addEventListener("click", () => {
        menuArrow.parentElement.classList.toggle("_active");
      });
    }
  }
} else {
  document.body.classList.add("_pc");
}

//burger menu

const menuIcon = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".header__body");
if (menuIcon) {
  menuIcon.addEventListener("click", () => {
    document.body.classList.toggle("_lock");
    menuIcon.classList.toggle("_active");
    menuBody.classList.toggle("_active");
  });
}

// scroll to section on click

const menuLinks = document.querySelectorAll(".menu__link[data-goto]");

if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top +
        scrollY -
        document.querySelector("header").offsetHeight;
      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
      if (menuIcon.classList.contains("_active")) {
        menuBody.classList.remove("_active");
        document.body.classList.remove("_lock");
        menuIcon.classList.remove("_active");
      }
    }
  }
}
