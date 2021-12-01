const display = document.getElementById('display');
const numbersBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const resultBtn = document.getElementById('equals');

let calculator = {
  problem: '',
  operand: false,
};

// Event listeners
numbersBtns.forEach(button => {
  button.addEventListener('click', () => {
    if (calculator.operand) {
      clearForNew(button);
    } else {
      updateDisplay(button);
    }
    addDigit(button);
  });
});

operatorBtns.forEach(button => {
  button.addEventListener('click', () => {
    switch (button.id) {
      case 'delete':
        deleteNumbers();
        break;
      case 'divide':
        divide();
        break;
      case 'times':
        times();
        break;
      case 'minus':
        minus();
        break;
      case 'plus':
        plus();
        break;
    }

    console.log(calculator);
  });
});

resultBtn.addEventListener('click', () => {
  calculate(calculator.problem);
});

// Functions
function updateDisplay(button) {
  display.textContent += button.textContent;
}

function clearForNew(button) {
  display.textContent = button.textContent;
  calculator.operand = false;
}

function addDigit(button) {
  if (button.classList.contains('number')) {
    calculator.problem += button.textContent;
  } else {
    addOperand(button.id);
  }
}

function deleteNumbers() {
  display.textContent = '';
  calculator.problem = '';
  calculator.operand = false;
}

// Operands
function divide() {
  calculator.problem += '/';
  calculator.operand = true;
}
function times() {
  calculator.problem += '*';
  calculator.operand = true;
}
function minus() {
  calculator.problem += '-';
  calculator.operand = true;
}
function plus() {
  calculator.problem += '+';
  calculator.operand = true;
}

function calculate(problem) {
  const solution = eval(problem);
  display.textContent = solution;
  calculator.operand = true;
  console.log(calculator);
}
