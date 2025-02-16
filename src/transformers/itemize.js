const _ = require('lodash');
const auxiliary = require('../utils/auxiliaryList');
const prepositions = require('../utils/prepositionList');
const { withoutLastOne, withoutLast, getBeforeLast } = require('../utils/listUtils');

const pluralIrregularWords = [
  'children',
  'people',
];

const isPluralWord = word => (/s$/.test(word) && ![...auxiliary, prepositions].includes(word))
  || pluralIrregularWords.includes(word);

const isPlural = (word) => {
  if (_.get(word, 'words.0') === 'these') {
    return true;
  }
  if (_.get(word, 'groupType') === 'example') {
    return isPlural(word.general);
  }
  const result = isPluralWord(_.last(_.get(word, 'words')))
    || isPluralWord(_.get(word, 'words.0'))
    || isPluralWord(word.general)
    || (['and', 'or'].includes(_.get(word, 'groupType')) && word.members.some(isPlural))
    || (/s$/.test(word) && ![...auxiliary, prepositions].includes(word))
    || pluralIrregularWords.includes(word);

  return result;
};

const itemize = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator) || {};
    const beforeLast = getBeforeLast(accumulator);
    if (['share', 'unit'].includes(beforeLast.groupType) && last === 'of') {
      return [
        ...withoutLast(accumulator, 2),
        {
          ...beforeLast,
          item: current,
        },
      ];
    }
    if (last.groupType !== 'quantity' || last.item || !isPlural(current)) {
      return [
        ...accumulator,
        current,
      ];
    }

    return [
      ...withoutLastOne(accumulator),
      {
        ...last,
        item: current,
      },
    ];
  },
  []);

module.exports = itemize;
