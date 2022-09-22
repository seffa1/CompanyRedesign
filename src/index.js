// COLLAPSIBLE BUTTON TOGGLER ----------------------------
const collapsibles = document.querySelectorAll(".collapsible");
collapsibles.forEach((item) =>
  item.addEventListener("click", function () {
    this.classList.toggle("collapsible--expanded");
  })
);

// CAROUSEL BUTTON CLICK EVENTS ------------------------------
const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Will either add or subtract to an index depending on the button
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      // goes up the tree until it hits a data-carousel in case theres more than one carousel on the page
      .closest("[data-carousel]")
      // Then selectes the ul list of slides of that carousel
      .querySelector("[data-slides]");
    // find the current active slide
    const activeSlide = slides.querySelector("[data-active]");
    // Unpacks the .children array and returns the index where the active slide is, and either adds or subtracts based on the offset
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    // Loops the index back around if we went out of range
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;
    // Adds data-active to the newly selected slide
    slides.children[newIndex].dataset.active = true;
    // Removes data-active from the previously active slide
    delete activeSlide.dataset.active;
  });
});

// CAROUSEL AUTO CHANGE TIMER ------------------------------
const AUTO_CHANGE_TIMER = true;

function change() {
  const carousels = document.querySelectorAll("[data-carousel]");
  carousels.forEach((carousel) => {
    const slides = carousel.querySelector("[data-slides]");
    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + 1;
    // Loops the index back around if we went out of range
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;
    // Adds data-active to the newly selected slide
    slides.children[newIndex].dataset.active = true;
    // Removes data-active from the previously active slide
    delete activeSlide.dataset.active;
  });
}

window.onload = function () {
  if (!AUTO_CHANGE_TIMER) return;
  setInterval(change, 5000);
};
