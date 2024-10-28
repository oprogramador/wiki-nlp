const _ = require('lodash');

const convertAdverbs = (phrase) => {
  if (!phrase[0]) {
    return phrase;
  }
  const object = _.get(phrase, '0.object', []);
  const subject = _.get(phrase, '0.subject', []);

  const { adverb } = [...object, ...subject].find(item => _.get(item, 'groupType') === 'adverb') || {};

  if (adverb) {
    return [
      {
        ...phrase[0],
        adverb,
        object: object.filter(item => _.get(item, 'groupType') !== 'adverb'),
        subject: subject.filter(item => _.get(item, 'groupType') !== 'adverb').flat(),
      },
    ];
  }

  return phrase;
};

module.exports = convertAdverbs;
