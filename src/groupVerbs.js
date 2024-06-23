const _ = require('lodash');
const auxiliary = require('./auxiliaryList');
const {
  getFirst,
  withoutFirstOne,
  withoutFirst,
  withoutLastOne,
  withoutLast,
} = require('./listUtils');
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
    return withoutFirstOne(subject);
  }

  return subject;
};

const objectGroupTypes = ['article', 'currency', 'quantity'];

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
        && objectGroupTypes.includes(item.groupType)
        && isLettersOnly(phrase[i - 1])
        && ![...prepositions, ...pronouns].includes(toLowerCase(phrase[i - 1]))) - 1;
  if (verbPlace === 0) {
    return phrase;
  }
  if (verbPlace < 0) {
    const last = _.last(phrase);
    if (groupType === 'verb') {
      if (last && last.charAt && /[a-z]/.test(last.charAt(0))) {
        return [{
          groupType,
          subject: stripComa(withoutLastOne(phrase)),
          verb: last,
        }];
      }
      const insideIndex = phrase.findIndex((item, i) => objectGroupTypes.includes(item.groupType)
          && objectGroupTypes.includes((phrase[i + 1] || {}).groupType));
      const foundSubject = phrase[insideIndex];
      if (insideIndex >= 0) {
        return [{
          groupType,
          object: withoutFirst(phrase, insideIndex + 1),
          subject: [
            ...withoutLast(phrase, insideIndex - 1),
            {
              ...foundSubject,
              ...(foundSubject.words ? { words: withoutLastOne(foundSubject.words) } : {}),
            },
          ],
          verb: _.last(phrase[insideIndex].words),
        }];
      }
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
    object: doRecursion(withoutFirst(phrase, verbPlace + (isNegated ? 2 : 1))),
    subject: doRecursion(stripComa(getFirst(phrase, verbPlace))),
    verb: phrase[verbPlace],
  }];
};

module.exports = groupVerbs;
