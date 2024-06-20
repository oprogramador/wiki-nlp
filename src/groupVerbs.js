const _ = require('lodash');
const auxiliary = require('./auxiliaryList');
const isLettersOnly = require('./isLettersOnly');
const prepositions = require('./prepositionList');
const pronouns = require('./pronounsList');
const toLowerCase = require('./toLowerCase');

const negations = [
  'no',
  'not',
];

const stripComa = (subject) => {
  if (subject[0] === ',') {
    return subject.slice(1);
  }

  return subject;
};

const groupVerbs = (phrase, { list = auxiliary, groupType = 'verb' } = {}) => {
  if (phrase && phrase.length === 1 && phrase[0].groupType === 'verb') {
    const group = phrase[0];
    const { object, subject } = group;

    return [{
      ...group,
      ...(object ? { object: groupVerbs(object, { groupType, list }) } : {}),
      ...(subject ? { subject: stripComa(groupVerbs(subject, { groupType, list })) } : {}),
    }];
  }
  const auxiliaryPlace = phrase.findIndex(item => list.includes(item));
  const verbPlace = auxiliaryPlace >= 0
    ? auxiliaryPlace
    : phrase.findIndex((item, i) => i > 0
        && ['article', 'currency', 'quantity'].includes(item.groupType)
        && isLettersOnly(phrase[i - 1])
        && ![...prepositions, ...pronouns].includes(toLowerCase(phrase[i - 1]))) - 1;
  if (verbPlace === 0) {
    return phrase;
  }
  if (verbPlace < 0) {
    const last = _.last(phrase);
    if (groupType === 'verb' && last && last.charAt && /[a-z]/.test(last.charAt(0))) {
      return [{
        groupType,
        subject: stripComa(phrase.slice(0, -1)),
        verb: last,
      }];
    }

    return phrase;
  }
  const isNegated = negations.includes(phrase[verbPlace + 1]);

  const doRecursion = groupType === 'verb'
    ? x => x
    : x => groupVerbs(x, { groupType, list });

  return [{
    groupType,
    ...(isNegated ? { isNegated } : {}),
    object: doRecursion(phrase.slice(verbPlace + (isNegated ? 2 : 1))),
    subject: doRecursion(stripComa(phrase.slice(0, verbPlace))),
    verb: phrase[verbPlace],
  }];
};

module.exports = groupVerbs;
