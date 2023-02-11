# Homework #4

```
Вносите изменения в файл ./src/index.js 
```

## Задание

Создайте класс `Validator`, задача которого производить сложную валидацию данных. 
Конструктор должен принимать массив функций-валидаторов, и объект с конфигурацией.

### Функция-валидатор:
Это функция, которая принимает тестируемое значение и возвращает null, если оно валидно, или объект с булевым свойством. Свойство называется именем функции-валидатора

#### Пример функции-валидатора:
```javascript
const required = (value) => {
    return Boolean(value) ? null : {required: true};
};
```

### Объект с конфигурацией:
Это объект с одним свойством `mode`. Значением свойства могут быть строки: `'single'` или `'multi'`.
Если в конструктор вторым аргументом не передавать конфигурацию, то будет применена конфигурация по умолчанию:
```javascript
{
    mode: 'single'
}
```
В режиме `single` валидатор производит валидацию до тех пор, пока не найдёт первую ошибку, а в режиме `multi` собирает все ошибки.

### Публичные свойства экземпляра:

- `enabled` - только для чтения, отображает включён валидатор или нет

### Публичные методы экземпляра:

- `enable()` - включает валидатор
- `disable()` - выключает валидатор
- `toggle()` - переключает состояние валидатора на обратное от текущего, может принимать конкретное состояние в качестве аргумента
- `validate()` - запускает валидатор, в качестве аргумента принимает тестируемое значение и возвращает `null` если значение корректное, если значение не прошло валидацию, то возвращает объект с ошибками.

### Пример

```javascript
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

```
