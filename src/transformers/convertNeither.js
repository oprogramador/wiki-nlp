const _ = require('lodash');
const toLowerCase = require('../utils/toLowerCase');
const { withoutFirstOne, withoutLastOne } = require('../utils/listUtils');

const convertNeither = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator) || {};

    if (_.get(current, 'groupType') === 'nor') {
      if (toLowerCase(_.last(last.words)) === 'neither') {
        return [
          ...withoutLastOne(accumulator),
          {
            ...last,
            words: withoutLastOne(last.words),
          },
          current,
        ];
      }
      if (toLowerCase(_.get(current, 'members.0.words.0')) === 'neither') {
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

module.exports = convertNeither;
