'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller,io } = app;
  // home
  router.get('/', controller.home.index);

  Object.keys(controller).forEach(filename=> {
    router.post(`/${filename}/:route`,controller[filename].index)
  });
  
  io.of('/').route('server',io.controller.defalut.index);
  router.get('/captcha', controller.user.captcha);
};
