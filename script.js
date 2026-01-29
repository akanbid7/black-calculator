const display = document.querySelector(".display span");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let previousInput = "";
let operator = null;

/* Update display */
function updateDisplay(value) {
  display.textContent = value || "0";
}

/* Clear calculator */
function clearAll() {
  currentInput = "";
  previousInput = "";
  operator = null;
  updateDisplay("0");
}

/* Delete last character */
function backspace() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput);
}

/* Handle number input */
function appendNumber(number) {
  if (number === "." && currentInput.includes(".")) return;
  currentInput += number;
  updateDisplay(currentInput);
}

/* Handle operator input */
function chooseOperator(op) {
  if (currentInput === "") return;

  if (previousInput !== "") {
    calculate();
  }

  operator = op;
  previousInput = currentInput;
  currentInput = "";
}

/* Perform calculation */
function calculate() {
  let computation;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case "+":
      computation = prev + current;
      break;
    case "−":
    case "-":
      computation = prev - current;
      break;
    case "×":
    case "*":
      computation = prev * current;
      break;
    case "÷":
    case "/":
      computation = prev / current;
      break;
    default:
      return;
  }

  currentInput = computation.toString();
  operator = null;
  previousInput = "";
  updateDisplay(currentInput);
}

/* Button click handling */
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (!isNaN(value) || value === ".") {
      appendNumber(value);
    } 
    else if (value === "C") {
      clearAll();
    } 
    else if (value === "⌫") {
      backspace();
    } 
    else if (value === "=") {
      calculate();
    } 
    else {
      chooseOperator(value);
    }
  });
});
