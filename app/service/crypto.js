'use strict';
const NodeRSA = require('node-rsa');
const Service = require('egg').Service;

class CryptoService extends Service {

    async getRSAKeyPair(){
        let res = await this.ctx.service.mysql.findOne('___rsa_key___',{id:1});
        return {
            pubKey:res.pubKey,
            priKey:res.priKey
        }
    }

    // RSA 私钥解密
    async decrypt(plain) {
        const keys = await this.getRSAKeyPair(); 
        const privateKey = new NodeRSA(keys.priKey);
        privateKey.setOptions({encryptionScheme: 'pkcs1'}); // 因为jsencrypt自身使用的是pkcs1加密方案, nodejs需要修改成pkcs1。
        const decrypted = privateKey.decrypt(plain, 'utf8');
        return decrypted;
    }
}

module.exports = CryptoService;