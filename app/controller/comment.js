'use strict';

const BaseController = require('./base.js');

class CommentController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'comment';
    }

    async list() {
        let mysql = this.ctx.service.mysql;
        return await mysql.pagination(({ limit, offset }) => {
            let sql = `
            select 
            comment.id as comment_id,comment_content,comment.created_at as comment_created_at,
            user_info.name as username,user_info.id as user_id,
            task.name as task_name,task.id as task_id
            from comment 
            inner join task on comment.task_id=task.id
            inner join user_info on comment.user_id=user_info.id
            limit ${limit}
            offset ${offset}
            `
            let count = mysql.count(this.tablename);
            let list = mysql.query(sql);
            return [count, list]
        })
    }
}

module.exports = CommentController;