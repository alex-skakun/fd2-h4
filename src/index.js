class Validator {
    enabled = true;
    constructor(arrValidators, сonfigurator = {mode: 'single'}){
        this.arrValidators = arrValidators;
        this.сonfigurator = сonfigurator; 
    }

    enable(){
        return this.enabled = true;
    }
    disable(){
        return this.enabled = false;
    }
    toggle(type=''){
        switch(type) {
            case true:   
            this.enabled = true;
            break;
            case false:   
            this.enabled = false;
            break;
            default:    
            this.enabled === true ? this.enabled = false : this.enabled = true; 
            break;
        }
        return this.enabled;
    }

    validate(value){
        this.arr=[];  
        if(!this.enabled) {return null;};
        if(this.enabled) { 
            switch(this.сonfigurator.mode) {
                case 'multi':   
                this.arrValidators.map(validator => {
                    if(validator(value) !== null){
                        this.arr.push(validator(value));
                    } 
                });  
             // если все условия в реиме multi выполненны то возращаем null
                return this.arr.length == 0 ? null : this.arr;
             // single режим по дефолту
                default:    
                this.arrValidators.some(validator => {
                    this.arr = validator(value);
                    if(validator(value) !== null){
                        return this.arr;
                    }
                    });
            }
            return this.arr;
        } 
    }
}  


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


const multiValidator = new Validator([ 
    required,
    minLength(5),
    maxLength(25),
], {mode: 'multi'});
//////////////////////// проверка режима milti
// console.log(multiValidator);
// console.log(multiValidator.validate('test'));
// multiValidator.disable();
// console.log(multiValidator.validate('test'));
// multiValidator.enable();
// console.log(multiValidator.validate('test'));
// multiValidator.toggle();
// console.log(multiValidator.validate('test'));
// console.log(multiValidator.toggle());  
// console.log(multiValidator.validate('test11'));

////////////////////////////////////
const validator = new Validator([
    required,
    minLength(5),
    maxLength(25),
]);
console.log(validator);
console.log(validator.validate('test'));  // вернёт {minLength: true}
console.log(validator.validate('')); // вернёт {required: true}
console.log(validator.validate('successful')); // вернёт null
console.log(validator.disable()); // выключит валидатор
console.log(validator.validate('test')); // вернёт null, валидатор выключен, а значит значение всегда валидно
console.log(validator.toggle());  
console.log(validator.validate('test')); // вернёт {minLength: true}
console.log(validator.toggle(true)); // оставит валидатор включённым, т.к. передано конкретное состояние
console.log(validator.toggle()); // оставит валидатор включённым, т.к. передано конкретное состояние



 







//////////////////////////////////////////////////////////////

// создаём функции-фалидаторы
// const required = (value) => {
//     return Boolean(value) ? null : {required: true};
// };
// const minLength = (minLength) => {
//     // функция-фалидатор создаётся другой функцией
//     return (value) => {
//         return String(value).length >= minLength ? null : {minLength: true};
//     };
// };
// const maxLength = (maxLength) => {
//     return (value) => {
//         return String(value).length <= maxLength ? null : {maxLength: true};
//     };
// };
// const min = (min) => {
//     return (value) => {
//         return value >= min ? null : {min: true};
//     };
// };
// const max = (max) => {
//     return (value) => {
//         return value <= max ? null : {max: true};
//     };
// };
// const rules =[
//     // required,
//     minLength(5),
//     maxLength(25),
//     // min(4),
//     // max(10)
// ];


// условия работы валидатора 
let enabled = true;
function  enable(){
return enabled = true;
// - включает валидатор
}
function disable(){
return enabled = false;
// - выключает валидатор  
}
function toggle(){
    enabled == true ? enabled = false : enabled = true;
    return enabled;
    // - переключает состояние валидатора на обратное от текущего, может принимать конкретное состояние в качестве аргумента
}
 
let arrMode = {mode: 'single'};

function validateByRules(value){

    let arr=[];

    if(enabled) {
            // если режим multi - проходимся по всем элементам валидатора
        if (arrMode.mode == 'multi') {
            rules.map(validator => {
                if(validator(value) !== null){
                    arr.push(validator(value));
                }
            });
        } else{
    //  иначае (в режиме single) выводим 1-ый не соотвествующий валидатор
            rules.some(validator => {
                arr = validator(value);
                if(validator(value) !== null){
                    return arr;
                }
            });
        }
        return arr;
    } else {
        return false;
    }



}
// запуск функци с паролем или функцией
// const isValidate = validateByRules('1234', rules, {mode: 'single'});

// console.log('сейчас ' + enabled);
// disable();
// console.log('disable ' + enabled);
// enable();
// console.log('enable ' + enabled);
// toggle();
// console.log('toggle ' + enabled);
// toggle();
// console.log('toggle ' + enabled);

// const isValidate = validateByRules('test');

// console.log(isValidate);


 
 
 

