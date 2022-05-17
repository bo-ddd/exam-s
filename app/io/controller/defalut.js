const Controller = require('egg').Controller;

class DefaultController extends Controller {
    async index(){
        const { ctx,app } = this;
        const message = ctx.args[0];
        app.io.of('/').emit('res', message);
    }
}

module.exports = DefaultController;