const _ = require('lodash');
const { getFirst, getLast } = require('../utils/listUtils');
const isUpperCase = require('../utils/isUpperCase');

const epochs = [
  JSON.stringify(['the', 'Holocene']),
  JSON.stringify(['the', 'Pleistocene']),
  JSON.stringify(['the', 'Pliocene']),
  JSON.stringify(['the', 'Miocene']),
  JSON.stringify(['the', 'Oligocene']),
  JSON.stringify(['the', 'Eocene']),
  JSON.stringify(['the', 'Paleocene']),
];

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
        epochs.includes(stringified)
          ? {
            when: {
              epoch: JSON.parse(stringified),
              groupType: 'epoch',
            },
          }
          : { where: object[lastIndex + 1] }
      ),
    }];
  }

  return phrase;
};

module.exports = includeSimpleLocalities;
