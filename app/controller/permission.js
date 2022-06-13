'use strict';

const BaseController = require('./base.js');

class PermissionController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'permission';
    }

    async delete() {
        const { ctx } = this;
        console.log(ctx.request.body);
        const data = await ctx.service.mysql.delete(this.tablename, ctx.request.body);
        return data.affectedRows === 1 ? ctx.success() : ctx.fail();
      }
}

module.exports = PermissionController;
