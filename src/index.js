'use strict'


class Validator {

  #enabled = true;

  constructor(validatorsArr, configurationObj = { mode: 'single' }) {
    this.validatorsArr = validatorsArr;
    this.mode = configurationObj.mode;
  }

  enable() {
    this.#enabled = true
  }

  disable() {
    this.#enabled = false
  }

  toggle(value) {
    switch (value) {
      case true:
        this.#enabled = true;
        break;
      case false:
        this.#enabled = false
        break
      default:
        this.#enabled ? this.#enabled = false : this.#enabled = true;
    }
  }

  validate(value) {
    // Если выключен
    if (this.#enabled === false) return null;
    // single mode
    if (this.mode === 'single') {
      for (let validator of this.validatorsArr) {
        const error = validator(value);
        if (error) return error;
      }
    }
    // multi mode
    if (this.mode === 'multi') {
      const errors = this.validatorsArr.reduce((errors, validator) => {
        const error = validator(value);
        return errors = error ? Object.assign(errors, error) : errors;
      }, {})
      return (Object.keys(errors).length === 0) ? null : errors;
    }
    //Ошибок нету
    return null;
  }
}