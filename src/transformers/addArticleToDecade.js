const _ = require('lodash');

const addArticleToDecade = phrase => phrase.reduce(
  (accumulator, current) => {
    const last = _.last(accumulator);
    if (/0s/.test(current) && last && _.get(last, 'words.0') !== 'the') {
      return [
        ...accumulator,
        {
          groupType: ['article'],
          words: [
            'the',
          ],
        },
        current,
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = addArticleToDecade;
