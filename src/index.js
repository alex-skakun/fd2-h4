class Validator{
    #functions;
    #config;
    #enabled;
    
    constructor(functions,config){
      this.#enabled=true;
      this.#functions=functions;
      if(config==undefined){
        this.#config={
            mode: 'single'
          };
      }else{
        this.#config=config;
      }
    }
    
    get enabled(){
      return this.#enabled;
    }
    
    enable(){
      this.#enabled=true;
    }
    
    disable(){
      this.#enabled=false;
    }
    
    toggle(value){
      if(value==undefined){
        this.#enabled=!this.#enabled;
      }else{
        this.#enabled=value;
      }
    }
    
    validate(value){
      if(!this.#enabled){
        return null;
      }
      
      let result=null;
      
      firstloop: for (let f of this.#functions){
        let resObj=f(value);
        for(let r in resObj){
          if(result==null){
            result={};
          }
          result[r]=resObj[r];
          if(this.#config.mode=='single') break firstloop;
        }
      }
      
      return result;
      
      
    }
    
  }
  
  
  // создаём функции-валидаторы
  const required = (value) => {
      return Boolean(value) ? null : {required: true};
  };
  const minLength = (minLength) => {
      // функция-валидатор создаётся другой функцией
      return (value) => {
          return String(value).length >= minLength ? null : {minLength: true};
      };
  };
  const maxLength = (maxLength) => {
      return (value) => {
          return String(value).length <= maxLength ? null : {maxLength: true};
      };
  };
  
  const validator = new Validator([
      required,
      minLength(5),
      maxLength(25),
  ]);
  
  console.log(validator.validate('test')); // вернёт {minLength: true}
  console.log(validator.validate('')); // вернёт {required: true}
  console.log(validator.validate('successful')); // вернёт null
  
  validator.disable(); // выключит валидатор
  console.log(validator.validate('test')); // вернёт null, валидатор выключен, а значит значение всегда валидно
  validator.toggle(); // снова включит валидатор, т.к. в данный момент он выключен
  console.log(validator.validate('test')); // вернёт {minLength: true}
  validator.toggle(true); // оставит валидатор включённым, т.к. передано конкретное состояние
  
  
  const multiValidator = new Validator([
      required,
      minLength(5),
      maxLength(25),
  ], {mode: 'multi'});
  
  console.log(multiValidator.validate('')); // вернёт {required: true, minLength: true} (две ошибки сразу)
  
  
