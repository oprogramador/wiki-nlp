const _ = require('lodash');
const { withoutFirstOne, withoutLastOne } = require('../utils/listUtils');

const convertBoth = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator) || {};

    if (_.get(current, 'groupType') === 'and') {
      if (last === 'both') {
        return [
          ...withoutLastOne(accumulator),
          current,
        ];
      }
      if (_.last(last.words) === 'both') {
        return [
          ...withoutLastOne(accumulator),
          {
            ...last,
            words: withoutLastOne(last.words),
          },
          current,
        ];
      }
      if (_.get(current, 'members.0.words.0') === 'both') {
        return [
          ...accumulator,
          {
            ...current,
            members: [
              {
                ...current.members[0],
                words: withoutFirstOne(current.members[0].words),
              },
              ...withoutFirstOne(current.members),
            ],
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

module.exports = convertBoth;
