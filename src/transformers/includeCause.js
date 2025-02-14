const {
  getLast,
  withoutLast,
} = require('../utils/listUtils');

const includeCause = (phrase) => {
  if (!phrase[0]) {
    return phrase;
  }
  if (!phrase[0].object) {
    return phrase;
  }
  const { object } = phrase[0];
  const lastItems = getLast(object, 4);
  if (
    lastItems[0] === ','
    && lastItems[1] === 'due'
    && lastItems[2] === 'to'
    && lastItems[3]
  ) {
    return [{
      ...phrase[0],
      cause: lastItems[3],
      object: withoutLast(object, 4),
    }];
  }

  return phrase;
};

module.exports = includeCause;
