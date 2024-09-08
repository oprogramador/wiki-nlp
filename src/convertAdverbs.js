const _ = require('lodash');

const convertAdverbs = (phrase) => {
  if (!phrase[0]) {
    return phrase;
  }
  const { object, subject } = phrase[0];
  if (!object) {
    return phrase;
  }

  const { adverb } = [...object, ...subject].find(item => item.groupType === 'adverb') || {};

  if (adverb) {
    return [
      {
        ...phrase[0],
        adverb,
        object: object.filter(item => _.get(item, 'groupType') !== 'adverb'),
        subject: subject.filter(item => _.get(item, 'groupType') !== 'adverb'),
      },
    ];
  }

  return phrase;
};

module.exports = convertAdverbs;
