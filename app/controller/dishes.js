'use strict';

const BaseController = require('./base.js');

class DisaesController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'dishes';
    }

    async create() {
        const { ctx } = this;
        console.log(ctx.request.body);
        const data = await this.app.mysql.insert(this.tablename, ctx.request.body);
        return data.affectedRows === 1 ? ctx.success({ data: [] }) : ctx.fail();
    }

    /**
     * @description 查询菜品 根据名字模糊查询,根据价格查询,
     * @returns 
     */
    async list() {
        const { ctx } = this;
        let payload = ctx.request.body;
        let where = {};
        let obj = {
            dishesName:`${'?'+payload.dishesName+'?' || ''}`,
            price:`${payload.price||''}`,
        };
        for (const key in obj) {
            if(obj[key] !==""){
                where[key] = obj[key];
            }
        }
        payload.where = where;
        return await this.ctx.service.mysql.list(this.tablename, payload);
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

module.exports = DisaesController;