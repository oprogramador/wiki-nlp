const _ = require('lodash');

const omitUndefined = object => _.omitBy(object, x => typeof x === 'undefined');

module.exports = omitUndefined;
