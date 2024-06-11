const convertBn = phrase => phrase
  .reduce((accumulator, current) => {
    if (!current.replace) {
      return [
        ...accumulator,
        current,
      ];
    }
    const value = current.replace(/bn$/, '');
    if (!Number.isNaN(Number(value)) && value !== current) {
      return [
        ...accumulator,
        value,
        'billion',
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertBn;
