const _ = require('lodash');
const omitUndefined = require('../utils/omitUndefined');
const toLowerCase = require('../utils/toLowerCase');
const { getLast, withoutFirst, withoutLast } = require('../utils/listUtils');

const directions = {
  earlier: -1,
  later: 1,
};

const findDate = (previousPhrase) => {
  const base = previousPhrase.find(
    (x, i) => _.get(x, 'groupType') === 'quantity'
      && toLowerCase(previousPhrase[i - 1]) === 'in',
  );
  const anotherBase = previousPhrase.find(
    x => _.get(x, 'groupType') === 'date',
  );

  const date = base || anotherBase;

  if (!date) {
    return date;
  }
  const year = date.value || date.year;

  return omitUndefined({
    ...date,
    groupType: 'date',
    year,
  });
};

const createRemainingParts = (current) => {
  if (_.get(current, 'item.words.length', 0) < 3) {
    return [];
  }

  return [
    {
      ...current.item,
      words: withoutFirst(current.item.words, 2),
    },
  ];
};

const includeRelativeDates = (phrase, previousPhrase = []) => phrase.reduce(
  (accumulator, current) => {
    const direction = directions[_.get(current, 'item.words.1')];
    if (
      _.get(current, 'groupType') === 'quantity'
      && _.get(current, 'item.words.0') === 'years'
      && direction
    ) {
      const date = findDate(previousPhrase);
      if (!date) {
        return [...accumulator, current];
      }

      return [
        ...accumulator,
        'in',
        {
          groupType: 'date',
          year: date.year + current.value * direction,
        },
        ...createRemainingParts(current),
      ];
    }

    if (
      _.get(current, 'groupType') === 'locality'
      && toLowerCase(_.get(current, 'precise.words.0')) === 'the'
      && _.get(current, 'precise.words.1') === 'same'
      && _.get(current, 'precise.words.2') === 'time'
    ) {
      const date = findDate(previousPhrase);
      if (!date) {
        return [...accumulator, current];
      }

      return [
        ...accumulator,
        date.day ? 'on' : 'in',
        date,
      ];
    }

    if (
      _.get(current, 'groupType') === 'article'
      && toLowerCase(_.get(current, 'words.0')) === 'that'
      && _.get(current, 'words.1') === 'year'
    ) {
      const date = findDate(previousPhrase);
      if (!date) {
        return [...accumulator, current];
      }

      return [
        ...accumulator,
        'in',
        _.pick(date, 'groupType', 'year'),
        ...createRemainingParts({ item: current }),
      ];
    }

    if (
      _.get(current, 'groupType') === 'article'
      && toLowerCase(_.get(current, 'words.0')) === 'later'
      && _.get(current, 'words.1') === 'that'
      && _.get(current, 'words.2') === 'year'
    ) {
      const date = findDate(previousPhrase);
      if (!date) {
        return [...accumulator, current];
      }

      return [
        ...accumulator,
        'in',
        omitUndefined({
          ..._.pick(date, 'groupType', 'year'),
          minDay: date.day,
          minMonth: date.month,
        }),
      ];
    }

    const lastWords = getLast(_.get(current, 'words', []), 3);

    if (
      _.get(current, 'groupType') === 'article'
      && toLowerCase(lastWords[0]) === 'later'
      && lastWords[1] === 'that'
      && lastWords[2] === 'year'
    ) {
      const date = findDate(previousPhrase);
      if (!date) {
        return [...accumulator, current];
      }

      return [
        ...accumulator,
        'in',
        omitUndefined({
          ..._.pick(date, 'groupType', 'year'),
          minDay: date.day,
          minMonth: date.month,
        }),
        {
          ...current,
          words: withoutLast(current.words, 3),
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = includeRelativeDates;
