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
    const userInfo = await ctx.service.mysql.findOne('user_info', {
      id: user.userId
    });
    return ctx.success({ data: this.getToken(userInfo) })
  }
  async register() {
    const { ctx, app } = this;
    const { username, password, email, phone } = ctx.request.body;

    const conn = await app.mysql.beginTransaction(); // 初始化事务
    try {
      let userInfo = await conn.insert('user_info', { email, phone });
      await conn.insert('user', { username, password, user_id: userInfo.insertId });
      await conn.commit(); // 提交事务
      return ctx.success();
    } catch (err) {
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      let msg = err.sqlMessage;
      if(/uq_user_username/.test(err.sqlMessage)){
        msg = '用户名已被注册'
      }else if(/uq_user_info_email/.test(err.sqlMessage)){
        msg = '邮箱已被注册'
      }else if(/uq_user_info_phone/.test(err.sqlMessage)){
        msg = '手机号已被注册'
      }
      return ctx.fail({msg});
    }
  }
}

module.exports = UserService;
