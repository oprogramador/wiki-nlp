const _ = require('lodash');
const { getBeforeLast, withoutLast } = require('../utils/listUtils');

const convertColon = phrase => phrase
  .reduce((accumulator, current) => {
    const beforeLast = getBeforeLast(accumulator);
    const last = _.last(accumulator);

    if (last === ':') {
      return [
        ...withoutLast(accumulator, 2),
        {
          example: current,
          general: beforeLast,
          groupType: 'example',
        },
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertColon;
