const _ = require('lodash');

const createArticleIfNeeded = (word) => {
  if (!_.get(word, 'groupType')) {
    return {
      groupType: 'article',
      words: [word],
    };
  }

  return word;
};

module.exports = createArticleIfNeeded;
