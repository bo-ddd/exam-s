'use strict'

const BaseController = require('./base.js');

class RolePermissionController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'jurisdiction';
    }

    async create() {
        const { ctx } = this;
        let { permissionId, roleId } = ctx.request.body;
        let promises = [];
        permissionId.forEach(permissionId => {
            let res = ctx.service.mysql.create(this.tablename, { permissionId, roleId });
            promises.push(res);
        });
        let res = await Promise.all(promises);
        return res.length === title.length ? ctx.success() : ctx.fail();
    }

    async list() {
        let { ctx } = this;
        let { roleId } = ctx.request.body;
        let mysql = ctx.service.mysql;
        return await mysql.pagination(({ limit, offset }) => {
            let sql = `    
            select jurisdiction.id as id,role_name,role_permission.title from jurisdiction 
            inner join role_permission
            on jurisdiction.permission_id = role_permission.id
            inner join role
            on jurisdiction.role_id = role.id
            where role.id = ${roleId}
            limit ${limit}
            offset ${offset}
            `
            let count = mysql.count(this.tablename);
            let list = mysql.query(sql);
            return [count, list]
        })
    }
}

module.exports = RolePermissionController;
