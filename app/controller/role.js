'use strict';

const BaseController = require('./base.js');

class RoleController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'role';
    }     
    async create(){
        this.ctx.validate({
            roleName:{ type:'string' }
        })
        return await super.create();
    }
}

module.exports = RoleController;