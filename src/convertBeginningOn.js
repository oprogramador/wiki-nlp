const _ = require('lodash');
const toLowerCase = require('./toLowerCase');
const { withoutLastOne } = require('./listUtils');

/* Others to replace:
 * 'at least': 'above'
 * 'more than': 'above'
 */

const convertBeginningOn = phrase => phrase
  .reduce((accumulator, current) => {
    const last = _.last(accumulator);

    if (toLowerCase(last) === 'beginning' && current === 'on') {
      return [
        ...withoutLastOne(accumulator),
        'since',
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertBeginningOn;
