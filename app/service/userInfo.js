'use strict';

const Service = require('egg').Service;

class UserInfoService extends Service {
    async findOne(avatorName){
        return await this.ctx.service.mysql.findOne('user_info',{title:avatorName});
    }
    async update(){
        const {ctx} = this;
        let id = ctx.session.user;
        return await ctx.service.mysql.update('user_info',{...ctx.request.body,id});
    }
}

module.exports = UserInfoService;