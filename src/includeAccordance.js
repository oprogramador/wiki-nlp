const _ = require('lodash');
const {
  getBeforeBeforeLast,
  getBeforeLast,
  withoutFirst,
  withoutLast,
} = require('./listUtils');

const includeAccordance = (phrase) => {
  if (!phrase[0]) {
    return phrase;
  }
  if (!phrase[0].object && !phrase[0].subject) {
    return phrase;
  }
  const subject = phrase[0].subject || [];
  if (subject[0] === 'According' && subject[1] === 'to') {
    return [{
      ...phrase[0],
      source: subject[2],
      subject: withoutFirst(subject, 3),
    }];
  }
  const object = phrase[0].object || [];
  if (getBeforeBeforeLast(object) === 'according' && getBeforeLast(object) === 'to') {
    return [{
      ...phrase[0],
      object: withoutLast(object, 3),
      source: _.last(object),
    }];
  }

  return phrase;
};

module.exports = includeAccordance;
