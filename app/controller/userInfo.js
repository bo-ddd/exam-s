'use strict';

const BaseController = require('./base.js');

class UserInfoController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.tablename = 'user_info';
  }
  async update(){
      const {ctx} = this;
      let res = await ctx.service.userInfo.update();
      return res.affectedRows === 1 ?   ctx.success() : ctx.fail();
  }
}

module.exports = UserInfoController;
