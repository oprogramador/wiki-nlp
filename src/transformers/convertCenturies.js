const _ = require('lodash');
const { getBeforeLast, withoutLast } = require('../utils/listUtils');
const { ordinalToNumber } = require('../utils/numberResources');

const map = {
  century: 100,
  millennium: 1000,
};

const convertCenturies = phrase => phrase.reduce(
  (accumulator, current) => {
    const beforeLast = getBeforeLast(accumulator);
    const last = _.last(accumulator);

    let toSkip = 2;
    let begin = beforeLast.words;
    let middle = last;
    let end = current;

    if (current.groupType === 'article'
      && map[_.last(current.words)]
    ) {
      toSkip = 0;
      begin = withoutLast(current.words, 2);
      middle = getBeforeLast(current.words);
      end = _.last(current.words);
    }

    if (!_.get(middle, 'replace')) {
      return [...accumulator, current];
    }
    const potentialNumber = ordinalToNumber(middle) - 1;

    if (!Number.isNaN(potentialNumber)
      && map[end]
    ) {
      const period = map[end];
      if (JSON.stringify(begin) === '["the"]') {
        return [
          ...withoutLast(accumulator, toSkip),
          {
            groupType: 'date',
            maxYear: (potentialNumber + 1) * period,
            minYear: potentialNumber * period + 1,
          },
        ];
      }
      if (JSON.stringify(begin) === '["the","early"]') {
        return [
          ...withoutLast(accumulator, toSkip),
          {
            groupType: 'date',
            maxYear: (potentialNumber + 0.5) * period,
            minYear: potentialNumber * period + 1,
          },
        ];
      }
      if (JSON.stringify(begin) === '["the","mid"]') {
        return [
          ...withoutLast(accumulator, toSkip),
          {
            groupType: 'date',
            maxYear: (potentialNumber + 0.75) * period,
            minYear: (potentialNumber + 0.25) * period + 1,
          },
        ];
      }
      if (JSON.stringify(begin) === '["the","mid-to-late"]') {
        return [
          ...withoutLast(accumulator, toSkip),
          {
            groupType: 'date',
            maxYear: (potentialNumber + 1) * period,
            minYear: (potentialNumber + 0.25) * period + 1,
          },
        ];
      }
      if (JSON.stringify(begin) === '["the","late"]') {
        return [
          ...withoutLast(accumulator, toSkip),
          {
            groupType: 'date',
            maxYear: (potentialNumber + 1) * period,
            minYear: (potentialNumber + 0.5) * period + 1,
          },
        ];
      }
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertCenturies;
