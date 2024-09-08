const _ = require('lodash');

const includeLocalities = (phrase) => {
  if (!phrase[0]) {
    return phrase;
  }
  const { object, subject } = phrase[0];
  if (!object) {
    return phrase;
  }
  const match = word => _.get(word, 'groupType') === 'locality';
  const foundInObject = object.find(match);
  const foundInSubject = subject.find(match);
  const where = _.omit(foundInObject || foundInSubject, ['preposition']);

  return [{
    ...phrase[0],
    object: object.filter(word => !_.isEqual(word, foundInObject)),
    subject: subject.filter(word => !_.isEqual(word, foundInSubject)),
    ...(foundInObject || foundInSubject ? { where } : {}),
  }];
};

module.exports = includeLocalities;
