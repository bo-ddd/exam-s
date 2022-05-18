'use strict';

const Service = require('egg').Service;

class MysqlService extends Service {
  async findOne(tablename, where) {
    const data = await this.app.mysql.get(tablename, where);
    try {
      return Object.keys(data).length ? this.service.format.camelCase({ ...data }) : null;
    } catch (e) {
      return null;
    }
  }
  async update(tablename, payload, options = {}) {
    payload = this.service.format.params(payload);
    if (options.where && !Object.keys(options.where).length) delete options.where;
    return await this.app.mysql.update(tablename, payload, options);
  }
  async create(tablename, payload, options) {
    payload = this.service.format.params(payload);
    return await this.app.mysql.insert(tablename, payload, options);
  }
  async query(sql, arr = []) {
    const { app, ctx } = this;
    const data = await app.mysql.query(sql, arr);
    return ctx.service.format.camelCase(data);
  }

  /**
   * @description 把requestBody的值转换成原生sql语句
   * @param options <object>
   * @param options.like <array> 
   * **/
   condition(options) {
    let requestBody = this.service.format.params(this.ctx.request.body);
    let res = '';

    let like = options.like || [];

    // 生成sql条件；
    let excludes = ['page_size', 'page_num', 'pagination'];
    for (let key in requestBody) {
      if (excludes.includes(key)) continue;

      let isLike = like.includes(key);

      let symbol = isLike ? 'like' : '=';
      let value = isLike ? `'%${requestBody[key]}%'` : requestBody[key];

      let cond = `${key} ${symbol} ${value} `
      let where = res ? `and ${cond}` : cond;
      res += where;
    }

    // 生成分页条件；
    let { pagination }  = this.ctx.request.body;
    if(pagination !== false){
      const { limit, offset } = options;
      const pagination = `limit ${limit} offset ${offset}`;
      res += pagination;
    }

    return res;
  }


  // 普通的mysql查询方法；如果没有特殊要求，直接返回 count, rows pageCount;
  async list(tablename, payload) {
    const { app } = this;
    const { orders = [], pagination } = payload;
    const where = payload.where ? this.service.format.params(payload.where) : {};
    return await this.pagination(({ offset, limit }) => {
      const p1 = this.count(tablename);
      const options = {
        where,
      };
      //pagination == false ? '查询所有数据' : '按照分页查询数据'
      if (pagination !== undefined) {
        options.limit = limit;
        options.offset = offset;
      }
      if (orders.length) {
        options.orders = orders;
      }

      const p2 = app.mysql.select(tablename, options);
      return [p1, p2];
    })
  }
  /**
   * @description list接口是负责解析正常的列表查询 ,pagination方法是自定义列表查询;
   * @return  { count, pageCount, rows } 总条数，总页数，数据列表；
   * **/
  async pagination(cb) {

    const { ctx } = this;
    const { pageSize = 10, pageNum = 1 } = ctx.request.body;
    const limit = pageSize;
    const offset = (pageNum - 1) * pageSize;
    const promises = cb({ limit, offset });
    const [count, rows] = await Promise.all(promises);
    const pageCount = Math.ceil(count / pageSize);
    const data = ctx.service.format.camelCase({ count, pageCount, rows });
    return ctx.success({ data });
  }
  
  /***
   * @description 这个是返回表格数据总数的方法
   * @return {res} 多少条数据
   */
  async count(tablename) {
    let res = await this.app.mysql.query(`select count(*) as count from ${tablename}`);
    return res[0].count;
  }
  /**
   * 
   * @description 这个是删除数据的方法
   */
  async delete(tablename, where) {
    const { ctx } = this;
    where = ctx.service.format.params(where);
    let res = await this.app.mysql.delete(tablename, where);
    return res.affectedRows === 1 ? ctx.success() : ctx.fail();
  }
}

module.exports = MysqlService;