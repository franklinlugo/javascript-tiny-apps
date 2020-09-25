import Calculator from './Calculator';
import { parseHTML, isNumber } from './helpers';

// UI variables
const $buttons = document.getElementById('buttons');
const $operation = document.getElementById('operation');
const $result = document.getElementById('result');
const $btnToggleHistory = document.getElementById('toggle-history');
const $history = document.getElementById('history');
const $operationList = document.getElementById('operation-list');

const keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/', '*', '-', '+', '%', 'Enter', '.', 'Backspace'];

/** UI class  */
class UI {
  constructor() {
    this.valueOne = '';
    this.valueTwo = '';
    this.operation = '';
    this.result = null;
    this.history = [];
    this.firstOperation = true;
    this.handleKeyup = this.handleKeyup.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Init app attaching click and keyboard events to UI
   */
  init() {
    $buttons.addEventListener('click', this.handleClick);
    window.addEventListener('keyup', this.handleKeyup);
    $btnToggleHistory.addEventListener('click', this.toggleHistory);
    this.updateResult('0');
    this.calculator = new Calculator();
  }

  /**
   * Handle clicks of UI
   * @param  {object} e - event
   */
  handleClick(e) {
    const button = e.target.dataset.button;
    this.doButtonAction(button);
  }

  /**
   * Handle keyboard events
   * @param  {object} e - event
   */
  handleKeyup(e) {
    const button = e.key;
    if (keys.includes(button)) {
      if (button === 'Enter') {
        this.doButtonAction('=');
      } else if (button === 'Backspace') {
        this.doButtonAction('ac');
      }
      this.doButtonAction(button);
    }
  }

  /**
   * Do an action with value obtained with click or keyboard
   * @param  {string} button - button value
   */
  doButtonAction(button) {
    if (isNumber(button)) {
      // first operation
      if (!this.result) {
        if (!this.valueTwo && !this.operation) {
          this.valueOne += button;
          this.updateOperation();
        } else if (this.valueOne && this.operation) {
          this.valueTwo += button;
          this.updateOperation();
        }
        // after first operation
      } else if (!this.firstOperation) {
        if (!this.valueTwo && !this.operation) {
          this.valueOne += button;
          this.updateOperation();
        } else if (this.valueOne && this.operation) {
          this.valueTwo += button;
          this.updateOperation();
        } else if (this.operation && !this.valueOne && !this.valueTwo) {
          this.valueOne = this.result;
          this.valueTwo += button;
          this.updateOperation();
        }
      }
    }
    // set operation
    if (button === '/' || button === '*' || button === '-' || button === '+' || button === '%') {
      if (this.result === 0) this.valueOne = '0';
      if (!this.valueOne && !this.valueTwo && this.firstOperation) return;
      this.operation = button;
      this.updateOperation();
    }
    // decimal separator
    if (button === '.') {
      if (!this.operation) {
        if (this.valueOne.includes('.')) return;
        this.valueOne += button;
      } else {
        if (this.valueTwo.includes('.')) return;
        this.valueTwo += button;
      }
    }
    // all clear button
    if (button === 'ac') this.allClear();

    if (button === '=') {
      this.firstOperation = false;
      switch (this.operation) {
        case '+':
          this.result = this.calculator.addition(this.valueOne, this.valueTwo);
          this.addToHistory();
          this.reset();
          break;
        case '-':
          this.result = this.calculator.subtract(this.valueOne, this.valueTwo);
          this.addToHistory();
          this.reset();
          break;
        case '*':
          this.result = this.calculator.multiply(this.valueOne, this.valueTwo);
          this.addToHistory();
          this.reset();
          break;
        case '/':
          if (this.valueTwo === '0') {
            this.reset();
            this.result = 'error';
            break;
          }
          this.result = this.calculator.divide(this.valueOne, this.valueTwo);
          this.addToHistory();
          this.reset();
          break;
        case '%':
          this.result = this.calculator.percentage(this.valueOne, this.valueTwo);
          this.addToHistory();
          this.reset();
          break;
        default:
          break;
      }
      this.updateResult();
    }
  }

  /**
   * Update result in the UI
   * @param  {string} value - value result of operation
   */
  updateResult(value) {
    $result.textContent = value || this.result;
  }

  /**
   * Update the operation in the UI
   */
  updateOperation() {
    $operation.textContent = `${this.valueOne}${this.operation}${this.valueTwo}`;
  }

  /**
   * Add to history last 5 operations
   */
  addToHistory() {
    // just save last 5 operations
    if (this.history.length >= 5) this.history.shift();

    this.history.push({
      op: `${this.valueOne}${this.operation}${this.valueTwo}`,
      result: `${this.result}`,
    });

    $operationList.innerHTML = '';
    this.history.map(operation => {
      $operationList.appendChild(this.buildHistoryItem(operation));
    });
  }

  /**
   * Build template of operation in order to add to operation list
   * @param  {object} operation -
   * @return {node}
   */
  buildHistoryItem(operation) {
    const template = `
      <li class="operation">
        <span class="op">${operation.op}</span>
        <span class="result">${operation.result}</span>
      </li>
    `;
    return parseHTML(template);
  }

  /**
   * Reset values after every single operation
   */
  reset() {
    this.valueOne = '';
    this.valueTwo = '';
    this.operation = '';
  }

  /**
   * Reset all value when the user press ac button
   */
  allClear() {
    this.valueOne = '';
    this.valueTwo = '';
    this.operation = '';
    this.result = null;
    this.firstOperation = true;
    this.history.length = 0;
    $operationList.innerHTML = '';
    this.updateOperation();
    this.updateResult('0');
  }

  /**
   * Show and hide the history section
   */
  toggleHistory() {
    $history.classList.toggle('is-visible');
  }
}

export default UI;
