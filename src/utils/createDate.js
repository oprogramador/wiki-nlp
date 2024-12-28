const _ = require('lodash');

const createDate = {
  by: (object, now) => {
    const minYear = now.getFullYear();
    const maxYear = object.value || object.year;

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
    ..._.pick(object, 'maxYear', 'minYear', 'minMonth', 'minDay', 'month', 'year', 'isExact'),
    ...(object.value ? { year: object.value } : {}),
  }),
  on: object => ({
    ..._.pick(object, 'minDay', 'maxDay', 'day', 'month', 'year', 'isExact'),
    groupType: 'date',
  }),
  since: (object, now) => ({
    groupType: 'date',
    maxYear: now.getFullYear(),
    minYear: object.value || object.year,
    ...(object.month ? { maxMonth: now.getMonth() + 1, minMonth: object.month } : { }),
    ...(object.day ? { maxDay: now.getDate(), minDay: object.day } : { }),
    ..._.pick(object, 'isExact'),
  }),
};

module.exports = createDate;
