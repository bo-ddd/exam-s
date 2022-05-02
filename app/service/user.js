'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  getToken(userInfo) {
    const { ctx, app } = this;
    ctx.state.user = userInfo;
    const isPlainObject = ctx.service.format.isPlainObject(userInfo);
    if (!isPlainObject) return;
    return app.jwt.sign(userInfo, app.config.auth.secret, {
      expiresIn: 60 * 30,
    });
  }
  async login(username, password) {
    const { ctx } = this;
    const user = await ctx.service.mysql.findOne('user', {
      username,
      password,
    });
    if (!user) return ctx.fail({ msg: '用户名或密码不存在!' })
    ctx.service.mysql.update('user_info', {
      loginAt: this.app.mysql.literals.now,
      id: user.userId
    });
    const userInfo = await ctx.service.mysql.findOne('user_info', {
      id: user.userId
    });
    return ctx.success({ data: this.getToken(userInfo) })
  }
  async register() {
    const { ctx, app } = this;
    const { username, password, email, phone = '' } = ctx.request.body;
    const user = await ctx.service.mysql.findOne('user', {
      username
    });
    if (user) return ctx.fail({ msg: '账号已经存在!' });
    const conn = await app.mysql.beginTransaction(); // 初始化事务
    try {
      let emailRes = await conn.insert('email', { email });  // 第一步操作
      let infoRes = await conn.insert('user_info', { email_id: emailRes.insertId, phone });
      await conn.insert('user', { username, password, user_id: infoRes.insertId });
      await conn.commit(); // 提交事务
      return ctx.success();
    } catch (err) {
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      return ctx.fail();
    }
  }
}

module.exports = UserService;
