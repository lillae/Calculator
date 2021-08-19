'use strict';

const prevText = document.querySelector('[data-prev]');
const currentText = document.querySelector('[data-current]');
const buttons = document.querySelectorAll('.btn');
const resetBtn = document.querySelector('[data-reset]');
const delBtn = document.querySelector('[data-delete]');
const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operator]');
const equalBtn = document.querySelector('[data-equal]');

class Calculator {
  constructor(prevText, currentText) {
    this.prevText = prevText;
    this.currentText = currentText;
    this.clear();
  }

  clear() {
    this.prev = '';
    this.current = '';
    this.operator = undefined;
  }

  delete() {
    this.current = this.current.toString().slice(0, -1);
    if (this.current === '') {
      this.current = this.prev;
      this.prev = '';
      this.operator = undefined;
    }
  }

  appendNumber(nr) {
    this.current = this.current.toString() + nr.toString();
  }

  chooseOperation(operator) {
    if (this.current === '' && operator == '-') {
      this.appendNumber('-');
      return;
    }

    if (this.current === '') return;
    if (this.prev !== '') {
      this.calculate();
    }

    this.operator = operator;
    this.prev = this.current;
    this.current = '';
  }

  calculate() {
    let result;
    const previousValue = parseInt(this.prev);
    const currentValue = parseInt(this.current);

    if (isNaN(previousValue) || isNaN(currentValue)) return;

    switch (this.operator) {
      case '+':
        result = previousValue + currentValue;
        break;
      case '-':
        result = previousValue - currentValue;
        break;
      default:
        return;
    }
    this.current = result;
    this.operator = undefined;
    this.prev = '';
  }

  getDisplayNr(nr) {
    const floatNr = parseFloat(nr);
    if (isNaN(floatNr)) return '';
    return floatNr.toLocaleString('en');
  }

  updateDisplay() {
    this.currentText.innerText = this.getDisplayNr(this.current);
    // this.prevText.innerText = this.prev;
    if (this.operator != null) {
      this.prevText.innerText = ` ${this.getDisplayNr(this.prev)} ${
        this.operator
      }`;
    } else {
      this.prevText.innerText = '';
    }
  }
}

const calculator = new Calculator(prevText, currentText);

numberBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
  });
});

operationBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    calculator.chooseOperation(btn.innerText);

    calculator.updateDisplay();
  });
});

equalBtn.addEventListener('click', (btn) => {
  calculator.calculate();
  calculator.updateDisplay();
});

resetBtn.addEventListener('click', (btn) => {
  calculator.clear();
  calculator.updateDisplay();
});

delBtn.addEventListener('click', (btn) => {
  calculator.delete();
  calculator.updateDisplay();
});
