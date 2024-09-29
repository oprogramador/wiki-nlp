const { numbersToWords, ordinalToNumber } = require('../utils/numberResources');

const convertMixedOrdinalsSimple = phrase => phrase
  .reduce((accumulator, current) => {
    if (/[0-9]th/.test(current)) {
      const number = ordinalToNumber(current);
      const postfix = current.replace(/[0-9]/g, '');

      if (number) {
        return [
          ...accumulator,
          `${numbersToWords[number]}${postfix}`,
        ];
      }
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertMixedOrdinalsSimple;
