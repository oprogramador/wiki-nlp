const _ = require('lodash');
const irregularVerbsList = require('../utils/irregularVerbsList');
const { withoutLastOne } = require('../utils/listUtils');

const irregularVerbsPast = irregularVerbsList.map(item => item.past);

const splitVerbFromArticle = phrase => phrase.reduce(
  (accumulator, current) => {
    const last = _.last(current.words);
    if (irregularVerbsPast.includes(last)) {
      return [
        ...accumulator,
        {
          ...current,
          words: withoutLastOne(current.words),
        },
        last,
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = splitVerbFromArticle;
