'use strict';
const OSS = require('ali-oss');

const Service = require('egg').Service;

class UploadService extends Service {

    async getOss(){
        let res = await this.ctx.service.mysql.findOne('___o__s_s____gl',{id:1});
        return {
            region:res.region,
            accessKeyId:res.accessKeyId,
            accessKeySecret:res.accessKeySecret,
            bucket:res.bucket
        }
    }

    //连接oss;
    async oss() {
        const { region, accessKeyId, accessKeySecret, bucket } = await this.getOss();
        return new OSS({ region, accessKeyId, accessKeySecret, bucket });
    }
}

module.exports = UploadService;