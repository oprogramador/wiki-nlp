const _ = require('lodash');
const fs = require('fs');

const auxiliary = fs
  .readFileSync(`${__dirname}/resources/auxiliary.txt`)
  .toString()
  .split('\n')
  .filter(x => x);

const negations = [
  'no',
  'not',
];

const groupVerbs = (phrase, { list = auxiliary, groupType = 'verb' } = {}) => {
  if (phrase && phrase.length === 1 && phrase[0].groupType === 'verb') {
    const group = phrase[0];
    const { object, subject } = group;

    return [{
      ...group,
      ...(object ? { object: groupVerbs(object, { groupType, list }) } : {}),
      ...(subject ? { subject: groupVerbs(subject, { groupType, list }) } : {}),
    }];
  }
  const verbPlace = phrase.findIndex(item => list.includes(item));
  if (verbPlace < 0) {
    const last = _.last(phrase);
    if (groupType === 'verb' && last && last.charAt && /[a-z]/.test(last.charAt(0))) {
      return [{
        groupType,
        subject: phrase.slice(0, -1),
        verb: last,
      }];
    }

    return phrase;
  }
  const isNegated = negations.includes(phrase[verbPlace + 1]);

  return [{
    groupType,
    ...(isNegated ? { isNegated } : {}),
    object: groupVerbs(phrase.slice(verbPlace + (isNegated ? 2 : 1)), { list, groupType }),
    subject: groupVerbs(phrase.slice(0, verbPlace), { list, groupType }),
    verb: phrase[verbPlace],
  }];
};

module.exports = groupVerbs;
