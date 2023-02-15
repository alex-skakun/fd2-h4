class Validator {
constructor (arrayValidator, configurator = {mode: 'single'}){
    this.arrayValidator = arrayValidator;
    this.configurator = configurator;
}

enable() {
return this.enabled = true;
}
disable(){
    return this.disabled = false;
}

toggle(value = '') {
    switch (value) {
        case true: this.enabled = false;
        break;
        case false: this.enabled = true;
        break;
        default: this.enabled ? this.enabled = false : this.enabled = true;
    }
    return  ;
}
validate(value){
this.array = [];
    if (this.enabled === true) {
        return null;
    }
    else if (this.enabled === false && this.configurator.mode === 'single') {
        this.arrayValidator.some(validate => {
            this.array = validate(value);
            return this.array;
        })
    }
    else if (this.enabled === false && this.configurator.mode === 'multi') {
        this.arrayValidators.map(validate => {
            this.array.push(validate(value));
            return this.array;
        })
    }
    else {
        return this.array;
}
}

 






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

validator.validate('test'); // вернёт {minLength: true}
validator.validate(''); // вернёт {required: true}
validator.validate('successful'); // вернёт null

validator.disable(); // выключит валидатор
validator.validate('test'); // вернёт null, валидатор выключен, а значит значение всегда валидно
validator.toggle(); // снова включит валидатор, т.к. в данный момент он выключен
validator.validate('test'); // вернёт {minLength: true}
validator.toggle(true); // оставит валидатор включённым, т.к. передано конкретное состояние

// создаём экземпляр валидатора с режимом 'mutli'. 
const multiValidator = new Validator([
    required,
    minLength(5),
    maxLength(25),
], {mode: 'multi'});

multiValidator.validate(''); // вернёт {required: true, minLength: true} (две ошибки сразу)







