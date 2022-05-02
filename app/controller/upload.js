'use strict';
const BaseController = require('./base.js');
const path  = require("path");

class UploadController extends BaseController {
  async image() {
    const { ctx } = this;
    const files = ctx.request.files;
    const { type } = ctx.request.body;

    if (!files.length) return ctx.fail({ message: '文件内容不能为空' });
    if (type === undefined) return ctx.fail({ message: 'type不能为空' });
    
    const types = ['', 'banner', 'navigation', 'category', 'license','goods','article','quickNavigation'];
    const imgUrl = types[type];
    const file = files[0];
    try {
      // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
      // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
      const client = await this.service.upload.oss();
      const result = await client.put(`${imgUrl}/${path.basename(file.filepath)}`, path.normalize(file.filepath));
      return ctx.success({ data: result.url })
    } catch (e) {
      console.log(e);
      return ctx.fail({ msg: '上传失败,请稍候在试!' })
    }
  }
}

module.exports = UploadController;
