const _ = require('lodash');
const { withoutLast } = require('../utils/listUtils');

const convertFrequency = (phrase) => {
  if (!phrase[0]) {
    return phrase;
  }
  const object = _.get(phrase, '0.object', []);

  const frequencyIndex = object.findIndex(x => x === 'every') + 1;

  if (frequencyIndex > 0) {
    const frequency = object[frequencyIndex];

    return [
      {
        ...phrase[0],
        frequency,
        object: withoutLast(object, frequencyIndex),
      },
    ];
  }

  return phrase;
};

module.exports = convertFrequency;
