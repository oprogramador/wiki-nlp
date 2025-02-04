const _ = require('lodash');

const includeLocalities = phrase => phrase.map((p) => {
  const { object, subject } = p;
  if (!object) {
    return p;
  }
  const match = word => _.get(word, 'groupType') === 'locality';
  const foundInObject = object.find(match);
  const foundInSubject = subject.find(match);
  const where = _.omit(foundInObject || foundInSubject, ['preposition']);

  return {
    ...p,
    object: object.filter(word => !_.isEqual(word, foundInObject)),
    subject: subject.filter(word => !_.isEqual(word, foundInSubject)),
    ...(foundInObject || foundInSubject ? { where } : {}),
  };
});

module.exports = includeLocalities;
