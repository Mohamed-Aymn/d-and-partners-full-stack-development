
let count = 0;


let counterValue = document.getElementById("count");
let incBtn = document.getElementById("increase");
let decBtn = document.getElementById("decrease");


incBtn.addEventListener("click", () => {
  count++;
  counterValue.innerText = count;
});

decBtn.addEventListener("click", () => {
  count--;
  counterValue.innerText = count;
});