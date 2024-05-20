const isUpperCase = (item) => {
  if (!item) {
    return false;
  }
  const first = item.charAt(0);
  if (!first) {
    return false;
  }

  return first !== first.toLowerCase();
};

module.exports = isUpperCase;
