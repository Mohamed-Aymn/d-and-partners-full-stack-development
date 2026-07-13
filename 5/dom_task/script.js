
let count = 0;
let numberInput = document.getElementById("number");


let counterValue = document.getElementById("count");
let incBtn = document.getElementById("increase");
let decBtn = document.getElementById("decrease");


incBtn.addEventListener("click", () => {
  count += parseInt(numberInput.value) || 0;
  counterValue.innerText = count;
});

decBtn.addEventListener("click", () => {
  count -= parseInt(numberInput.value) || 0;
  counterValue.innerText = count;
});
