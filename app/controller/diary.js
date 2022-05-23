'use strict';

const BaseController = require('./base.js');

class DiaryController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'diary';
    }

    async create(){
        this.ctx.request.body.userId = this.ctx.session.user.id;
        return await super.create();
    }

    async list(){
        this.ctx.request.body.id = this.ctx.session.user.id;
        return await super.list();
    }

   /**
   * @description 更新日志信息
   * **/
    async update() {
        const { id } = this.ctx.session.user;
        let data = await this.ctx.service.delete({
            id
        });
        data.msg = '更新日志成功!';
        return data;
    }
}

module.exports = DiaryController;
