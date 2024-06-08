const _ = require('lodash');
const toLowerCase = require('./toLowerCase');

const includeDates = phrase => phrase.reduce(
  (accumulator, current) => {
    if (
      toLowerCase(_.get(current, 'subject.0')) === 'in'
        && _.get(current, 'subject.1.groupType') === 'quantity'
    ) {
      return [
        ...accumulator,
        {
          ...current,
          subject: current.subject.slice(2),
          when: {
            groupType: 'date',
            year: _.get(current, 'subject.1').value,
          },
        },
      ];
    }
    const last = _.last(current.object) || {};
    const beforeLast = (current.object || []).slice(-2, -1)[0];
    if (
      beforeLast === 'in'
      && last.groupType === 'quantity'
    ) {
      return [
        ...accumulator,
        {
          ...current,
          object: current.object.slice(0, -2),
          when: {
            groupType: 'date',
            year: last.value,
          },
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = includeDates;
