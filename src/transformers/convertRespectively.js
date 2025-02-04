const _ = require('lodash');

const convertRespectively = (phrase) => {
  const { object, subject, verb } = phrase[0];

  if (!(subject || []).includes('respectively')) {
    return [phrase];
  }
  if (!_.get(object, '0.members')) {
    return [phrase];
  }

  return object.map(o => o.members.map((objectItem, i) => ({
    object: [objectItem],
    subject: [_.get(subject, `0.members.${i}`) || _.get(subject, 2)],
    verb,
  })));
};

module.exports = convertRespectively;
