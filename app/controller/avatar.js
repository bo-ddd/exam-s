'use strict';

const BaseController = require('./base.js');

class AvatarController extends BaseController {
    async list() {
        const {ctx} = this;
        return ctx.success({data:[
            {
                url:"http://unier.oss-cn-beijing.aliyuncs.com/avatar/35f031eb-801f-4f91-b2db-7b8e84b7a52d.png",
            },
            {
                url:"http://unier.oss-cn-beijing.aliyuncs.com/avatar/9b111812-1406-472f-9bcb-388e0fb932e0.png",
            },
            {
                url:"http://unier.oss-cn-beijing.aliyuncs.com/avatar/9bddaac8-ccd9-48b0-ba8e-b0882b1792da.png",
            },
            {
                url:"http://unier.oss-cn-beijing.aliyuncs.com/avatar/aede9bc2-1120-4014-803b-96fc46034d58.png",
            },
            {
                url: "http://unier.oss-cn-beijing.aliyuncs.com/avatar/09801c61-8432-4537-8921-fe52b9d615b4.png",
            },
            {
                url: "http://unier.oss-cn-beijing.aliyuncs.com/avatar/cd1a571b-9143-4618-b5ba-71a28783b7da.png",
            },
            {
                url: "http://unier.oss-cn-beijing.aliyuncs.com/avatar/7a7281c8-7ea0-4ee9-b4bd-aa2b1888fec4.png",
            },
        ]});
    }
}

module.exports = AvatarController;
