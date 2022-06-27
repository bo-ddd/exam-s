'use strict'

const BaseController = require('./base.js');

class RolepermissionController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'role_permission';
    }

    async list() {
        let sql = `select id from user where user_id = ${this.ctx.session.user.id}`;
        let data = await this.ctx.service.mysql.query(sql);
        let sqlrole = `select id from role where user_id = ${data[0].id}`;
        let id = await this.ctx.service.mysql.query(sqlrole);
        let mysql = this.ctx.service.mysql;
        return await mysql.pagination(({ limit, offset }) => {
            let sql = `select  role.id as role_id,role_name,title
            from role 
            inner join role_permission
            on role.id = role_permission.r_id
            where r_id = ${id[0].id}
            limit ${limit}
            offset ${offset}
            `
            let count = mysql.count(this.tablename);
            let list = mysql.query(sql);
            return [count, list]
        })
    }
}

module.exports = RolepermissionController;
