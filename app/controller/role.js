'use strict';

const BaseController = require('./base.js');

class RoleController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'role';
    }     
}

module.exports = RoleController;