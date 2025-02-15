const isUpperCase = (item) => {
  if (!item) {
    return false;
  }
  if (item.words) {
    return item
      .words
      .filter(word => word !== 'the')
      .every(isUpperCase);
  }
  if (!item.charAt) {
    return false;
  }
  const first = item.charAt(0);
  if (!first) {
    return false;
  }

  return first !== first.toLowerCase();
};

module.exports = isUpperCase;
