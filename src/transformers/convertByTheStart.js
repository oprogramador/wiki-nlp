const _ = require('lodash');
const { withoutLastOne } = require('../utils/listUtils');
const omitUndefined = require('../utils/omitUndefined');

const convertByTheStart = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator);

    if (last === '#by-the-start-of' && _.get(current, 'groupType') === 'date') {
      return [
        ...withoutLastOne(accumulator),
        'in',
        omitUndefined({
          ...current,
          maxYear: current.minYear,
          minYear: undefined,
        }),
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertByTheStart;
