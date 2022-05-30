'use strict';

const BaseController = require('./base.js');

class RoleController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'role';
    }     
    create(){
        this.ctx.validate({
            roleName:{ type:'string' }
        })
        return super.create();
    }
}

module.exports = RoleController;