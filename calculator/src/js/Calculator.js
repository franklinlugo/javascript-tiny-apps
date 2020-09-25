/** Calculator class  */
class Calculator {
  // private property
  #result;
  constructor() {
    this.#result = null;
  }
  addition(valueOne, valueTwo) {
    this.result = Number(valueOne) + Number(valueTwo);
    return this.result;
  }
  subtract(valueOne, valueTwo) {
    this.result = Number(valueOne) - Number(valueTwo);
    return this.result;
  }
  multiply(valueOne, valueTwo) {
    this.result = Number(valueOne) * Number(valueTwo);
    return this.result;
  }
  divide(valueOne, valueTwo) {
    this.result = Number(valueOne) / Number(valueTwo);
    return this.result;
  }
  percentage(valueOne, valueTwo) {
    this.result = (Number(valueOne) * Number(valueTwo)) / 100;
    return this.result;
  }
}
export default Calculator;
