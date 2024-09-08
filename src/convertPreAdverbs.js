const isAdverb = require('./isAdverb');
const { getFirst, withoutFirst } = require('./listUtils');
const articleToWord = require('./articleToWord');

const convertPreAdverbs = phrase => phrase.reduce(
  (accumulator, current) => {
    if (current.groupType === 'article' && current.words) {
      const adverbPlace = current.words.findIndex(isAdverb);
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
          articleToWord({
            ...current,
            words: withoutFirst(current.words, adverbPlace + 1),
          }),
          ...(shouldAddAtEnd ? adverbItems : []),
        ];
      }
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertPreAdverbs;
