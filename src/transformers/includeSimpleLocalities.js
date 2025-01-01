const _ = require('lodash');
const { getFirst, getLast } = require('../utils/listUtils');
const isUpperCase = require('../utils/isUpperCase');

const includeSimpleLocalities = (phrase) => {
  if (!phrase[0]) {
    return phrase;
  }
  const { object } = phrase[0];
  if (!object) {
    return phrase;
  }
  const lastIndex = _.findLastIndex(object, (item, i) => item === 'in' && isUpperCase(object[i + 1]));
  if (lastIndex >= 0) {
    return [{
      ...phrase[0],
      object: [
        ...getFirst(object, lastIndex),
        ...getLast(object, object.length - lastIndex - 2),
      ],
      where: object[lastIndex + 1],
    }];
  }

  return phrase;
};

module.exports = includeSimpleLocalities;
