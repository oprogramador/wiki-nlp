const _ = require('lodash');
const { withoutLastOne } = require('./listUtils');

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

const createDayObject = (word) => {
  const day = Number(word);
  if (!Number.isNaN(day)) {
    return { day };
  }
  if (!/–/.test(word)) {
    return null;
  }
  const split = word.split('–');
  const minDay = Number(split[0]);
  const maxDay = Number(split[1]);

  return {
    maxDay,
    minDay,
  };
};

const groupDates = phrase => phrase.reduce(
  (accumulator, current) => {
    const last = _.last(accumulator) || {};
    if (months.includes(current)) {
      const month = months.findIndex(element => element === current) + 1;
      const dayObject = createDayObject(last);
      if (dayObject) {
        return [
          ...withoutLastOne(accumulator),
          {
            ...dayObject,
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
        ...withoutLastOne(accumulator),
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
