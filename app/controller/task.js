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
        let promises = [];
        userId.forEach(userId => {
            let sql = `insert into ${this.tablename} 
            set 
                user_id = ${userId} task_id = ${taskId} 
            where 
                (select count(*) from ${this.tablename} where user_id = ${userId} and task_id = ${taskId} = 0)
            `;
            let promise = this.ctx.service.mysql.query(sql);
            promises.push(promise);
        });
        await Promise.all(promises);
        return this.ctx.success({
            data: [],
            status: 1,
            msg: 'success'
        })
    }

}

module.exports = TaskController;