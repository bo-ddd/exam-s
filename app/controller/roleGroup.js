'use strict';

const BaseController = require('./base.js');

class RoleGroupController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'role_group';
    }
    async create(){
        this.ctx.validate({
            groupName:{ type:'string' }
        })
        return await super.create();
    }  
}

module.exports = RoleGroupController;