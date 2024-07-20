const _ = require('lodash');

const createDate = {
  by: (object, now) => ({
    groupType: 'date',
    maxYear: object.value || object.year,
    minYear: now.getFullYear(),
    ...(object.month ? { maxMonth: object.month, minMonth: now.getMonth() + 1 } : { }),
    ...(object.day ? { maxDay: object.day, minDay: now.getDate() } : { }),
  }),
  in: object => ({
    groupType: 'date',
    ...(object.value ? { year: object.value } : {}),
    ..._.pick(object, 'maxYear', 'minYear'),
  }),
  since: (object, now) => ({
    groupType: 'date',
    maxYear: now.getFullYear(),
    minYear: object.value || object.year,
    ...(object.month ? { maxMonth: now.getMonth() + 1, minMonth: object.month } : { }),
    ...(object.day ? { maxDay: now.getDate(), minDay: object.day } : { }),
  }),
};

module.exports = createDate;
