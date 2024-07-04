const _ = require('lodash');
const toLowerCase = require('./toLowerCase');
const { withoutRange } = require('./listUtils');

const createDate = {
  in: object => ({
    groupType: 'date',
    ...(object.value ? { year: object.value } : {}),
    ..._.pick(object, 'maxYear', 'minYear'),
  }),
  since: (object) => {
    const now = new Date();

    return {
      groupType: 'date',
      maxYear: now.getFullYear(),
      minYear: object.value || object.year,
      ...(object.month ? { maxMonth: now.getMonth() + 1, minMonth: object.month } : { }),
      ...(object.day ? { maxDay: now.getDate(), minDay: object.day } : { }),
    };
  },
};

const match = list => (word, index) => ['quantity', 'date'].includes(word.groupType)
  && Object.keys(createDate).includes(toLowerCase(list[index - 1]));

const includeDates = (phrase) => {
  const { object, subject } = phrase[0];
  if (!object) {
    return phrase;
  }
  const foundInObjectIndex = object.findIndex(match(object));
  const foundInSubjectIndex = subject.findIndex(match(subject));
  const foundInObject = object[foundInObjectIndex];
  const foundInSubject = subject[foundInSubjectIndex];
  if (!foundInObject && !foundInSubject) {
    return phrase;
  }
  const preposition = toLowerCase(foundInObject ? object[foundInObjectIndex - 1] : subject[foundInSubjectIndex - 1]);
  const when = createDate[preposition](foundInObject || foundInSubject);

  return [{
    ...phrase[0],
    object: foundInObject ? withoutRange(object, foundInObjectIndex - 1, foundInObjectIndex + 1) : object,
    subject: foundInSubject ? withoutRange(subject, foundInSubjectIndex - 1, foundInSubjectIndex + 1) : subject,
    when,
  }];
};

module.exports = includeDates;
