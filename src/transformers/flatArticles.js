const _ = require('lodash');

const flatArticles = (item) => {
  if (_.get(item, 'words.length') === 1) {
    return item.words[0];
  }
  if (typeof item !== 'object') {
    return item;
  }
  if (Array.isArray(item)) {
    return item.map(flatArticles);
  }

  return _.mapValues(item, flatArticles);
};

module.exports = flatArticles;
