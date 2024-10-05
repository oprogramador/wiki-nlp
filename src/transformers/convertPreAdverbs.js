const _ = require('lodash');
const isAdverb = require('../utils/isAdverb');
const { getFirst, withoutFirst, withoutLastOne } = require('../utils/listUtils');
const articleToWord = require('../utils/articleToWord');
const isUpperCase = require('../utils/isUpperCase');
const toLowerCase = require('../utils/toLowerCase');

const convertPreAdverbs = phrase => phrase.reduce(
  (accumulator, current) => {
    const last = _.last(accumulator);
    if (isAdverb(last) && current === ',' && toLowerCase(last) !== 'respectively') {
      return [
        ...withoutLastOne(accumulator),
        {
          adverb: toLowerCase(last),
          groupType: 'adverb',
        },
      ];
    }
    if (_.get(current, 'groupType') === 'article' && current.words) {
      const adverbPlace = current.words.findIndex(word => isAdverb(word) && !isUpperCase(word));
      if (adverbPlace >= 0) {
        const shouldAddAtEnd = adverbPlace <= 1 && current.words.length > 3;
        const adverbItems = [{
          adverb: current.words[adverbPlace],
          groupType: 'adverb',
        }];

        return [
          ...accumulator,
          ...(!shouldAddAtEnd ? adverbItems : []),
          articleToWord({
            ...current,
            words: getFirst(current.words, adverbPlace),
          }),
          ...(adverbPlace < current.words.length - 1 ? [articleToWord({
            ...current,
            words: withoutFirst(current.words, adverbPlace + 1),
          })] : []),
          ...(shouldAddAtEnd ? adverbItems : []),
        ];
      }
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertPreAdverbs;
