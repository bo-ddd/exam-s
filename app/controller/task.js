'use strict';

const BaseController = require('./base.js');

class TaskController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'task';
    }

    async list() {
        let mysql = this.ctx.service.mysql;
        return await mysql.pagination(({ limit, offset }) => {
            let sql = `select task.id as id, task.name as task_name,task.desc as 'desc', task.user_id as user_id, 
            task.duration as duration, task.created_at as created_at, 
            task.updated_at as updated_at, task.level as level, user.name as user_name from task
            inner join user_info as user
            on user.id = task.user_id
            order by task.level  desc
            limit ${limit}
            offset ${offset}
            `
            let count = mysql.count(this.tablename);
            let list = mysql.query(sql);
            return [count, list]
        })
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
            let sql = `insert into task_record(user_id, task_id)
            select ${userId}, ${taskId} from dual
            where not exists (select * from task_record where user_id = ${userId} and task_id = ${taskId})`;
            let promise = this.ctx.service.mysql.query(sql);
            promises.push(promise);
        });
        await Promise.all(promises);
        return this.ctx.success()
    }
}

module.exports = TaskController;