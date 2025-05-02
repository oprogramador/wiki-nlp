const _ = require('lodash');
const { withoutLastOne } = require('../utils/listUtils');

const stripRedundantComma = phrase => phrase.map((p) => {
  const { subject } = p;

  return {
    ...p,
    subject: _.last(subject) === ',' ? withoutLastOne(subject) : subject,
  };
});

module.exports = stripRedundantComma;
