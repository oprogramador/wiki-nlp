const { numbersToWords } = require('../utils/numberResources');

const convertMixedOrdinals = phrase => phrase
  .reduce((accumulator, current) => {
    if (/-/.test(current)) {
      const [first, second] = current.split('-');
      const matched = first.match(/[0-9]+/);
      if (matched) {
        const number = matched[0];
        const numberWord = numbersToWords[number];
        const postfix = first.replace(/[0-9]/g, '');
        const replacedNumber = `${numberWord}${postfix}`;

        return [
          ...accumulator,
          `${replacedNumber}-${second}`,
        ];
      }
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertMixedOrdinals;
