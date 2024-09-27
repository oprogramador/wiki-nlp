const _ = require('lodash');
const { withoutLastOne } = require('../utils/listUtils');
const { ordinalToNumber } = require('../utils/numberResources');

const convertFractions = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator) || {};

    const denominator = ordinalToNumber(current);
    if (denominator && last.value) {
      return [
        ...withoutLastOne(accumulator),
        {
          ...last,
          groupType: 'share',
          value: last.value / denominator,
        },
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertFractions;
