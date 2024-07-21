const toLowerCase = require('./toLowerCase');
const { withoutRange } = require('./listUtils');
const createDate = require('./createDate');

const match = list => (word, index) => ['quantity', 'date'].includes(word.groupType)
  && Object.keys(createDate).includes(toLowerCase(list[index - 1]));

const convertSubject = ({ foundInSubject, foundInSubjectIndex, subject }) => {
  const isCommaInSubject = subject[foundInSubjectIndex + 1] === ',';
  if (!foundInSubject) {
    return subject;
  }
  if (foundInSubject.item) {
    return [foundInSubject.item];
  }

  return withoutRange(subject, foundInSubjectIndex - 1, foundInSubjectIndex + (isCommaInSubject ? 1 : 0));
};

const includeDates = ({ now } = {}) => (phrase) => {
  if (!phrase[0]) {
    return phrase;
  }
  if (!phrase[0].object && !phrase[0].subject) {
    return phrase;
  }
  const object = phrase[0].object || [];
  const subject = phrase[0].subject || [];
  const foundInObjectIndex = object.findIndex(match(object));
  const foundInSubjectIndex = subject.findIndex(match(subject));
  const foundInObject = object[foundInObjectIndex];
  const foundInSubject = subject[foundInSubjectIndex];
  if (!foundInObject && !foundInSubject) {
    return phrase;
  }
  const preposition = toLowerCase(foundInObject ? object[foundInObjectIndex - 1] : subject[foundInSubjectIndex - 1]);
  const when = createDate[preposition](foundInObject || foundInSubject, now);

  return [{
    ...phrase[0],
    object: foundInObject ? withoutRange(object, foundInObjectIndex - 1, foundInObjectIndex + 1) : object,
    subject: convertSubject({ foundInSubject, foundInSubjectIndex, subject }),
    when,
  }];
};

module.exports = includeDates;
