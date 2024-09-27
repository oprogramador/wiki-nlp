const _ = require('lodash');

const convertFromToInPhrase = (phrase) => {
  if (!_.get(phrase, '0.object')) {
    return phrase;
  }
  const { object } = phrase[0];

  if (
    _.get(object, '0.groupType') === 'article'
    && !_.get(object, '0.words')
    && _.get(object, '1.groupType') === 'change'
  ) {
    return [{
      ..._.omit(phrase[0], 'object'),
      endValue: object[1].to,
      initialValue: object[1].from,
      ...(object[1]['from-in'] ? { whenInitialValue: object[1]['from-in'] } : {}),
      ...(object[1]['to-in'] ? { whenEndValue: object[1]['to-in'] } : {}),
    }];
  }

  return phrase;
};

module.exports = convertFromToInPhrase;
