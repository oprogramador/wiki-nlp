const _ = require('lodash');
const { getBeforeLast, withoutLastOne } = require('../utils/listUtils');

const selfWords = [
  'herself',
  'himself',
  'itself',
  'myself',
  'ourselves',
  'themselves',
  'yourself',
  'yourselves',
];

const convertSelf = phrase => phrase
  .reduce((accumulator, current) => {
    const beforeLast = getBeforeLast(accumulator);
    const last = _.last(accumulator);

    if (
      _.get(beforeLast, 'groupType') === 'article'
      && selfWords.includes(last)
    ) {
      return [
        ...withoutLastOne(accumulator),
        ...(current === ',' ? [] : [current]),
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertSelf;
