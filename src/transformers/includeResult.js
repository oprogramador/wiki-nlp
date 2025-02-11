const {
  getLast,
  withoutLast,
} = require('../utils/listUtils');

const includeResult = (phrase) => {
  if (!phrase[0]) {
    return phrase;
  }
  if (!phrase[0].object) {
    return phrase;
  }
  const object = phrase[0].object || [];
  const lastItems = getLast(object, 4);
  if (
    lastItems[0] === ','
    && lastItems[1] === 'resulting'
    && lastItems[2] === 'in'
    && lastItems[3]
  ) {
    return [{
      ...phrase[0],
      object: withoutLast(object, 4),
      result: lastItems[3],
    }];
  }

  return phrase;
};

module.exports = includeResult;
