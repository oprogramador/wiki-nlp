const _ = require('lodash');
const auxiliary = require('./auxiliaryList');
const {
  getFirst,
  withoutFirstOne,
  withoutFirst,
  withoutLastOne,
} = require('./listUtils');
const isLettersOnly = require('./isLettersOnly');
const isUpperCase = require('./isUpperCase');
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

const objectGroupTypes = ['article', 'currency', 'quantity', 'and', 'or'];

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
        && (
          !item.words
          || item.words.length > 2
          || isUpperCase(item.words[1])
          || !['the', 'a'].includes(toLowerCase(item.words[0]))
        )
          && (
            objectGroupTypes.includes((phrase[i + 1] || {}).groupType)
            || prepositions.includes(phrase[i + 1])
          ));
      const foundSubject = phrase[insideIndex];
      if (insideIndex >= 0) {
        let verb = _.last(phrase[insideIndex].words);
        if (!isUpperCase(verb)) {
          return [{
            groupType,
            object: withoutFirst(phrase, insideIndex + 1),
            subject: [
              ...getFirst(phrase, insideIndex),
              {
                ...foundSubject,
                ...(foundSubject.words ? { words: withoutLastOne(foundSubject.words) } : {}),
              },
            ],
            verb,
          }];
        }
        verb = _.get(phrase[insideIndex + 1], 'words.0');
        if (verb) {
          const foundObject = withoutFirst(phrase, insideIndex + 1);
          const foundObjectBegin = foundObject[0];

          return [{
            groupType,
            object: [
              {
                ...foundObjectBegin,
                words: withoutFirstOne(foundObjectBegin.words),
              },
              ...withoutFirstOne(foundObject),
            ],
            subject: [foundSubject],
            verb,
          }];
        }
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
