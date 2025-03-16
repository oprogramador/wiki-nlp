const _ = require('lodash');
const { withoutFirstOne, withoutLastOne } = require('../utils/listUtils');
const omitUndefined = require('../utils/omitUndefined');

const convert = current => omitUndefined({
  ...current,
  maxMonth: current.minMonth || current.month,
  maxYear: current.minYear || current.year || current.value,
  minMonth: undefined,
  minYear: undefined,
  month: undefined,
  value: undefined,
  year: undefined,
});

const convertByTheStart = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator);

    if (last === '#by-the-start-of' && ['date', 'quantity'].includes(_.get(current, 'groupType'))) {
      return [
        ...withoutLastOne(accumulator),
        'in',
        convert(current),
      ];
    }

    if (
      last === '#by-the-start-of'
      && ['and', 'or'].includes(_.get(current, 'groupType'))
      && ['date', 'quantity'].includes(_.get(current, 'members.0.groupType'))
    ) {
      const date = current.members[0];

      return [
        ...withoutLastOne(accumulator),
        'in',
        convert(date),
        {
          ...current,
          members: withoutFirstOne(current.members),
        },
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertByTheStart;
