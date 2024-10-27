const _ = require('lodash');
const articles = require('../utils/articleList');
const { withoutFirstOne } = require('../utils/listUtils');
const toLowerCase = require('../utils/toLowerCase');

const convertArticlesToLowerCase = phrase => phrase
  .reduce((accumulator, current) => {
    if (
      _.get(current, 'groupType') === 'article'
        && articles.includes(toLowerCase(current.words[0]))
    ) {
      return [
        ...accumulator,
        {
          ...current,
          words: [
            toLowerCase(current.words[0]),
            ...withoutFirstOne(current.words),
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

module.exports = convertArticlesToLowerCase;
