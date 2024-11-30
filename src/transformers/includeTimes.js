const _ = require('lodash');

const includeTimes = (phrase) => {
  if (!phrase[0]) {
    return phrase;
  }
  const { object } = phrase[0];
  if (!object) {
    return phrase;
  }
  const times = object.find(word => _.get(word, 'item') === 'times');

  if (times) {
    return [{
      ...phrase[0],
      object: object.filter(word => _.get(word, 'item') !== 'times'),
      times: _.omit(times, 'item'),
    }];
  }

  return phrase;
};

module.exports = includeTimes;
