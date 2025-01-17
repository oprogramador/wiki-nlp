const _ = require('lodash');
const {
  getBeforeLast,
  withoutFirstOne,
  withoutLast,
} = require('../utils/listUtils');
const irregularVerbsList = require('../utils/irregularVerbsList');

const toPast = (word) => {
  const irregular = irregularVerbsList.find(x => x.present === word);
  if (irregular) {
    return irregular.past;
  }
  if (word.endsWith('e')) {
    return `${word}d`;
  }

  return `${word}ed`;
};

const convertAuxiliaryNegation = phrase => phrase.reduce(
  (accumulator, current) => {
    const beforeLast = getBeforeLast(accumulator);
    const last = _.last(accumulator);

    if (
      beforeLast === 'did'
      && last === 'not'
      && _.get(current, 'groupType') === 'article'
    ) {
      return [
        ...withoutLast(accumulator, 2),
        toPast(current.words[0]),
        'not',
        {
          ...current,
          words: withoutFirstOne(current.words),
        },
      ];
    }

    if (
      ['does', 'do'].includes(beforeLast)
      && last === 'not'
      && _.get(current, 'groupType') === 'article'
    ) {
      return [
        ...withoutLast(accumulator, 2),
        current.words[0],
        'not',
        {
          ...current,
          words: withoutFirstOne(current.words),
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertAuxiliaryNegation;
