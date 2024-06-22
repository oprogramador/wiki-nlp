const _ = require('lodash');
const toLowerCase = require('./toLowerCase');

const createDate = {
  in: object => ({
    groupType: 'date',
    year: object.value,
  }),
  since: object => ({
    groupType: 'date',
    maxYear: new Date().getFullYear(),
    minYear: object.value,
  }),
};

const includeDates = phrase => phrase.reduce(
  (accumulator, current) => {
    const initialPreposition = toLowerCase(_.get(current, 'subject.0'));
    if (
      createDate[initialPreposition]
        && _.get(current, 'subject.1.groupType') === 'quantity'
    ) {
      return [
        ...accumulator,
        {
          ...current,
          subject: current.subject.slice(2),
          when: createDate[initialPreposition](_.get(current, 'subject.1')),
        },
      ];
    }
    const last = _.last(current.object) || {};
    const beforeLast = (current.object || []).slice(-2, -1)[0];
    if (
      createDate[beforeLast]
      && last.groupType === 'quantity'
    ) {
      return [
        ...accumulator,
        {
          ...current,
          object: current.object.slice(0, -2),
          when: createDate[beforeLast](last),
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = includeDates;
