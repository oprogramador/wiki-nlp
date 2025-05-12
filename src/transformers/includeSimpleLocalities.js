const _ = require('lodash');
const { getFirst, getLast } = require('../utils/listUtils');
const isUpperCase = require('../utils/isUpperCase');

const epochs = {
  [JSON.stringify(['the', 'Holocene'])]: { minYear: -12e3 },
  [JSON.stringify(['the', 'Pleistocene'])]: { maxYear: -12e3, minYear: -2.58e6 },
  [JSON.stringify(['the', 'Pliocene'])]: { maxYear: -2.58e6, minYear: -5.333e6 },
  [JSON.stringify(['the', 'Miocene'])]: { maxYear: -5.333e6, minYear: -23e6 },
  [JSON.stringify(['the', 'Oligocene'])]: { maxYear: -23e6, minYear: -34e6 },
  [JSON.stringify(['the', 'Eocene'])]: { maxYear: -34e6, minYear: -56e6 },
  [JSON.stringify(['the', 'Paleocene'])]: { maxYear: -56e6, minYear: -66e6 },
};

const includeSimpleLocalities = (phrase) => {
  if (!phrase[0]) {
    return phrase;
  }
  const { object } = phrase[0];
  if (!object) {
    return phrase;
  }
  const lastIndex = _.findLastIndex(object, (item, i) => item === 'in' && isUpperCase(object[i + 1]));
  const stringified = JSON.stringify(_.get(object, `${lastIndex + 1}.words`));
  if (lastIndex >= 0) {
    return [{
      ...phrase[0],
      object: [
        ...getFirst(object, lastIndex),
        ...getLast(object, object.length - lastIndex - 2),
      ],
      ...(
        epochs[stringified]
          ? {
            when: {
              groupType: 'date',
              ...epochs[stringified],
            },
          }
          : { where: object[lastIndex + 1] }
      ),
    }];
  }

  return phrase;
};

module.exports = includeSimpleLocalities;
