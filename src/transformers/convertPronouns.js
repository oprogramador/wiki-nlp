const _ = require('lodash');
const omitUndefined = require('../utils/omitUndefined');
const toLowerCase = require('../utils/toLowerCase');

const pronouns = [
  'he',
  'it',
  'she',
  'they',
];

const convertPronouns = (phrase, previousPhrase) => {
  const previousSubject = _.get(previousPhrase, '0.subject');
  const previousObject = _.get(previousPhrase, '0.object');
  if (previousSubject && pronouns.includes(toLowerCase(_.get(phrase, '0.subject.0')))) {
    return [
      omitUndefined({
        ...phrase[0],
        isFromPassive: undefined,
        object: [
          ...(previousPhrase[0].isFromPassive ? [previousObject] : []),
          ..._.get(phrase, '0.object', []),
        ],
        subject: previousSubject,
      }),
    ];
  }
  if (previousObject && _.get(phrase, '0.subject.0') === 'it-object') {
    return [
      omitUndefined({
        ...phrase[0],
        isFromPassive: undefined,
        subject: previousObject,
      }),
    ];
  }

  return phrase.map(p => omitUndefined({
    ...p,
    isFromPassive: undefined,
  }));
};

module.exports = convertPronouns;
