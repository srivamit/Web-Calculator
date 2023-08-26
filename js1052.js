const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let operator = "";
let result = null;
let expression = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      clear();
    } else if (value === "Enter") {
      calculate();
    } else if (value.match(/[0-9]/)) {
      appendNumber(value);
    } else if (value.match(/[\+\-\*\/]/)) {
      setOperator(value);
    }
  });
});

function clear() {
  currentInput = "";
  operator = "";
  result = null;
  expression = "";
  display.value = "";
}

function appendNumber(number) {
  currentInput += number;
  expression += number;
  display.value = expression;
}

function setOperator(newOperator) {
  if (currentInput !== "") {
    if (result !== null) {
      calculate();
    }
    operator = newOperator;
    expression += " " + newOperator + " ";
    result = parseFloat(currentInput);
    currentInput = "";
    display.value = expression;
  }
}

function calculate() {
  if (currentInput !== "") {
    const inputValue = parseFloat(currentInput);
    switch (operator) {
      case "+":
        result += inputValue;
        break;
      case "-":
        result -= inputValue;
        break;
      case "*":
        result *= inputValue;
        break;
      case "/":
        if (inputValue === 0) {
          clear();
          display.value = "Error: Division by zero";
          return;
        }
        result /= inputValue;
        break;
    }
    expression += " = " + result;
    display.value = expression;
    currentInput = result.toString();
    operator = "";
    result = null;
  }
}
