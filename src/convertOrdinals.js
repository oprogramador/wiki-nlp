const _ = require('lodash');
const { getBeforeLast, withoutFirst, withoutLast } = require('./listUtils');

/* eslint-disable sort-keys */
const map = {
  second: 2,
  third: 3,
  fourth: 4,
  fifth: 5,
  sixth: 6,
};

const convertOrdinals = phrase => phrase
  .reduce((accumulator, current) => {
    const beforeLast = getBeforeLast(accumulator);
    const last = _.last(accumulator);

    if (beforeLast.groupType === 'ordinal' && last === 'after') {
      return [
        ...withoutLast(accumulator, 2),
        {
          ...beforeLast,
          higher: current,
        },
      ];
    }

    if (_.get(current, 'groupType') === 'article' && _.get(current, 'words.0') === 'the') {
      const found = Object.keys(map).find(key => _.get(current, 'words.1', '').startsWith(`${key}-`));
      if (found) {
        return [
          ...accumulator,
          {
            adjective: current.words[1].replace(`${found}-`, ''),
            groupType: 'ordinal',
            item: withoutFirst(current.words, 2),
            ordinal: map[found],
          },
        ];
      }
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertOrdinals;
