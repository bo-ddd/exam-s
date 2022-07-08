'use strict';

const BaseController = require('./base.js');
const svgCaptcha = require('svg-captcha');

class UserController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'user';
    }
    /*
    *@description 验证码功能
    */
    async captcha() {
        const { ctx } = this;
        const captchaObj = svgCaptcha.create(); //captcha:{text,data}
        ctx.session.captcha = {
            text: captchaObj.text,
            expires: new Date(Date.now() + 60 * 1000)
        };
        ctx.set('Content-Type', 'image/svg+xml')
        ctx.body = captchaObj.data;
    }
    /**
     * @description 退出登录
     * **/
    async logout() {
        const { ctx } = this;
        ctx.session.user = null;
        return ctx.success();
    }
    async login() {
        const { ctx } = this;
        const { username, password } = ctx.request.body;
        ctx.validate({
            username: { type: 'string', min: 6, max: 15 },
            captcha: { type: 'captcha', captcha: ctx.session.captcha }
        });
        try {
            // 解秘后密码；
            const decrypted = await ctx.service.crypto.decrypt(password);
            return await ctx.service.user.login(username, decrypted);
        }catch(e){
            console.log(e);
            return ctx.fail({msg:'用户名或密码不正确!'});
        }
    }
    async getToken() {
        const { ctx } = this;
        try {
            const user = ctx.session.user;
            const userInfo = ctx.service.format.exclude(user, ['iat', 'exp']);
            let data = await ctx.service.user.getToken(userInfo);
            console.log(data);
            return ctx.success({ data })
        } catch (e) {
            return ctx.fail({ msg: '获取token失败' })
        }
    }
    async info() {
        const { ctx } = this;
        const { id } = ctx.session.user;
        let sql = `select * from user_info where user_info.id = ${id}`
        let data = await ctx.service.mysql.query(sql);
        return ctx.success({ data:data[0] });
    }
    /**
     * @description 更新用户信息
     * **/
    async update() {
        this.tablename = 'user_info';
        const { id } = this.ctx.session.user;
        let data = await super.update({
            id
        });
        data.msg = '用户信息更新成功!';
        return data;
    }
    /**
     * @description 更新密码
     * **/
    async updatePwd() {
        const { ctx } = this;
        const { password } = ctx.request.body;
        ctx.request.body = { password };
        let data = await super.update({
            id: this.ctx.session.user.id
        });
        data.msg = '密码修改成功!';
        return data;
    }
    /**
     * @description 注册
     */
    async register() {
        const { ctx } = this;
        ctx.validate({
            username: { type: 'string', min: 6, max: 15 },
            password: { type: 'password' },
            phone: { type: 'phone' },
            email: { type: 'email' },
            name:{ type: 'string', max:4},
            captcha: { type: 'captcha', captcha: ctx.session.captcha }
        });
        return await ctx.service.user.register();
    }


    async list() {
        const { ctx } = this;
        this.tablename = "user_info"
        let data = await super.list();
        return ctx.success({ data });
    }
}

module.exports = UserController;
