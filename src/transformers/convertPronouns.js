const _ = require('lodash');
const toLowerCase = require('../utils/toLowerCase');

const pronouns = [
  'it',
  'they',
];

const convertPronouns = (phrase, previousPhrase) => {
  const previousSubject = _.get(previousPhrase, '0.subject');
  if (previousSubject && pronouns.includes(toLowerCase(_.get(phrase, '0.subject.0')))) {
    return [
      {
        ...phrase[0],
        subject: previousSubject,
      },
    ];
  }
  const previousObject = _.get(previousPhrase, '0.object');
  if (previousObject && _.get(phrase, '0.subject.0') === 'it-object') {
    return [
      {
        ...phrase[0],
        subject: previousObject,
      },
    ];
  }

  return phrase;
};

module.exports = convertPronouns;
