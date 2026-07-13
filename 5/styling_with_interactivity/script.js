
var carouselBody = document.querySelector(".carousel__body");
var nextBtn = document.querySelector(".carousel__controller--next");
var backBtn = document.querySelector(".carousel__controller--back");

var count = 3;
var step = 100 / count;
var currentStep = 0;

nextBtn.addEventListener("click", () => {
  if (currentStep === 2 * step) {
    return;
  }
  currentStep += step;
  carouselBody.style.transform = `translateX(${currentStep * -1}%)`;
});

backBtn.addEventListener("click", () => {
  if (currentStep === 0) {
    return;
  }
  currentStep -= step;
  carouselBody.style.transform = `translateX(${currentStep * -1}%)`;
});