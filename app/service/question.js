'use strict';
const Service = require('egg').Service;

class QuestionService extends Service {
    async getTableName() {
        const { type } = this.ctx.request.body;
        const arr = ['', 'single_question']
        return arr[type];
    }

    async list(tableName) {
        let { ctx } = this;
        let { mysql } = ctx.service;
        return mysql.pagination(({limit, offset})=>{
            let condition = mysql.condition({
                like: ['title'],
                limit,
                offset,
            });
            let sql = `select * from ${tableName} where ${condition}`
            let count = mysql.count(tableName);
            let list = mysql.query(sql);
            return [count, list]
        })
    }
}

module.exports = QuestionService;