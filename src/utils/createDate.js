const _ = require('lodash');

const createDate = {
  at: object => ({
    groupType: 'date',
    ..._.pick(object, 'isExact'),
    ...(object.value ? { year: object.value } : {}),
  }),
  by: (object, now) => {
    const minYear = now.getFullYear();
    const maxYear = object.value || object.year || object.maxYear;

    return {
      groupType: 'date',
      maxYear,
      ...(minYear < maxYear ? { minYear } : {}),
      ...(object.month ? { maxMonth: object.month, minMonth: now.getMonth() + 1 } : { }),
      ...(object.day ? { maxDay: object.day, minDay: now.getDate() } : { }),
      ..._.pick(object, 'isExact'),
    };
  },
  during: object => ({
    groupType: 'date',
    ..._.pick(object, 'maxYear', 'minYear', 'month', 'year', 'isExact'),
  }),
  in: object => ({
    groupType: 'date',
    ..._.pick(object, 'maxYear', 'minYear', 'maxMonth', 'minMonth', 'maxDay', 'minDay', 'month', 'year', 'isExact'),
    ...(object.value ? { year: object.value } : {}),
  }),
  on: object => ({
    ..._.pick(object, 'minDay', 'maxDay', 'day', 'month', 'year', 'isExact'),
    groupType: 'date',
  }),
  since: (object, now) => ({
    groupType: 'date',
    maxYear: now.getFullYear(),
    minYear: object.value || object.year || object.minYear,
    ...(object.month ? { maxMonth: now.getMonth() + 1, minMonth: object.month } : { }),
    ...(object.day ? { maxDay: now.getDate(), minDay: object.day } : { }),
    ..._.pick(object, 'isExact'),
  }),
  undefined: object => ({
    groupType: 'date',
    ..._.pick(object, 'isExact'),
    ...(object.value ? { year: object.value } : {}),
  }),
};

module.exports = createDate;
