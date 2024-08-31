const _ = require('lodash');
const { getBeforeLast, withoutLast } = require('./listUtils');
const { ordinalToNumber } = require('./numberResources');

const convertCenturies = phrase => phrase.reduce(
  (accumulator, current) => {
    const beforeLast = getBeforeLast(accumulator);
    const last = _.last(accumulator);

    let toSkip = 2;
    let begin = beforeLast.words;
    let middle = last;
    let end = current;

    if (current.groupType === 'article'
      && _.last(current.words) === 'century'
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
      && end === 'century'
    ) {
      if (JSON.stringify(begin) === '["the"]') {
        return [
          ...withoutLast(accumulator, toSkip),
          {
            groupType: 'date',
            maxYear: potentialNumber * 100 + 100,
            minYear: potentialNumber * 100 + 1,
          },
        ];
      }
      if (JSON.stringify(begin) === '["the","early"]') {
        return [
          ...withoutLast(accumulator, toSkip),
          {
            groupType: 'date',
            maxYear: potentialNumber * 100 + 50,
            minYear: potentialNumber * 100 + 1,
          },
        ];
      }
      if (JSON.stringify(begin) === '["the","late"]') {
        return [
          ...withoutLast(accumulator, toSkip),
          {
            groupType: 'date',
            maxYear: potentialNumber * 100 + 100,
            minYear: potentialNumber * 100 + 51,
          },
        ];
      }
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertCenturies;
