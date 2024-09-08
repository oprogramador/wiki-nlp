const articleToWord = (item) => {
  if (item.groupType !== 'article') {
    return item;
  }
  if (item.words.length > 1) {
    return item;
  }

  return item.words[0];
};

module.exports = articleToWord;
