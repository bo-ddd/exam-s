'use strict';
const BaseController = require('./base.js');

class AuthorityController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'role';
    }

    async info() {
        let mysql = this.ctx.service.mysql;
        let { id } = this.ctx.session.user;
        return await mysql.pagination(({ limit, offset }) => {
            let sql = `
            select group_name,role_name,role.created_at,role.group_id,username
            from role_group
            inner join role
            on role_group.id = role.group_id
            inner join user
            on role.user_id = user.id
            where user.id = "${id}"
            limit ${limit}
            offset ${offset}
            `
            console.log(sql);
            let count = mysql.count(this.tablename);
            let list = mysql.query(sql);
            return [count, list]
        })
    }

}

module.exports = AuthorityController;
