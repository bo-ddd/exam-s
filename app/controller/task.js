'use strict';

const BaseController = require('./base.js');

class TaskController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'task';
    }

    async create(){
        return await super.create();
    }

    async list(){
        this.ctx.request.body.id = this.ctx.session.user.id;
        return await super.list();
    }

}

module.exports = TaskController;