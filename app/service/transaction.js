'use strict';

const Service = require('egg').Service;

class TransactionService extends Service {
    async created(cb){
        const conn = await this.app.mysql.beginTransaction(); // 初始化事务
        try {
            cb(conn);
            await conn.commit(); // 提交事务
            return ctx.success();
        } catch (err) {
            await conn.rollback(); // 一定记得捕获异常后回滚事务！！
            return ctx.fail();
        }
    }

}

module.exports = TransactionService;
