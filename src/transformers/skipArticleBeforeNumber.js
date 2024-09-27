const _ = require('lodash');
const { withoutLastOne } = require('../utils/listUtils');

const skipArticleBeforeNumber = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator);
    if (
      _.get(last, 'groupType') === 'article'
        && JSON.stringify(last.words) === '["the"]'
        && current.groupType === 'quantity'
    ) {
      return [
        ...withoutLastOne(accumulator),
        current,
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = skipArticleBeforeNumber;
