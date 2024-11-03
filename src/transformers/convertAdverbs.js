const _ = require('lodash');

const convertAdverbs = (phrase) => {
  if (!phrase[0]) {
    return phrase;
  }
  const object = _.get(phrase, '0.object', []);
  const subject = _.get(phrase, '0.subject', []);

  const adverbs = [...object, ...subject]
    .filter(item => _.get(item, 'groupType') === 'adverb')
    .map(x => x.adverb);

  if (_.get(adverbs, '0')) {
    return [
      {
        ...phrase[0],
        adverbs,
        object: object.filter(item => _.get(item, 'groupType') !== 'adverb'),
        subject: subject.filter(item => _.get(item, 'groupType') !== 'adverb').flat(),
      },
    ];
  }

  return phrase;
};

module.exports = convertAdverbs;
