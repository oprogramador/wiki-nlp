const _ = require('lodash');
const { getFirst, getLast } = require('../utils/listUtils');
const isUpperCase = require('../utils/isUpperCase');
const toLowerCase = require('../utils/toLowerCase');

const includeSimpleLocalitiesAtBegin = (phrase) => {
  if (!phrase[0]) {
    return phrase;
  }
  const { subject } = phrase[0];
  if (!subject) {
    return phrase;
  }
  const lastIndex = _.findLastIndex(subject, (item, i) => toLowerCase(item) === 'in' && isUpperCase(subject[i + 1]));
  if (lastIndex >= 0) {
    return [{
      ...phrase[0],
      subject: [
        ...getFirst(subject, lastIndex),
        ...getLast(subject, subject.length - lastIndex - 2),
      ],
      where: (phrase[0].where
        ? {
          general: subject[lastIndex + 1],
          precise: phrase[0].where,
        }
        : subject[lastIndex + 1]
      ),
    }];
  }

  return phrase;
};

module.exports = includeSimpleLocalitiesAtBegin;
