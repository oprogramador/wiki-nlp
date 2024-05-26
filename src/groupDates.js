const _ = require('lodash');

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const groupDates = phrase => phrase.reduce(
  (accumulator, current) => {
    const last = _.last(accumulator) || {};
    if (months.includes(current)) {
      const month = months.findIndex(element => element === current);
      if (!Number.isNaN(Number(last))) {
        return [
          ...accumulator.slice(0, -1),
          {
            day: Number(last),
            groupType: 'date',
            month,
          },
        ];
      }

      return [
        ...accumulator,
        {
          groupType: 'date',
          month,
        },
      ];
    }
    if (last.groupType === 'date' && !Number.isNaN(Number(current))) {
      return [
        ...accumulator.slice(0, -1),
        {
          ...last,
          year: Number(current),
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = groupDates;
