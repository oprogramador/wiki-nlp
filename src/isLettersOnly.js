// letters or dashes
const isLettersOnly = (item) => {
  if (!item) {
    return false;
  }
  if (!item.charAt) {
    return false;
  }

  return /^[a-zA-Záéíóúâêôãõàèìòäöü-]+$/.test(item);
};

module.exports = isLettersOnly;
