'use strict';

const prevText = document.querySelector('.prev');
const currentText = document.querySelector('.current');
const buttons = document.querySelectorAll('.btn');
const resetBtn = document.querySelector('.reset');
const delBtn = document.querySelector('.delete');
const numberBtn = document.querySelectorAll('.nr');
const operationBtn = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');
const toggle = document.querySelector('.toggle');

const Calculator = {
  init() {
    numberBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.appendNumber(btn.innerText);
      });
    });

    operationBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.chooseOperation(btn.innerText);
      });
    });

    equalBtn.addEventListener('click', (btn) => {
      this.calculate();
    });

    resetBtn.addEventListener('click', (btn) => {
      this.clearHandler();
    });

    delBtn.addEventListener('click', (btn) => {
      this.deleteHandler();
    });

    toggle.addEventListener('click', (btn) => {
      if (currentText.innerText !== '') {
        this.toggleNegativeHandler();
      }
    });
  },

  clearHandler: () => {
    prevText.innerText = '';
    currentText.innerText = '';
    operationBtn.innerText = null;
    Calculator.updateDisplay();
  },

  deleteHandler: () => {
    currentText.innerText = currentText.innerText.toString().slice(0, -1);
    if (currentText.innerText === '') {
      currentText.innerText = prevText.innerText;
      prevText.innerText = '';
      operationBtn.innerText = null;
    }
    Calculator.updateDisplay();
  },

  appendNumber: (nr) => {
    currentText.innerText = currentText.innerText.toString() + nr.toString();
    Calculator.updateDisplay();
  },

  toggleNegativeHandler: () => {
    currentText.innerText = -1 * currentText.innerText;
    Calculator.updateDisplay();
  },

  chooseOperation: (operator) => {
    if (currentText.innerText === '') return;
    if (prevText.innerText !== '') {
      Calculator.calculate();
    }

    operationBtn.innerText = operator;
    prevText.innerText = currentText.innerText;
    currentText.innerText = '';
    Calculator.updateDisplay();
  },

  calculate: () => {
    let result;
    const previousValue = parseInt(prevText.innerText);
    const currentValue = parseInt(currentText.innerText);

    if (isNaN(previousValue) || isNaN(currentValue)) return;

    switch (operationBtn.innerText) {
      case '+':
        result = previousValue + currentValue;
        break;
      case '-':
        result = previousValue - currentValue;
        break;
      default:
        return;
    }
    currentText.innerText = result;
    operationBtn.innerText = null;
    prevText.innerText = '';

    Calculator.updateDisplay();
  },

  getDisplayNr: (nr) => {
    const floatNr = parseFloat(nr);
    if (isNaN(floatNr)) return '';
    return floatNr.toLocaleString('en');
  },

  updateDisplay: () => {
    currentText.innerText = Calculator.getDisplayNr(currentText.innerText);

    if (operationBtn.innerText != null) {
      prevText.innerText = ` ${Calculator.getDisplayNr(prevText.innerText)} ${
        operationBtn.innerText
      }`;
    } else {
      prevText.innerText = '';
    }
  },
};

Calculator.init();
