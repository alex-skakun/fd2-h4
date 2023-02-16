class Validator {
    enabled = true;
    constructor(validators, operationMode = { 
        mode: 'single' }) {
      this.validators = validators;
      this.mode = operationMode.mode;
    }

    enable() {
      this.enabled = true
    }

    disable() {
      this.enabled = false
    }
    
    toggle(value) {
      switch (value) {
        case true:
          this.enabled = true;
          break;
        case false:
          this.enabled = false
          break
        default:
          this.enabled ? this.enabled = false : this.enabled = true;
      }
      return this.enabled;
    }

    validate(value) {
      if (!this.enabled) return null;
      
      let errors = null;

      for (const validator of this.validators) {
          const result = validator(value);
          if (result) {
              if (this.mode === 'single') {
                  return result;
              } else {
                  errors = errors || {};
                  errors[Object.keys(result)] = result[Object.keys(result)];
              }
          }
      }
      return errors;
  }
}

// ___________________________________________________________________________________
// создаём функции-фалидаторы
const required = (value) => {
    return Boolean(value) ? null : {required: true};
};
const minLength = (minLength) => {
    // функция-фалидатор создаётся другой функцией
    return (value) => {
        return String(value).length >= minLength ? null : {minLength: true};
    };
};
const maxLength = (maxLength) => {
    return (value) => {
        return String(value).length <= maxLength ? null : {maxLength: true};
    };
};
const min = (min) => {
    return (value) => {
        return value >= min ? null : {min: true};
    };
};
const max = (max) => {
    return (value) => {
        return value <= max ? null : {max: true};
    };
};

// создаём экземпляр валидатора с конфигурацией по умолчанию (не передаём второй аргумент). 
const validator = new Validator([
    required,
    minLength(5),
    maxLength(25),
]);

console.log(validator.validate('test'));  // вернёт {minLength: true}
console.log(validator.validate('')); // вернёт {required: true}
console.log(validator.validate('successful')); // вернёт null

console.log(validator.disable()); // выключит валидатор
console.log(validator.validate('test')); // вернёт null, валидатор выключен, а значит значение всегда валидно
console.log(validator.toggle());  
console.log(validator.validate('test')); // вернёт {minLength: true}
console.log(validator.toggle(true)); // оставит валидатор включённым, т.к. передано конкретное состояние

// создаём экземпляр валидатора с режимом 'mutli'. 
const multiValidator = new Validator([
    required,
    minLength(5),
    maxLength(25),
], {mode: 'multi'});

console.log(multiValidator.validate('')); // вернёт {required: true, minLength: true} (две ошибки сразу)
