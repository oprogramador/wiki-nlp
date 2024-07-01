const _ = require('lodash');

const includeLocalities = (phrase) => {
  const { object, subject } = phrase[0];
  if (!object) {
    return phrase;
  }
  const match = word => word.groupType === 'locality' && word.preposition === 'in';
  const foundInObject = phrase[0].object.find(match);
  const foundInSubject = phrase[0].subject.find(match);
  const where = _.omit(foundInObject || foundInSubject, ['preposition']);

  return [{
    ...phrase[0],
    object: object.filter(word => !_.isEqual(word, foundInObject)),
    subject: subject.filter(word => !_.isEqual(word, foundInSubject)),
    ...(foundInObject || foundInSubject ? { where } : {}),
  }];
};

module.exports = includeLocalities;
