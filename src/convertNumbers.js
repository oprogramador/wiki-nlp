const _ = require('lodash');
const auxiliary = require('./auxiliaryList');
const prepositions = require('./prepositionList');
const isLettersOnly = require('./isLettersOnly');
const {
  wordsToNumbers,
  largeNumbers,
  aroundWords,
  aboveWords,
  currencies,
} = require('./numberResources');

const convertWithDigits = (word) => {
  if (!word.replace) {
    return word;
  }
  const replaced = word.replace(/,/g, '');
  const number = Number(replaced);
  if (Number.isNaN(number)) {
    return word;
  }

  return number;
};

const handleCurrency = (accumulator) => {
  const currency = currencies[accumulator.slice(-2, -1)];
  if (currency) {
    return [
      ...accumulator.slice(0, -2),
      {
        currency,
        groupType: 'currency',
        value: _.last(accumulator).value,
      },
    ];
  }

  return accumulator;
};

const multiply = (base, multiplier) => {
  const value = base.value || Number(base === 'a' ? 1 : base);
  const result = value * multiplier;

  return base.groupType
    ? { ...base, value: result }
    : { groupType: 'quantity', value: result };
};

const convertNumbers = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator);
    if (largeNumbers[current]) {
      return handleCurrency([
        ...accumulator.slice(0, -1),
        multiply(last, largeNumbers[current]),
      ]);
    }
    if (current === '%') {
      return [
        ...accumulator.slice(0, -1),
        {
          groupType: 'share',
          value: last.value / 100,
        },
      ];
    }
    if (
      last
        && last.groupType === 'quantity'
        && current !== 'per'
        && ![...auxiliary, ...prepositions].includes(current)
          && (isLettersOnly(current) || current.groupType)
    ) {
      if (!last.item) {
        return [
          ...accumulator.slice(0, -1),
          {
            ...last,
            item: current,
          },
        ];
      }

      return [
        ...accumulator.slice(0, -1),
        {
          ...last,
          item: last.item.groupType === 'article'
            ? {
              ...last.item,
              words: [
                ...last.item.words,
                current,
              ],
            }
            : {
              groupType: 'article',
              words: [last.item, current],
            },
        },
      ];
    }

    const value = wordsToNumbers[current] || convertWithDigits(current) || current;

    if (typeof value === 'number') {
      return handleCurrency([
        ...(
          [...aroundWords, ...aboveWords].includes(last)
            ? accumulator.slice(0, -1)
            : accumulator
        ),
        {
          groupType: 'quantity',
          ...(aboveWords.includes(last) ? { min: value } : { value }),
          ...(aroundWords.includes(last) ? { isExact: false } : {}),
        },
      ]);
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertNumbers;
