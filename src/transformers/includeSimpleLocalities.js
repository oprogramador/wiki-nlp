const _ = require('lodash');
const { getBeforeLast, withoutLast } = require('../utils/listUtils');
const isUpperCase = require('../utils/isUpperCase');

const includeSimpleLocalities = (phrase) => {
  if (!phrase[0]) {
    return phrase;
  }
  const { object } = phrase[0];
  if (!object) {
    return phrase;
  }
  const last = _.last(object);
  const beforeLast = getBeforeLast(object);
  if (
    beforeLast === 'in'
    && isUpperCase(last)
  ) {
    return [{
      ...phrase[0],
      object: withoutLast(object, 2),
      where: last,
    }];
  }

  return phrase;
};

module.exports = includeSimpleLocalities;
