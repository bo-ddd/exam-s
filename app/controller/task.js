'use strict';

const BaseController = require('./base.js');

class TaskController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'task';
    }

    async create(){
       const { ctx } = this;
       let payload = ctx.request.body;
       payload.user_id = ctx.session.user.id;
       const data = await ctx.service.mysql.create(this.tablename, payload);
       return data.affectedRows === 1 ? ctx.success({ data:[{taskId:data.insertId}]}) : ctx.fail();
    }

    async release(){
        let { ctx }  = this;
        const data = await ctx.service.mysql.create("task_record",ctx.request.body);
       return data.affectedRows === 1 ? ctx.success() : ctx.fail();
    }

}

module.exports = TaskController;