'use strict';

const Service = require('egg').Service;
const CamelCase = require('../public/util/CamelCase');

class FormatService extends Service {
  /**
   * @description 将key转换成驼峰格式
   * @param [String ||  Object ||　Array] target  
   * **/
  camelCase(target) {
    return new CamelCase(target).value;
  }
  /**
   * @description 将一个字符串转换成驼峰
   * @params [String] target
   * **/
  transformCamelCase(target) {
    return CamelCase.transform(target);
  }
  /**
   * @description 将驼峰转换成下划线命名法
   * @param target Object
   * **/
  params(target) {
    const res = {};
    Object.keys(target).forEach(key => {
      res[CamelCase.format(key)] = target[key];
    });
    return res;
  }
  /**
   * @description 判断是否是一个json对象；
   * **/
  isPlainObject(target) {
    return Object.prototype.toString.call(target) === '[object Object]';
  }
  /**
   * @description 把前端传过来的[pageSize,pageNum]过滤掉；
   * **/
  exclude(target, keys) {
    const fields = keys || ['pageSize', 'pageNum', 'pagination'];
    const res = {};
    Object.keys(target).forEach(key => {
      if (fields.includes(key)) {
        return;
      }
      res[key] = target[key];
    });
    return res;
  }
}

module.exports = FormatService;
