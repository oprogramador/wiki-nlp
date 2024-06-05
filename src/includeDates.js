const _ = require('lodash');
const toLowerCase = require('./toLowerCase');

const includeDates = phrase => phrase.reduce(
  (accumulator, current) => {
    if (toLowerCase(_.get(current, 'subject.0')) === 'in' && _.get(current, 'subject.1.groupType') === 'quantity') {
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

    return [...accumulator, current];
  },
  [],
);

module.exports = includeDates;
