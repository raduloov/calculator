const display = document.getElementById('display');
const operand = document.getElementById('operand');
const problemEl = document.getElementById('problem');
const numbersBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const resultBtn = document.getElementById('equals');

let calculator = {
  problem: '',
  operand: false,
  number: false,
  result: false,
};

// Event listeners
numbersBtns.forEach(button => {
  button.addEventListener('click', () => {
    // Limitations for the use of decimal point
    if (button.id === 'dec-point') {
      let lastNumber;
      if (calculator.problem === '.') {
        return;
      }
      if (/[\+\-\*\/]/.test(calculator.problem)) {
        lastNumber = calculator.problem.match(/([\-\+\*\/])(\d+\.+|\d+)/);
      } else {
        lastNumber = calculator.problem.match(/([\-\d\.][\d\.]+)/);
      }
      if (calculator.operand) {
        lastNumber = calculator.problem.match(/([\-\d\.][\d\.]+)/);
      }

      if (lastNumber !== null && lastNumber !== undefined) {
        if (lastNumber[0].includes('.')) {
          return;
        }
      }
    }

    // false false false
    if (!calculator.operand && !calculator.number && !calculator.result) {
      updateDisplay(button);
    }
    // false true false
    if (!calculator.operand && calculator.number && !calculator.result) {
      updateDisplay(button);
    }
    // true false false
    if (calculator.operand && !calculator.number && !calculator.result) {
      clearDisplay(button);
    }
    // false true true
    if (!calculator.operand && calculator.number && calculator.result) {
      clearProblem();
      clearDisplay(button);

      calculator.result = false;
    }
    // true false true
    if (calculator.operand && !calculator.number && calculator.result) {
      clearProblem();
      clearDisplay(button);
    }

    calculator.operand = false;
    calculator.number = true;
    calculator.result = false;

    addDigit(button);
    displayGlow();
    updateProblem(calculator.problem);
    console.log(calculator);
  });
});

operatorBtns.forEach(button => {
  button.addEventListener('click', () => {
    if (!calculator.operand && button.id !== 'delete') calculate(calculator.problem);

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
      case 'plus':
        plus();
        break;
      case 'minus':
        if (calculator.operand) {
          minus();
          clearDisplay(button);
        } else {
          minus();
        }
        break;
    }

    if (button.id !== 'delete') displayOperand(button);
    if (button.id !== 'delete' && button.id !== 'minus') calculator.operand = true;
    calculator.number = false;
    calculator.result = false;
    console.log(calculator);

    displayGlow();
  });
});

resultBtn.addEventListener('click', () => {
  calculator.result = true;
  calculate(calculator.problem);
  displayGlow();
  displayOperand(resultBtn);
  console.log(calculator);
});

// Functions
function updateDisplay(button) {
  display.textContent += button.textContent;
}

function clearDisplay(button) {
  display.textContent = button.textContent;
}

function addDigit(button) {
  calculator.problem += button.textContent;
}

function clearProblem() {
  calculator.problem = '';
}

function deleteNumbers() {
  calculator.problem = '';
  display.textContent = '';
  problemEl.textContent = '';
  operand.textContent = '';
  calculator.operand = false;
  calculator.number = false;
  calculator.result = false;
}

function divide() {
  if (calculator.problem === undefined || calculator.problem === '') {
    calculator.problem = '';
    return;
  }

  // If "times" is pressed after "divide"
  if (calculator.problem[calculator.problem.length - 1] === '*') {
    calculator.problem = calculator.problem.replace('*', '');
  }

  calculator.problem += '/';
}
function times() {
  if (calculator.problem === undefined || calculator.problem === '') {
    calculator.problem = '';
    return;
  }

  // If "divide" is pressed after "times"
  if (calculator.problem[calculator.problem.length - 1] === '/') {
    calculator.problem = calculator.problem.replace('/', '');
  }

  calculator.problem += '*';
}
function plus() {
  if (calculator.problem === undefined || calculator.problem === '') {
    calculator.problem = '';
    return;
  }
  calculator.problem += '+';
}
function minus() {
  // If minus is used to make the number negative
  if (calculator.problem === undefined) {
    calculator.problem = '-';
    display.textContent = '-';
  } else if (calculator.operand) {
    calculator.problem += '-';
    calculator.operand = false;
  } else if (!calculator.operand) {
    calculator.problem += '-';
    calculator.operand = true;
  }
}

function updateProblem(problem) {
  problemEl.textContent = problem;
}

function displayOperand(button) {
  operand.textContent = button.textContent;
}

function calculate(problem) {
  // If two "minus" are after one another, add parenthesies
  if (/(-{2})/.test(problem)) {
    problem = problem.split('');
    problem.splice(problem.indexOf('-') + 1, 0, '(');
    problem.splice(problem.length, 0, ')');
    problem = problem.join('');
  }

  let solution;

  // If eval() doesn't work, catch the error and fix solution
  try {
    solution = eval(problem);
  } catch (err) {
    solution = problem.slice(0, problem.search(/[\+\-\*\/]+/));
  }

  // If number is divided by 0, display 0
  if (solution === Infinity || solution === -Infinity) {
    display.textContent = 0;
    calculator.problem = '';
  } else {
    // If solution is float fix the number to a max of 4 numbers after decimal point
    if (isFloat(solution)) {
      const length = solution.toString().slice(solution.toString().indexOf('.') + 1).length;
      console.log(length);
      length <= 4 ? (solution = solution.toFixed(length)) : (solution = solution.toFixed(4));

      // If solution has 0s at the end, remove them
      for (let i = length - 1; i >= 0; i--) {
        if (solution[i] == 0) {
          solution.split('').splice(i, 1).join('');
        }
      }
    }

    display.textContent = solution;
    calculator.problem = solution;
  }
}

function isFloat(n) {
  return n === +n && n !== (n | 0);
}

function displayGlow() {
  const displayBox = document.querySelector('.display');

  displayBox.classList.add('glow');
  setTimeout(() => {
    displayBox.classList.remove('glow');
  }, 150);
}
