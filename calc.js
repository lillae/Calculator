'use strict';

const calculator = document.querySelector('.calculator');

const Calculator = {
  prevText: null,
  currentText: null,
  lastOperator: null,

  init() {
    this.prevText = document.querySelector('.prev');
    this.currentText = document.querySelector('.current');

    document
      .querySelectorAll('.btn')
      .forEach((btn) =>
        btn.addEventListener('click', (e) => this.clickHandler(e))
      );
  },

  clickHandler: function (e) {
    const buttonText = e.currentTarget.innerText;

    switch (e.currentTarget.innerText) {
      case 'RES':
        this.clearHandler();
        break;
      case 'DEL':
        this.deleteHandler();
        break;
      case '+':
      case '-':
        this.chooseOperation(buttonText);
        break;
      case '=':
        this.calculate();
        break;
      case '- / +':
        this.toggleNegativeHandler();
        break;
      default:
        this.appendNumber(buttonText);
        break;
    }
  },

  clearHandler: function () {
    this.prevText.innerText = '';
    this.currentText.innerText = '';
  },

  deleteHandler: function () {
    this.currentText.innerText = this.currentText.innerText
      .toString()
      .slice(0, -1);
    if (this.currentText.innerText === '') {
      this.currentText.innerText = this.prevText.innerText;
      this.prevText.innerText = '';
    }
  },

  appendNumber: function (buttonText) {
    this.currentText.innerText =
      this.currentText.innerText.toString() + buttonText.toString();
  },

  toggleNegativeHandler: function () {
    this.currentText.innerText = -1 * this.currentText.innerText;
  },

  chooseOperation: function (buttonText) {
    if (this.currentText.innerText === '') return;
    if (this.prevText.innerText !== '') {
      this.calculate(buttonText);
    }

    this.prevText.innerText = this.currentText.innerText;
    this.currentText.innerText = '';
    this.lastOperator = buttonText;
  },

  calculate: function (buttonText = '') {
    let result = 0;
    const previousValue = parseInt(this.prevText.innerText);
    const currentValue = parseInt(this.currentText.innerText);

    buttonText = buttonText !== '' ? buttonText : this.lastOperator;

    if (isNaN(previousValue) || isNaN(currentValue)) return;

    result =
      buttonText === '+'
        ? previousValue + currentValue
        : previousValue - currentValue;

    this.currentText.innerText = result;
    this.prevText.innerText = '';
  },
};

const renderCalculator = () => {
  let output = `
  <div class="calculation">
    <div class="prev"></div>
    <div class="current"></div>
  </div>
  <button class="bigger reset btn">RES</button>
  <button class="bigger delete btn">DEL</button>
  <button class="nr btn">1</button>
  <button class="nr btn">2</button>
  <button class="nr btn">3</button>
  <button class="plus operator btn">+</button>
  <button class="nr btn">4</button>
  <button class="nr btn">5</button>
  <button class="nr btn">6</button>
  <button class="minus operator btn">-</button>
  <button class="nr btn">7</button>
  <button class="nr btn">8</button>
  <button class="nr btn">9</button>
  <button class="btn toggle">- / +</button>
  <button class="nr btn">0</button>
  <button class="bigger equal btn">=</button>
  `;
  calculator.insertAdjacentHTML('afterbegin', output);
};

renderCalculator();

Calculator.init();
