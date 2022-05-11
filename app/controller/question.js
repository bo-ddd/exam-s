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

    async create() {
        this.ctx.validate({
            title: { type: 'string' },
            questionA: { type: 'string' },
            questionB: { type: 'string' },
            questionC: { type: 'string', required: false },
            questionD: { type: 'string', required: false },
            answer: { type: 'string' },
            level: { type: 'number' }
        });
        this.tablename = await this.ctx.service.question.getTableName();
        return super.create();
    }

    async update() {
        this.ctx.validate({
            title: { type: 'string', required: false },
            questionA: { type: 'string', required: false },
            questionB: { type: 'string', required: false },
            questionC: { type: 'string', required: false },
            questionD: { type: 'string', required: false },
            answer: { type: 'string', required: false },
            level: { type: 'number', required: false }
        });
        this.tablename = await this.ctx.service.question.getTableName();
        return super.update();
    }

    async delete() {
        this.tablename = await this.ctx.service.question.getTableName();
        const { id } = this.ctx.request.body;
        this.ctx.validate({
            id: { type: 'number' },
            type:{ type: 'number' }
        });
        return this.ctx.service.mysql.delete(this.tablename, {
            id
        })
    }
}

module.exports = QuestionController;
