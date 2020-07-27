function bind(object, fn, args = []) {
  return function () {
    args.push(...arguments);
    return fn.apply(object, args);
  }
}

module.exports = { bind };