const Controller = require('egg').Controller;

class UserController extends Controller {
    async index() {
        const { ctx, app } = this;
        const message = ctx.args[0];
        const msg = {
            ...message,
            date: new Date()
        }
        app.io.of('/').emit('res', msg);
    }
    async addUser() {
        const { ctx, app } = this;
        console.log('----------------------addUser-----------------')
        console.log(ctx.state);
        ctx.state.userCount = ctx.state.userCount ? ctx.state.userCount + 1 : 1;
        app.io.of('/').emit('userCount', ctx.state.userCount);
    }
    async removeUser() {
        const { ctx, app } = this;
        ctx.state.userCount = ctx.state.userCount ? ctx.state.userCount - 1 : 1;
        app.io.of('/').emit('userCount', ctx.state.userCount);
    }
}

module.exports = UserController;