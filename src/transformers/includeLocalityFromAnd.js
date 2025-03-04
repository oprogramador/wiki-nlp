const _ = require('lodash');
const isUpperCase = require('../utils/isUpperCase');
const toLowerCase = require('../utils/toLowerCase');
const { withoutFirstOne } = require('../utils/listUtils');

const includeLocalityFromAnd = phrase => phrase.map((p) => {
  const { subject } = p;
  if (!subject) {
    return p;
  }
  if (toLowerCase(subject[0]) === 'in' && _.get(subject, '1.members.length') > 1) {
    const where = subject[1].members[0];
    if (isUpperCase(where)) {
      return {
        ...p,
        subject: withoutFirstOne(subject[1].members),
        where,
      };
    }
  }

  return p;
});

module.exports = includeLocalityFromAnd;
