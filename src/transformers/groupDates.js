const _ = require('lodash');
const {
  getBeforeBeforeLast,
  getBeforeLast,
  withoutLast,
  withoutLastOne,
} = require('../utils/listUtils');

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
    const beforeLast = getBeforeLast(accumulator);
    const beforeBeforeLast = getBeforeBeforeLast(accumulator);

    if (
      current === 'year'
      && last === 'calendar'
      && !Number.isNaN(Number(beforeLast))
      && beforeBeforeLast === 'the'
    ) {
      return [
        ...withoutLast(accumulator, 3),
        {
          groupType: 'date',
          year: Number(beforeLast),
        },
      ];
    }

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
