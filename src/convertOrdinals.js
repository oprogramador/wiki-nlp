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

const postfix = '\'s';

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
      const position = _.get(current, 'words.1', '').endsWith(postfix) ? 2 : 1;
      const found = Object.keys(map).find(key => _.get(current, `words.${position}`, '').startsWith(`${key}-`));
      if (found) {
        return [
          ...accumulator,
          {
            adjective: current.words[position].replace(`${found}-`, ''),
            groupType: 'ordinal',
            item: withoutFirst(current.words, position + 1),
            ordinal: map[found],
            ...(position > 1 ? { scope: current.words[1].replace(postfix, '') } : {}),
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
