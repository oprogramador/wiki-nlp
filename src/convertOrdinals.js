const _ = require('lodash');
const { withoutFirst } = require('./listUtils');

const map = {
  second: 2,
  third: 3,
};

const convertOrdinals = phrase => phrase
  .reduce((accumulator, current) => {
    if (_.get(current, 'groupType') === 'article' && _.get(current, 'words.0') === 'the') {
      const found = Object.keys(map).find(key => _.get(current, 'words.1', '').startsWith(`${key}-`));
      if (found) {
        return [
          ...accumulator,
          {
            adjective: current.words[1].replace(`${found}-`, ''),
            groupType: 'ordinal',
            item: withoutFirst(current.words, 2),
            ordinal: map[found],
          },
        ];
      }
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []);

module.exports = convertOrdinals;
