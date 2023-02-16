'use strict';

const required = (value) => {
	return Boolean(value) ? null : {required: true};
};

const minLength = (minLength) => {
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

class Validator {

	enabled = true;

	constructor(validateFunctionArr, configureObj = {mode: 'single'}) {
		this.validateFunctionArr = validateFunctionArr;
		this.configureObj = configureObj.mode;
	}


	enable() {
		this.enabled = true;
		console.log('Валидатор включен');
	}


	disable() {
		this.enabled = false;
		console.log('Валидатор выключен');
	}

	toogle(status) {
		switch (status) {
			case true:
				this.enabled = true;
				console.log('Валидатор включен');
				break;
			case false:
				this.enabled = false;
				console.log('Валидатор выключен');
			default:
				this.enabled ? this.enabled = false : this.enabled = true;
				break;
		}
	}

	validate(value) {
		if (this.enabled === false) {
			console.log('Валидация невозможна. Валидатор выключен');
			return null;
		} 
		if (this.configureObj === 'single') {
			for (let func of this.validateFunctionArr) {
				const err = func(value);
				if (err) {
					console.log('Найдена ошибка:');
					return err;
				} 
				}
				}

				if (this.configureObj === 'multi') {
					let errorObj = {};
					for (let func of this.validateFunctionArr) {
						const err = func(value);
						if (err) {
							Object.assign(errorObj, err);
							console.log('Найдена ошибка:');
							return errorObj;
				} 
				}
				}
				console.log('Ошибок нет, валидация пройдена');
				return null;
			} 
		}


const validator = new Validator([
	required,
	minLength(5),
	maxLength(25),
]);

const multiValidator = new Validator([
	required,
	minLength(5),
	maxLength(25),
], {mode: 'multi'});

