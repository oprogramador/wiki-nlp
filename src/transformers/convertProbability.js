const _ = require('lodash');
const omitUndefined = require('../utils/omitUndefined');

const convertProbability = (phrase) => {
  if (!phrase[0]) {
    return phrase;
  }
  const adverbs = _.get(phrase, '0.adverbs', []);
  if (adverbs.includes('likely')) {
    const newAdverbs = adverbs.filter(x => x !== 'likely');

    return [
      omitUndefined({
        ...phrase[0],
        adverbs: newAdverbs.length ? newAdverbs : undefined,
        probability: 0.5,
      }),
    ];
  }

  return phrase;
};

module.exports = convertProbability;
