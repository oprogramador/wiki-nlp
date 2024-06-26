const _ = require('lodash');
const toLowerCase = require('./toLowerCase');
const { getBeforeLast, withoutFirst, withoutLast } = require('./listUtils');

const createDate = {
  in: object => ({
    groupType: 'date',
    ...(object.value ? { year: object.value } : {}),
    ..._.pick(object, 'maxYear', 'minYear'),
  }),
  since: (object) => {
    const now = new Date();

    return {
      groupType: 'date',
      maxYear: now.getFullYear(),
      minYear: object.value || object.year,
      ...(object.month ? { maxMonth: now.getMonth() + 1, minMonth: object.month } : { }),
      ...(object.day ? { maxDay: now.getDate(), minDay: object.day } : { }),
    };
  },
};

const includeDates = phrase => phrase.reduce(
  (accumulator, current) => {
    const initialPreposition = toLowerCase(_.get(current, 'subject.0'));
    if (
      createDate[initialPreposition]
        && ['quantity', 'date'].includes(_.get(current, 'subject.1.groupType'))
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
