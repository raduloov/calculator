const display = document.getElementById('display');
const numbersBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const resultBtn = document.getElementById('equals');

let calculator = {
  problem: '',
  operand: false,
  result: false,
};

// Event listeners
numbersBtns.forEach(button => {
  button.addEventListener('click', () => {
    if (calculator.operand) {
      clearForNew(button);
      if (calculator.result) {
        calculator.problem = '';
      }
    }
    if (!calculator.operand) {
      updateDisplay(button);
    }
    if (calculator.operand && calculator.result) {
      calculator.result = false;
    }

    addDigit(button);
    console.log(calculator);
  });
});

operatorBtns.forEach(button => {
  button.addEventListener('click', () => {
    if (calculator.operand && button.id !== 'delete') calculate(calculator.problem);

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
  calculator.result = true;
});

// Functions
function updateDisplay(button) {
  display.textContent += button.textContent;
}

function clearForNew(button) {
  display.textContent = button.textContent;
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
  calculator.result = false;
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
  let solution = eval(problem);

  if (solution !== Infinity) {
    if (isFloat(solution)) {
      const length = solution.toString().slice(solution.toString().indexOf('.') + 1).length;
      console.log(length);
      length <= 4
        ? (solution = solution.toFixed(length).replace('.', ','))
        : (solution = solution.toFixed(4).replace('.', ','));
    }
    display.textContent = solution;
    calculator.problem = solution;
  } else {
    display.textContent = 0;
    calculator.problem = '';
  }

  console.log(calculator);
}

function isFloat(n) {
  return n === +n && n !== (n | 0);
}
