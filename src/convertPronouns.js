const _ = require('lodash');

const convertPronouns = (phrase, previousPhrase) => {
  const previousSubject = _.get(previousPhrase, '0.subject');
  if (previousSubject && _.get(phrase, '0.subject.0') === 'It') {
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
