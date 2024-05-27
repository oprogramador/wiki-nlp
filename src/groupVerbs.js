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
  (accumulator, current, index) => {
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
    if (groupType === 'verb' && index === phrase.length - 1 && current.charAt && /[a-z]/.test(current.charAt(0))) {
      return [
        ...accumulator.slice(0, -1),
        {
          groupType,
          subject: last,
          verb: current,
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = groupVerbs;
