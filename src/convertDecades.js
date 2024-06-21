const _ = require('lodash');

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

    if (JSON.stringify(last.words) === '["the"]') {
      return [
        ...accumulator.slice(0, -1),
        {
          groupType: 'date',
          maxYear: potentialNumber + 9,
          minYear: potentialNumber,
        },
      ];
    }
    if (JSON.stringify(last.words) === '["the","early"]') {
      return [
        ...accumulator.slice(0, -1),
        {
          groupType: 'date',
          maxYear: potentialNumber + 4,
          minYear: potentialNumber,
        },
      ];
    }

    return [...accumulator, current];
  },
  [],
);

module.exports = convertDecades;
