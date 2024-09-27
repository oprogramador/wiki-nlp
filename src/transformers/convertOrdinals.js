const _ = require('lodash');
const { getBeforeLast, withoutFirst, withoutLast } = require('../utils/listUtils');
const { ordinalToNumber } = require('../utils/numberResources');
const isLettersOnly = require('../utils/isLettersOnly');
const isUpperCase = require('../utils/isUpperCase');

const postfix = '\'s';

const convertOrdinals = phrase => phrase
  .reduce((accumulator, current) => {
    const beforeLast = getBeforeLast(accumulator);
    const last = _.last(accumulator);

    if (last === 'in' && _.get(beforeLast, 'groupType') === 'ordinal' && !beforeLast.scope && isUpperCase(current)) {
      return [
        ...withoutLast(accumulator, 2),
        {
          ...beforeLast,
          scope: current,
        },
      ];
    }

    if (beforeLast.groupType === 'ordinal' && last === 'after') {
      return [
        ...withoutLast(accumulator, 2),
        {
          ...beforeLast,
          higher: current,
        },
      ];
    }

    if (beforeLast.groupType === 'ordinal' && last === 'by') {
      return [
        ...withoutLast(accumulator, 2),
        {
          ...beforeLast,
          by: current,
        },
      ];
    }

    if (_.get(current, 'groupType') === 'article' && _.get(current, 'words.0') === 'the') {
      const position = _.get(current, 'words.1', '').endsWith(postfix) ? 2 : 1;
      const multiWord = _.get(current, `words.${position}`, '');
      const split = multiWord.split('-');
      if (split.length === 2 && isLettersOnly(split[0]) && isLettersOnly(split[1])) {
        const numberWord = multiWord.split('-')[0];
        const found = ordinalToNumber(numberWord);
        if (found) {
          return [
            ...accumulator,
            {
              adjective: current.words[position].replace(`${numberWord}-`, ''),
              groupType: 'ordinal',
              item: withoutFirst(current.words, position + 1),
              ordinal: found,
              ...(position > 1 ? { scope: current.words[1].replace(postfix, '') } : {}),
            },
          ];
        }
      }
    }
    if (_.get(current, 'groupType') === 'and') {
      return [
        ...accumulator,
        {
          ...current,
          members: current.members.map(item => convertOrdinals([item])[0]),
        },
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertOrdinals;
