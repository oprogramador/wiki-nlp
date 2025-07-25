const _ = require('lodash');
const omitUndefined = require('../utils/omitUndefined');

const epochs = {
  [JSON.stringify(['the', 'World', 'War', 'II'])]: { maxYear: 1945, minYear: 1939 },
  [JSON.stringify(['the', 'World', 'War', 'I'])]: { maxYear: 1918, minYear: 1914 },
  [JSON.stringify(['the', 'French', 'Revolutionary', 'Wars'])]: { maxYear: 1802, minYear: 1792 },
  [JSON.stringify(['the', 'Dutch', 'Golden', 'Age'])]: { maxYear: 1672, minYear: 1588 },
  [JSON.stringify(['the', 'Spanish', 'Golden', 'Age'])]: { maxYear: 1681, minYear: 1492 },
  [JSON.stringify(['the', 'Islamic', 'Golden', 'Age'])]: { maxYear: 1300, minYear: 701 },
  [JSON.stringify(['the', 'Middle', 'Ages'])]: { maxYear: 1492, minYear: 476 },
  [JSON.stringify(['the', 'Holocene'])]: { minYear: -12e3 },
  [JSON.stringify(['the', 'Pleistocene'])]: { maxYear: -12e3, minYear: -2.58e6 },
  [JSON.stringify(['the', 'Pliocene'])]: { maxYear: -2.58e6, minYear: -5.333e6 },
  [JSON.stringify(['the', 'Miocene'])]: { maxYear: -5.333e6, minYear: -23e6 },
  [JSON.stringify(['the', 'Oligocene'])]: { maxYear: -23e6, minYear: -34e6 },
  [JSON.stringify(['the', 'Eocene'])]: { maxYear: -34e6, minYear: -56e6 },
  [JSON.stringify(['the', 'Paleocene'])]: { maxYear: -56e6, minYear: -66e6 },
};

const includeEpochs = (phrase) => {
  if (!phrase[0]) {
    return phrase;
  }
  const { where } = phrase[0];
  if (!where) {
    return phrase;
  }
  const stringified = JSON.stringify(_.get(where, 'words'));
  if (stringified) {
    return [omitUndefined({
      ...phrase[0],
      ...(
        epochs[stringified]
          ? {
            when: {
              groupType: 'date',
              ...epochs[stringified],
            },
            where: undefined,
          }
          : {}
      ),
    })];
  }

  return phrase;
};

module.exports = includeEpochs;
