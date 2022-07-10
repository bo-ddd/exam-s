'use strict'

const BaseController = require('./base.js');

class PermissionController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'jurisdiction';
    }

    async list() {
        const { ctx,app} = this;
        const {role} = ctx.request.body;
        const res = await app.mysql.query(`select
        role_permission.id,
        title
        from ${this.tablename} 
        inner join role_permission 
        on role_permission.id = jurisdiction.permission_id where role_id = ?`, [role]);
         console.log('---------------我是返回权限列表开始-----------------');
         console.log(res);
         console.log('---------------我是返回权限列表结束-----------------');
         return res.length !== 0 ? ctx.success({data:res}) : ctx.fail();
      }
}

module.exports = PermissionController;
