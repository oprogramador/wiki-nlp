const _ = require('lodash');
const { withoutFirst, withoutFirstOne } = require('../utils/listUtils');
const irregularVerbsList = require('../utils/irregularVerbsList');

const irregularVerbsPast = irregularVerbsList.map(item => item.past);

const findPastVerb = (phrase) => {
  if (!phrase[0]) {
    return phrase;
  }

  if (irregularVerbsPast.includes(_.get(phrase, '1.words.0'))) {
    return [
      {
        object: [
          ...withoutFirstOne(phrase[1].words),
          ...withoutFirst(phrase, 2),
        ],
        subject: [phrase[0]],
        verb: phrase[1].words[0],
      },
    ];
  }

  return phrase;
};

module.exports = findPastVerb;
