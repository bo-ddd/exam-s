'use strict';

const BaseController = require('./base.js');

class CommentController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'comment';
    }     
}

module.exports = CommentController;