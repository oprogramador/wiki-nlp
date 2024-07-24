const { withoutFirst } = require('./listUtils');

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

  return phrase;
};

module.exports = includeAccordance;
