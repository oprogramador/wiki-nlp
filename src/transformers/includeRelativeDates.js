const _ = require('lodash');
const toLowerCase = require('../utils/toLowerCase');
const { withoutFirst } = require('../utils/listUtils');

const includeRelativeDates = (phrase, previousPhrase = []) => phrase.reduce(
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
      if (!base) {
        return [...accumulator, current];
      }

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

    if (
      _.get(current, 'groupType') === 'locality'
      && _.get(current, 'precise.words.0') === 'the'
      && _.get(current, 'precise.words.1') === 'same'
      && _.get(current, 'precise.words.2') === 'time'
    ) {
      const firstBase = previousPhrase.find(
        (x, i) => _.get(x, 'groupType') === 'quantity'
          && toLowerCase(previousPhrase[i - 1]) === 'in',
      );
      const anotherBase = previousPhrase.find(
        x => _.get(x, 'groupType') === 'date',
      );
      const base = firstBase || anotherBase;
      if (!base) {
        return [...accumulator, current];
      }

      return [
        ...accumulator,
        'in',
        base,
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = includeRelativeDates;
