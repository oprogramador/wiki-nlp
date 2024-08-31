const _ = require('lodash');
const { getBeforeLast, withoutLast } = require('./listUtils');
const { ordinalToNumber } = require('./numberResources');

const convertCenturies = phrase => phrase.reduce(
  (accumulator, current) => {
    const beforeLast = getBeforeLast(accumulator);
    const last = _.last(accumulator);

    if (!_.get(last, 'replace')) {
      return [...accumulator, current];
    }
    const potentialNumber = ordinalToNumber(last) - 1;

    if (!Number.isNaN(potentialNumber)
      && current === 'century'
    ) {
      if (JSON.stringify(_.get(beforeLast, 'words')) === '["the"]') {
        return [
          ...withoutLast(accumulator, 2),
          {
            groupType: 'date',
            maxYear: potentialNumber * 100 + 100,
            minYear: potentialNumber * 100 + 1,
          },
        ];
      }
      if (JSON.stringify(_.get(beforeLast, 'words')) === '["the","early"]') {
        return [
          ...withoutLast(accumulator, 2),
          {
            groupType: 'date',
            maxYear: potentialNumber * 100 + 50,
            minYear: potentialNumber * 100 + 1,
          },
        ];
      }
      if (JSON.stringify(_.get(beforeLast, 'words')) === '["the","late"]') {
        return [
          ...withoutLast(accumulator, 2),
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
