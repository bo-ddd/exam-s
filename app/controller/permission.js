'use strict'

const BaseController = require('./base.js');

class PermissionController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'permission';
    }

    async delete() {
        const { ctx } = this;
        if(!ctx.request.body.id) return ctx.fail({msg:'删除条件不能为空！'});
        let sql = `select id from permission where pid = ${ctx.request.body.id}`;
        let data = await ctx.service.mysql.query(sql);
        if(data.length) return ctx.fail({msg:"此项有子级，请先删除子级"});
        let res = await this.app.mysql.delete(this.tablename,ctx.request.body);
        return res.affectedRows === 1 ? ctx.success() : ctx.fail();
      }
}

module.exports = PermissionController;
