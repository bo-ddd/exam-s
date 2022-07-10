'use strict';

const BaseController = require('./base.js');

class RoleController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'role';
    }     
    async create(){
        const { ctx } = this;
        ctx.validate({
            roleName:{ type:'string' }
        })
        const data = await ctx.service.mysql.create(this.tablename, ctx.request.body);
        return data.affectedRows === 1 ? ctx.success({data:[{id:data.insertId}]}) : ctx.fail();
    }
}

module.exports = RoleController;