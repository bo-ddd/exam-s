'use strict';
const BaseController = require('./base.js');

class QuestionController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'single_question';
    }
    async list() {
        this.tablename = await this.ctx.service.question.getTableName();
        return super.list();
    }

    async create(){
        this.tablename = await this.ctx.service.question.getTableName();
        return super.create();
    }

    async update(){
        this.tablename = await this.ctx.service.question.getTableName();
        return super.update();
    }

    async delete(){
        this.tablename = await this.ctx.service.question.getTableName();
        const { id } =  this.ctx.request.body;
        return this.ctx.service.mysql.delete(this.tablename,{
            id
        })
    }
}

module.exports = QuestionController;
