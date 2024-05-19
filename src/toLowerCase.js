const toLowerCase = (item) => {
  if (!item || !item.toLowerCase) {
    return item;
  }

  return item.toLowerCase();
};

module.exports = toLowerCase;
