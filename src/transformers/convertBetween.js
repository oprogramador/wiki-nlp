const toLowerCase = require('../utils/toLowerCase');
const {
  getLast,
  withoutLast,
} = require('../utils/listUtils');

const convertBetween = phrase => phrase
  .reduce((accumulator, current) => {
    const [
      beforeBeforeBeforeLast,
      beforeBeforeLast,
      beforeLast,
      last,
    ] = getLast(accumulator, 4);

    if (
      toLowerCase(beforeBeforeBeforeLast) === 'between'
      && beforeLast === ','
      && last === 'and'
    ) {
      return [
        ...withoutLast(accumulator, 4),
        'in',
        `${beforeBeforeLast}–${current}`,
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertBetween;
