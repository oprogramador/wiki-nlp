const _ = require('lodash');
const convertPastParticipleToPresent = require('./convertPastParticipleToPresent');
const toLowerCase = require('./toLowerCase');
const irregularVerbsList = require('./irregularVerbsList');

const isToBe = word => ['am', 'is', 'are', 'was', 'were'].includes(word);

const convertPassive = (phrase) => {
  if (!_.get(phrase, '0.object')) {
    return phrase;
  }
  const { object, subject, verb } = phrase[0];

  const potentialNewVerb = _.get(object, '0.subject.0');

  const found = _.get(
    irregularVerbsList.find(item => item.pastParticiple === potentialNewVerb),
    'present',
  );

  if (isToBe(verb) && _.get(object, '0.verb') === 'by' && (/ed$/.test(potentialNewVerb) || found)) {
    return [
      {
        ...phrase[0],
        object: subject.map(toLowerCase),
        subject: object[0].object,
        verb: found || convertPastParticipleToPresent(potentialNewVerb),
      },
    ];
  }

  return phrase;
};

module.exports = convertPassive;
