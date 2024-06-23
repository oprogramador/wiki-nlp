const _ = require('lodash');
const { withoutLastOne } = require('./listUtils');

const convertDateRanges = phrase => phrase.reduce(
  (accumulator, current) => {
    if (current.groupType === 'quantity' && current.min && current.max && !current.item) {
      const last = _.last(accumulator) || {};
      const isPeriodMentioned = last.groupType === 'article' && JSON.stringify(last.words) === '["the","period"]';

      return [
        ...(isPeriodMentioned ? withoutLastOne(accumulator) : accumulator),
        {
          groupType: 'date',
          maxYear: current.max,
          minYear: current.min,
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertDateRanges;
