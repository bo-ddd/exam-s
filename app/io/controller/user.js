const Controller = require('egg').Controller;

class UserController extends Controller {
    async index() {
        const { ctx, app } = this;
        const message = ctx.args[0];
        const msg = {
            ...message,
            date: new Date()
        }
        app.io.of('/').emit('receiveMsg', msg);
    }
    async addUser() {
        const { ctx, app } = this;
        let count = await app.redis.get('count');
        count = Number(count) + 1;
        await app.redis.set('count', count);
        

        app.io.of('/').emit('userCount', count);
    }
    async removeUser() {
        const { ctx, app } = this;
        let count = await app.redis.get('count');
        count = Number(count) - 1;
        await app.redis.set('count', count);
        app.io.of('/').emit('userCount', count);
    }
}

module.exports = UserController;