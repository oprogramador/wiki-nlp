const _ = require('lodash');

const includeLocalities = (phrase) => {
  const { object, subject } = phrase[0];
  if (!object) {
    return phrase;
  }
  const foundInObject = phrase[0].object.find(word => word.groupType === 'locality' && word.preposition === 'in');
  const foundInSubject = phrase[0].subject.find(word => word.groupType === 'locality' && word.preposition === 'in');
  const where = _.omit(foundInObject || foundInSubject, ['preposition']);

  return [{
    ...phrase[0],
    object: object.filter(word => JSON.stringify(word) !== JSON.stringify(foundInObject)),
    subject: subject.filter(word => JSON.stringify(word) !== JSON.stringify(foundInSubject)),
    ...(foundInObject || foundInSubject ? { where } : {}),
  }];
};

module.exports = includeLocalities;
