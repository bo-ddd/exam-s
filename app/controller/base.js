'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.tablename = '';
  }
  async index() {
    const { ctx } = this;
    const { route } = ctx.params;
    const data = await this[route]();
    ctx.send(data);
  }
  async create() {
    const { ctx } = this;
    const data = await ctx.service.mysql.create(this.tablename, ctx.request.body);
    return data.affectedRows === 1 ? ctx.success() : ctx.fail();
  }
  async update(where = {}) {
    const { ctx } = this;
    let row = ctx.service.format.params(ctx.request.body);
    const data = await ctx.service.mysql.update(this.tablename,row,{where});
    return data.affectedRows === 1 ? ctx.success() : ctx.fail();
  }
  async list() {
    return await this.ctx.service.mysql.list(this.tablename, this.ctx.request.body);
  }
  async count(){
    return await this.ctx.service.mysql.count(this.tablename);
  }
}

module.exports = BaseController;
