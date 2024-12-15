const _ = require('lodash');
const { withoutLastOne } = require('../utils/listUtils');

const splitBySemicolon = phrase => phrase
  .reduce((accumulator, current) => {
    const lastPhrase = _.last(accumulator) || [];
    const last = _.last(lastPhrase) || '';

    if (last.endsWith(';')) {
      return [
        ...withoutLastOne(accumulator),
        [
          ...withoutLastOne(lastPhrase),
          last.replace(/;$/, ''),
        ],
        [_.startCase(current)],
      ];
    }

    return [
      ...withoutLastOne(accumulator),
      [
        ...lastPhrase,
        current,
      ],
    ];
  },
  []);

module.exports = splitBySemicolon;
