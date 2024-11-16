const _ = require('lodash');
const auxiliary = require('../utils/auxiliaryList');
const {
  getFirst,
  withoutFirstOne,
  withoutFirst,
  withoutLastOne,
} = require('../utils/listUtils');
const isLettersOnly = require('../utils/isLettersOnly');
const isUpperCase = require('../utils/isUpperCase');
const logicalList = require('../utils/logicalList');
const prepositions = require('../utils/prepositionList');
const pronouns = require('../utils/pronounsList');
const toLowerCase = require('../utils/toLowerCase');

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

const objectGroupTypes = [
  ...logicalList,
  'article',
  'currency',
  'outOf',
  'quantity',
  'unit',
];

const getWords = object => object.words || _.get(object, 'item.words');

const replaceWords = (object, newWords) => {
  if (!newWords) {
    return object;
  }
  if (object.words) {
    return {
      ...object,
      words: newWords,
    };
  }
  if (_.get(object, 'item.words')) {
    return {
      ...object,
      item: {
        ...object.item,
        words: newWords,
      },
    };
  }

  return object;
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
  const potentialVerbPlace = auxiliaryPlace >= 0
    ? auxiliaryPlace
    : phrase.findIndex((item, i) => i > 0
        && (objectGroupTypes.includes(_.get(item, 'groupType')) || prepositions.includes(item))
        && isLettersOnly(phrase[i - 1])
        && ![...prepositions, ...pronouns].includes(toLowerCase(phrase[i - 1]))) - 1;
  const verbPlace = negations.includes(phrase[potentialVerbPlace]) ? potentialVerbPlace - 1 : potentialVerbPlace;
  if (verbPlace === 0) {
    if (
      groupType === 'verb'
      && _.get(phrase, '1.words.length') === 2
    ) {
      return [{
        groupType,
        object: [
          phrase[1].words[1],
          ...withoutFirst(phrase, 2),
        ],
        subject: [phrase[0]],
        verb: phrase[1].words[0],
      }];
    }

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
      const insideIndex = phrase.findIndex((item, i) => (
        objectGroupTypes.includes(_.get(item, 'groupType'))
        || (!_.get(item, 'groupType') && isLettersOnly(item) && !prepositions.includes(toLowerCase(item)))
      )
        && (
          !getWords(item)
          || getWords(item).length > 2
          || isUpperCase(getWords(item)[1])
          || !['the', 'a'].includes(toLowerCase(getWords(item)[0]))
        )
          && (
            objectGroupTypes.includes((phrase[i + 1] || {}).groupType)
            || prepositions.includes(phrase[i + 1])
          ));
      const foundSubject = phrase[insideIndex];
      if (insideIndex >= 0) {
        let verb = _.last(getWords(phrase[insideIndex]));
        if (verb && !isUpperCase(verb)) {
          const subjectWords = getWords(foundSubject) ? withoutLastOne(getWords(foundSubject)) : null;

          return [{
            groupType,
            object: withoutFirst(phrase, insideIndex + 1),
            subject: [
              ...getFirst(phrase, insideIndex),
              replaceWords(foundSubject, subjectWords),
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
              replaceWords(foundObjectBegin, withoutFirstOne(getWords(foundObjectBegin))),
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
