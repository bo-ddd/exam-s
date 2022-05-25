'use strict';

const BaseController = require('./base.js');

class RoleGroupController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'role_group';
    }     
}

module.exports = RoleGroupController;