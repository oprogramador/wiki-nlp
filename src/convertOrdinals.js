const _ = require('lodash');
const { getBeforeLast, withoutLast, withoutLastOne } = require('./listUtils');
const prepositions = require('./prepositionList');

const map = {
  second: 2,
  third: 3,
};

const convertOrdinals = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator) || {};
    const beforeLast = getBeforeLast(accumulator);

    if (last === 'the' && current.startsWith) {
      const found = Object.keys(map).find(key => current.startsWith(`${key}-`));
      if (found) {
        return [
          ...withoutLastOne(accumulator),
          {
            adjective: current.replace(`${found}-`, ''),
            groupType: 'ordinal',
            ordinal: map[found],
          },
        ];
      }
    }
    if (
      last.groupType === 'ordinal'
      && last.higher
      && (current.groupType === 'article' || !current.groupType)
      && !prepositions.includes(current)
    ) {
      return [
        ...withoutLastOne(accumulator),
        {
          ...last,
          higher: [
            ...(last.higher || []),
            current,
          ],
        },
      ];
    }
    if (
      last.groupType === 'ordinal'
      && (current.groupType === 'article' || !current.groupType)
      && !prepositions.includes(current)
    ) {
      return [
        ...withoutLastOne(accumulator),
        {
          ...last,
          item: [
            ...(last.item || []),
            current,
          ],
        },
      ];
    }
    if (
      beforeLast.groupType === 'ordinal'
      && last === 'after'
      && (current.groupType === 'article' || !current.groupType)
    ) {
      return [
        ...withoutLast(accumulator, 2),
        {
          ...beforeLast,
          higher: [
            ...(last.higher || []),
            current,
          ],
        },
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertOrdinals;
