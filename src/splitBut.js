const _ = require('lodash');
const { withoutLastOne } = require('./listUtils');
const auxiliary = require('./auxiliaryList');
const irregularVerbsList = require('./irregularVerbsList');

const irregularVerbsPast = irregularVerbsList.map(item => item.past);

const looksLikeVerb = word => auxiliary.includes(word)
  || /ed$/.test(word)
  || irregularVerbsPast.includes(word)
  || /[a-z]+s$/.test(word);

const splitBut = phrase => phrase
  .reduce((accumulator, current) => {
    const lastPhrase = _.last(accumulator) || [];
    const last = _.last(lastPhrase) || {};
    if (looksLikeVerb(current) && lastPhrase.length === 0) {
      return [
        ...withoutLastOne(accumulator),
        [
          'it',
          current,
        ],
      ];
    }
    if (last === ',' && current === 'but') {
      return [
        ...withoutLastOne(accumulator),
        withoutLastOne(lastPhrase),
        [],
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

module.exports = splitBut;
