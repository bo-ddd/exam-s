'use strict';

class Type {
  constructor(val) {
    this.val = val;
  }

  get type() {
    if (this.val === null) return 'Null';
    return Array.isArray(this.val) ? 'Array' : Array.prototype.toString.call(this.val).slice(8, -1);
  }

  isPlainObject() {
    return this.type === 'Object';
  }
}

module.exports = Type;
