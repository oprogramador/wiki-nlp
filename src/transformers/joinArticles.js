const _ = require('lodash');
const isUpperCase = require('../utils/isUpperCase');
const prepositions = require('../utils/prepositionList');
const toLowerCase = require('../utils/toLowerCase');
const { withoutLastOne } = require('../utils/listUtils');

const joinArticles = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator) || {};

    if (
      !_.get(last, 'groupType')
      && !prepositions.includes(toLowerCase(last))
      && isUpperCase(last)
      && _.get(current, 'words.0') === 'the'
    ) {
      return [
        ...withoutLastOne(accumulator),
        {
          ...current,
          words: [
            last,
            ...current.words,
          ],
        },
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = joinArticles;
