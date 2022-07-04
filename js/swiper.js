////////////
// SWIPER
function swiper() {
  const swiper = new Swiper(".swiper", {
    // direction: "horizontal",
    // loop: true,

    // DOTS PAGINATION
    pagination: {
      el: ".swiper-pagination",
    },

    // ARROWS
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // SCROLLBAR
    scrollbar: {
      el: ".swiper-scrollbar",
    },

    slidesPerView: 3,
  });
}

export { swiper };
