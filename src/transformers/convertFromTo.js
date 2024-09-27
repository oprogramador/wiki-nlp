const _ = require('lodash');
const prepositions = require('../utils/prepositionList');
const { withoutLastOne } = require('../utils/listUtils');

const convertFromTo = phrase => phrase.reduce(
  (accumulator, current) => {
    const last = _.last(accumulator);
    if (last === 'from' && ['quantity', 'share', 'currency', 'unit', 'extra'].includes(_.get(current, 'groupType'))) {
      return [
        ...withoutLastOne(accumulator),
        // an article is needed to get an object in the phrase
        {
          groupType: 'article',
        },
        {
          currentPlace: 'from',
          from: current,
          groupType: 'change',
        },
      ];
    }
    if (_.get(last, 'groupType') === 'change') {
      if (current === 'to') {
        return [
          ...withoutLastOne(accumulator),
          {
            ...last,
            currentPlace: 'to',
          },
        ];
      }
      if (prepositions.includes(current)) {
        return [
          ...withoutLastOne(accumulator),
          {
            ...last,
            currentPlace: `${last.currentPlace}-${current}`,
          },
        ];
      }

      return [
        ...withoutLastOne(accumulator),
        {
          ...last,
          [last.currentPlace]: current,
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertFromTo;
