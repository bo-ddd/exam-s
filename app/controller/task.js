'use strict';

const BaseController = require('./base.js');

class TaskController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'task';
    }

    async create() {
        const { ctx } = this;
        ctx.request.body.userId = ctx.session.user.id;
        return await super.create();
    }

    async release() {
        let { userId, taskId } = this.ctx.request.body;
        let params = [];
        userId.forEach(userId => {
            params.push(this.ctx.service.mysql.create("task_record", { userId, taskId }));
        });
        await Promise.all(params);
        return this.ctx.success({
            data: [],
            status: 1,
            msg: 'success'
        })
    }

}

module.exports = TaskController;