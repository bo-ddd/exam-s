'use strict';
const Type = require('./Type.js');

class CamelCase {
  constructor(target) {
    this.target = target;
  }

  get value() {
    return this.compile(this.target);
  }

  compile(target) {
    let res;
    const t = new Type(target);
    switch (t.type) {
      case 'String':
        res = CamelCase.transform(target);
        break;
      case 'Array':
        res = this.handleArrayTarget(target);
        break;
      case 'Object':
        res = this.handleObjectTarget(target);
        break;
      default:
        res = target;
        break;
    }
    return res;
  }

  static transform(target) {
    return target.replace(/_./g, function(params) {
      try {
        return params.substring(1).toUpperCase();
      } catch (err) {
        return params;
      }
    });
  }
  static format(target) {
    return target.replace(/[A-Z]/g, function(params) {
      try {
        return '_' + params.toLowerCase();
      } catch (err) {
        return params;
      }
    });
  }
  handleArrayTarget(target) {
    const res = [];
    target.forEach(item => {
      const result = this.compile(item);
      res.push(result);
    });
    return res;
  }

  handleObjectTarget(target) {
    const res = {};
    Object.keys(target).forEach(key => {
      const newKey = CamelCase.transform(key);
      res[newKey] = this.compile(target[key]);
    });
    return res;
  }
}

module.exports = CamelCase;
