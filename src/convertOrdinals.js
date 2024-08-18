const _ = require('lodash');
const { withoutLastOne } = require('./listUtils');
const prepositions = require('./prepositionList');

const map = {
  second: 2,
  third: 3,
};

const convertOrdinals = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator) || {};

    if (last === 'the' && current.startsWith) {
      const found = Object.keys(map).find(key => current.startsWith(`${key}-`));
      if (found) {
        return [
          ...withoutLastOne(accumulator),
          {
            adjective: current.replace(`${found}-`, ''),
            groupType: 'ordinal',
            ordinal: 2,
          },
        ];
      }
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

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertOrdinals;
