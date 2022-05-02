'use strict';

module.exports = {
  success(payload = {}) {
    const { status = 1, msg = 'success', data = [] } = payload;
    return {
      status,
      msg,
      data,
    };
  },
  fail(payload = {}) {
    const { status = 0, msg = 'fail', data = [] } = payload;
    return {
      status,
      msg,
      data,
    };
  },
  send(data) {
    this.body = data;
  }
};

