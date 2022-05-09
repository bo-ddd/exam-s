'use strict';
const Service = require('egg').Service;

class QuestionService extends Service {
    async getTableName(){
        const { type } = this.ctx.request.body;
        const arr = ['','single_question']
        return arr[type];
    }
}

module.exports = QuestionService;