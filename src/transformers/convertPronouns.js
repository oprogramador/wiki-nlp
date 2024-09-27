const _ = require('lodash');

const pronouns = [
  'It',
  'They',
];

const convertPronouns = (phrase, previousPhrase) => {
  const previousSubject = _.get(previousPhrase, '0.subject');
  if (previousSubject && pronouns.includes(_.get(phrase, '0.subject.0'))) {
    return [
      {
        ...phrase[0],
        subject: previousSubject,
      },
    ];
  }

  return phrase;
};

module.exports = convertPronouns;
