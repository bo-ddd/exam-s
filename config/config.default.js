/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1631003906083_2658';

  // add your middleware config here
  config.middleware = ['logger', 'auth', 'errorHandler'];

  config.auth = {
    secret: 'xiaohongao',
    authUrls: ['/user/info', '/tasklog/mylist', 'task/list'],
  };

  config.origin = {
    whiteList: ['http://8.131.89.181:80', 'http://8.131.89.181', '*']
  }

  config.multipart = {
    mode: 'file',
    whitelist: ['.png', '.jpg', '.jpeg'], // 覆盖整个白名单，只允许上传 '.png' 格式
    fileSize: '1024kb',
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  config.cors = {
    origin: "http://8.131.89.181",
    allowMethods: "GET, HEAD, PUT, POST, DELETE, PATCH",
    credentials: true
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  userConfig.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['*']
  };

  // config/config.${env}.js
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'bj-cynosdbmysql-grp-790w57fi.sql.tencentcdb.com',
      // 端口号
      port: '26451',
      // 用户名
      user: 'root',
      // 密码
      password: 'genglei-1',
      // 数据库名
      database: 'exam',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.io = {
    init: {},
    namespace: {
      '/': {
        connectionMiddeware: ['connection'],
        packetMiddleware: ['packet'],
      },
    }
  };

  config.redis = {
    client: {
      port: 26451, // Redis port 
      host: 'bj-cynosdbmysql-grp-790w57fi.sql.tencentcdb.com', // Redis host 
      password: 'genglei-1',
      db: "exam"
    },
  }

  return {
    ...config,
    ...userConfig,
  };
};
