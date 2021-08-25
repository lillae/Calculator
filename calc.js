'use strict';

const Calculator = {
  prevText: null,
  currentText: null,
  lastOperator: null,
  button: [
    {className: 'bigger reset', value: 'RES'},
    {className: 'bigger delete', value: 'DEL'},
    {className: 'nr', value: '1'},
    {className: 'nr', value: '2'},
    {className: 'nr', value: '3'},
    {className: 'operator', value: '+'},
    {className: 'nr', value: '4'},
    {className: 'nr', value: '5'},
    {className: 'nr', value: '6'},
    {className: 'operator', value: '-'},
    {className: 'nr', value: '7'},
    {className: 'nr', value: '8'},
    {className: 'nr', value: '9'},
    {className: 'toggle', value: '- / +'},
    {className: 'nr', value: '0'},
    {className: 'bigger equal', value: '='},
  ],

  init() {
    this.renderCalculator();

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

  renderCalculator: function () {
      this.generateCalculationHtmlElement();
      this.generateButtonHtmlElement();
  },

  generateCalculationHtmlElement: function () {
    const calculationDiv = document.createElement('div');
    calculationDiv.className = 'calculation';

    const prevDiv = document.createElement('div');
    prevDiv.className = 'prev';

    const currentDiv = document.createElement('div');
    currentDiv.className = 'current';

    calculationDiv.append(prevDiv, currentDiv);

    document.getElementById('calculator').append(calculationDiv);
  },

  generateButtonHtmlElement: function () {
    const calculatorDiv = document.getElementById('calculator');

    this.button.forEach(v => {
      const button = document.createElement('button');
      button.className = 'btn ' + v.className;
      button.innerText = v.value;

      calculatorDiv.append(button);
    })
  }
};

Calculator.init();
