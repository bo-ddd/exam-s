'use strict'

const BaseController = require('./base.js');

class RolePermissionController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.tablename = 'role_permission';
    }

    async create() {
        const { ctx } = this;
        let { title } = ctx.request.body;
        let promises = [];
        title.forEach(title => {
           let res =  ctx.service.mysql.create(this.tablename, {title});
           promises.push(res);
        });
       let res =  await Promise.all(promises);
       return res.length === title.length ? ctx.success() : ctx.fail();
      }

    async list() {
        let {ctx} = this;
        // let sql = `select id from user where user_id = ${ctx.session.user.id}`;
        // let data = await ctx.service.mysql.query(sql);
        // let sqlrole = `select id from role where user_id = ${data[0].id}`;
        // let id = await ctx.service.mysql.query(sqlrole);
        // if(!id) ctx.fail({msg:"该用户下面还没有创建角色"});
        // let mysql = ctx.service.mysql;
        // return await mysql.pagination(({ limit, offset }) => {
        //     let sql = `select  role.id as role_id,role_name,title
        //     from role 
        //     inner join role_permission
        //     on role.id = role_permission.r_id
        //     where r_id = ${id[0].id}
        //     limit ${limit}
        //     offset ${offset}
        //     `
        //     let count = mysql.count(this.tablename);
        //     let list = mysql.query(sql);
        //     return [count, list]
        // })
        return ctx.service.mysql.list(this.tablename,{pagination:false});
    }
}

module.exports = RolePermissionController;
