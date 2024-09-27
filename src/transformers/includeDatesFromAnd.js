const _ = require('lodash');
const toLowerCase = require('../utils/toLowerCase');
const { withoutFirst, withoutFirstOne } = require('../utils/listUtils');
const createDate = require('../utils/createDate');

const convertSubject = ({ foundInSubject, subject }) => {
  if (!foundInSubject) {
    return subject;
  }

  return [
    {
      ...subject[1],
      members: withoutFirstOne(subject[1].members),
    },
    ...withoutFirst(subject, 2),
  ];
};

const includeDatesFromAnd = ({ now } = {}) => (phrase) => {
  if (!phrase[0]) {
    return phrase;
  }
  const { object, subject } = phrase[0];
  if (!_.get(subject, '1.members')) {
    return phrase;
  }
  const preposition = toLowerCase(subject[0]);
  if (!createDate[preposition]) {
    return phrase;
  }
  const foundInSubject = subject[1].members[0];
  const when = createDate[preposition](foundInSubject, now);

  return [{
    ...phrase[0],
    object,
    subject: convertSubject({ foundInSubject, subject }),
    when,
  }];
};

module.exports = includeDatesFromAnd;
