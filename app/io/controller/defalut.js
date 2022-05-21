const Controller = require('egg').Controller;

class DefaultController extends Controller {
    async index(){
        const { ctx,app } = this;
        const message = ctx.args[0];
        const msg = {
            ...message,
            date:new Date()
        }
        app.io.of('/').emit('res', msg);
    }
}

module.exports = DefaultController;