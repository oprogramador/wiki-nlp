const _ = require('lodash');
const { withoutFirstOne, withoutLastOne } = require('../utils/listUtils');
const irregularVerbsList = require('../utils/irregularVerbsList');

const irregularVerbsPast = irregularVerbsList.map(item => item.past);

const splitAndWithPast = phrase => phrase
  .reduce((accumulator, current) => {
    const lastPhrase = _.last(accumulator) || [];
    if (
      _.get(current, 'groupType') === 'and'
      && current.members.length === 2
      && irregularVerbsPast.includes(current.members[1])
    ) {
      return [
        ...withoutLastOne(accumulator),
        [
          ...lastPhrase,
          current.members[0],
        ],
        [
          'it',
          current.members[1],
        ],
      ];
    }
    if (
      _.get(current, 'groupType') === 'and'
      && current.members.length === 2
      && _.get(current.members[1], 'groupType') === 'article'
      && irregularVerbsPast.includes(current.members[1].words[0])
    ) {
      return [
        ...withoutLastOne(accumulator),
        [
          ...lastPhrase,
          current.members[0],
        ],
        [
          'it',
          current.members[1].words[0],
          {
            ...current.members[1],
            words: withoutFirstOne(current.members[1].words),
          },
        ],
      ];
    }

    return [
      ...withoutLastOne(accumulator),
      [
        ...lastPhrase,
        current,
      ],
    ];
  },
  []);

module.exports = splitAndWithPast;
