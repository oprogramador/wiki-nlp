const _ = require('lodash');
const { withoutLastOne } = require('../utils/listUtils');

const convertDecades = phrase => phrase.reduce(
  (accumulator, current) => {
    const last = _.last(accumulator);
    if (!current.replace) {
      return [...accumulator, current];
    }
    const potentialNumber = Number(current.replace(/s$/, ''));
    if (potentialNumber % 10 !== 0) {
      return [...accumulator, current];
    }

    if (_.get(last, 'words')) {
      if (JSON.stringify(last.words) === '["the"]') {
        return [
          ...withoutLastOne(accumulator),
          {
            groupType: 'date',
            maxYear: potentialNumber + 9,
            minYear: potentialNumber,
          },
        ];
      }
      if (JSON.stringify(last.words) === '["the","early"]') {
        return [
          ...withoutLastOne(accumulator),
          {
            groupType: 'date',
            maxYear: potentialNumber + 4,
            minYear: potentialNumber,
          },
        ];
      }
      if (JSON.stringify(last.words) === '["the","late"]') {
        return [
          ...withoutLastOne(accumulator),
          {
            groupType: 'date',
            maxYear: potentialNumber + 9,
            minYear: potentialNumber + 5,
          },
        ];
      }
      if (JSON.stringify(last.words) === '["the","early-to-mid"]') {
        return [
          ...withoutLastOne(accumulator),
          {
            groupType: 'date',
            maxYear: potentialNumber + 7,
            minYear: potentialNumber,
          },
        ];
      }
      if (JSON.stringify(last.words) === '["the","mid-to-late"]') {
        return [
          ...withoutLastOne(accumulator),
          {
            groupType: 'date',
            maxYear: potentialNumber + 9,
            minYear: potentialNumber + 3,
          },
        ];
      }
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertDecades;
