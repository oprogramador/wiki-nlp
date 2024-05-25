const _ = require('lodash');
const fs = require('fs');

const auxiliary = fs
  .readFileSync(`${__dirname}/resources/auxiliary.txt`)
  .toString()
  .split('\n')
  .filter(x => x);

const negations = [
  'no',
  'not',
];

const groupVerbs = (phrase, { list = auxiliary, groupType = 'verb' } = {}) => phrase.reduce(
  (accumulator, current) => {
    const last = _.last(accumulator) || {};
    if (list.includes(current)) {
      return [
        ...accumulator.slice(0, -1),
        {
          groupType,
          subject: last,
          verb: current,
        },
      ];
    }
    if (last.groupType === groupType) {
      if (negations.includes(current)) {
        return [
          ...accumulator.slice(0, -1),
          {
            ...last,
            isNegated: true,
          },
        ];
      }
      if (!last.object) {
        return [
          ...accumulator.slice(0, -1),
          {
            ...last,
            object: current,
          },
        ];
      }
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = groupVerbs;
