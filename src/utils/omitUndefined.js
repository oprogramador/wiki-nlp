const _ = require('lodash');

const omitUndefined = object => _.omitBy(object, x => typeof x === 'undefined' || Object.is(x, NaN));

module.exports = omitUndefined;
