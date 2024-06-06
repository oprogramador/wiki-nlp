const isLettersOnly = (item) => {
  if (!item) {
    return false;
  }
  if (!item.charAt) {
    return false;
  }

  return /^[a-z]+$/.test(item);
};

module.exports = isLettersOnly;
