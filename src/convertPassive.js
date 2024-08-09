const _ = require('lodash');
const convertPastParticipleToPresent = require('./convertPastParticipleToPresent');
const toLowerCase = require('./toLowerCase');

const isToBe = word => ['am', 'is', 'are', 'was', 'were'].includes(word);

const convertPassive = (phrase) => {
  if (!_.get(phrase, '0.object')) {
    return phrase;
  }
  const { object, subject, verb } = phrase[0];

  const potentialNewVerb = _.get(object, '0.subject.0');

  if (isToBe(verb) && _.get(object, '0.verb') === 'by' && /ed$/.test(potentialNewVerb)) {
    return [
      {
        ...phrase[0],
        object: subject.map(toLowerCase),
        subject: object[0].object,
        verb: convertPastParticipleToPresent(potentialNewVerb),
      },
    ];
  }

  return phrase;
};

module.exports = convertPassive;
