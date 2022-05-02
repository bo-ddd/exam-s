module.exports = app =>{
    app.validator.addRule('captcha', (rule, value) => {
        try{
            if(value.length !== 4) return 'length must be 4';
            const { expires, text } = rule.captcha;
            const isTimeout = new Date(expires).getTime() < Date.now();
            if(isTimeout) return 'is timeout'
            if(value.toLowerCase() != text.toLowerCase()) return 'match fail'
        }catch(e){
            return 'must be string'
        }
    });
    app.validator.addRule('email',(rule,value)=>{
        let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        try{
            if(!value.length) return 'not null';
            if(!reg.test(value)) return 'roule is error';
        }catch(e){
            return 'must be string'
        }
    })
    app.validator.addRule('phone',(rule,value)=>{
        let reg = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
        try{
            if(!reg.test(value)) return 'match fail';
        }catch(e){
            return 'must be string'
        }
    })
}