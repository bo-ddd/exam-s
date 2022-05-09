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
      if (pagination === undefined || pagination === true) {
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
    const pageCount = Math.ceil(count / (pageSize * pageNum));
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
  async delete(tablename,where){
    const {ctx} = this;
    where = ctx.service.format.params(where);
    let res = await this.app.mysql.delete(tablename, where);
    return res.affectedRows === 1 ? ctx.success() : ctx.fail();
  }
}

module.exports = MysqlService;