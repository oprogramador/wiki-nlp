const _ = require('lodash');
const { withoutLastOne } = require('../utils/listUtils');
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
