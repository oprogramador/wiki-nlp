const _ = require('lodash');
const toLowerCase = require('./toLowerCase');
const { getBeforeLast, withoutFirst, withoutLast } = require('./listUtils');

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
          subject: withoutFirst(current.subject, 2),
          when: createDate[initialPreposition](_.get(current, 'subject.1')),
        },
      ];
    }
    const last = _.last(current.object) || {};
    const beforeLast = getBeforeLast(current.object);
    if (
      createDate[beforeLast]
      && last.groupType === 'quantity'
    ) {
      return [
        ...accumulator,
        {
          ...current,
          object: withoutLast(current.object, 2),
          when: createDate[beforeLast](last),
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = includeDates;
