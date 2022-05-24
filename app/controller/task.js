'use strict';

const BaseController = require('./base.js');

class TaskController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'task';
    }

    async create(){
       const { ctx } = this;
       ctx.request.body.userId = ctx.session.user.id;
       return await super.create();
    }

    async release(){
        let { ctx }  = this;
       this.tablename = 'task_record';
        return await super.create();
    }

}

module.exports = TaskController;