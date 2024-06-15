const _ = require('lodash');

const convertDateRanges = phrase => phrase.reduce(
  (accumulator, current) => {
    if (/–/.test(current)) {
      const split = current.split('–');
      const beforeLast = accumulator.slice(-2, -1)[0] || {};
      const last = _.last(accumulator);
      const isPeriodMentioned = beforeLast === 'the' && last === 'period';

      return [
        ...(isPeriodMentioned ? accumulator.slice(0, -2) : accumulator),
        {
          groupType: 'date',
          maxYear: split[1],
          minYear: split[0],
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertDateRanges;
