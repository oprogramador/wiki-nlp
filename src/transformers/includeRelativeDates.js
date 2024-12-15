const _ = require('lodash');
const toLowerCase = require('../utils/toLowerCase');
const { withoutFirst } = require('../utils/listUtils');

const includeRelativeDates = (phrase, previousPhrase) => phrase.reduce(
  (accumulator, current) => {
    if (
      _.get(current, 'groupType') === 'quantity'
      && _.get(current, 'item.words.0') === 'years'
      && _.get(current, 'item.words.1') === 'later'
    ) {
      const base = previousPhrase.find(
        (x, i) => _.get(x, 'groupType') === 'quantity'
          && toLowerCase(previousPhrase[i - 1]) === 'in',
      );

      return [
        ...accumulator,
        'in',
        {
          groupType: 'quantity',
          value: base.value + current.value,
        },
        {
          ...current.item,
          words: withoutFirst(current.item.words, 2),
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = includeRelativeDates;
