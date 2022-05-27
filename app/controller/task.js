'use strict';

const BaseController = require('./base.js');

class TaskController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'task';
    }

    async list() {
        let mysql = this.ctx.service.mysql;
        let user = this.ctx.session.user;
        return await mysql.pagination(({ limit, offset }) => {
            let sql = `select task.id as id, task.name as task_name,task.desc as 'desc', task.user_id as user_id, 
            task.duration as duration, task.created_at as created_at, 
            (select case task.level when 1 then '紧急' else '普通' end) as levelName,
            (select if(
                (select count(*) from task_record where exists (
                    select task_id from task_record where user_id = ${user.id} and task_id =  task.id
                ))
            , 1, 0)) as isReceived,
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
        let { userIds, taskId } = this.ctx.request.body;
        let promises = [];
        userIds.forEach(userId => {
            let sql = `insert into task_record(user_id, task_id)
            select ${userId}, ${taskId} from dual
            where not exists (select * from task_record where user_id = ${userId} and task_id = ${taskId})`;
            let promise = this.ctx.service.mysql.query(sql);
            promises.push(promise);
        });
        await Promise.all(promises);
        return this.ctx.success()
    }

    async detail() {
        let { taskId } = this.ctx.request.body;
        let { mysql } = this.ctx.service;

        let sql = `
        select task.id as taskId,
        task.name as taskName,
        task.desc as 'desc',
        task.user_id as userId,
        user.name as userName,
        task.duration as duration,
        task.level as level, 
        (select case level when 1 then '紧急' else '普通' end) as levelName,
        task.created_at as createdAt,
        task.updated_at as updatedAt
        from task 
        inner join user_info as user
        on task.user_id = user.id
        where task.id = ${taskId}`

        let receivedSql = `select 
        t.user_id  as userId, 
        t.completed_at as completedAt,
        user.name as userName
        from task_record as t 
        inner join user_info as user
        on t.user_id = user.id
        where t.task_id = ${taskId}`;

        let [data, receivedData] = await Promise.all([
            mysql.query(sql),
            mysql.query(receivedSql)
        ]);

        data = data[0];
        if (!data) return this.ctx.fail({ msg: '该任务不存在！' });
        data.receivedData = receivedData;

        return this.ctx.success({ data });
    }
}

module.exports = TaskController;