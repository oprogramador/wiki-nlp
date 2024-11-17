const _ = require('lodash');

const convertCurrencies = phrase => phrase
  .reduce((accumulator, current) => {
    if (_.get(current, 'item') === 'USDs') {
      return [
        ...accumulator,
        _.omit(
          {
            ...current,
            currency: 'USD',
            groupType: 'currency',
          },
          'item',
        ),
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertCurrencies;
