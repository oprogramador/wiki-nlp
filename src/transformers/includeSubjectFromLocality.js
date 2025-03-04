const _ = require('lodash');

const includeSubjectFromLocality = phrase => phrase.map((p) => {
  const { subject } = p;
  if (_.get(subject, '0') || !_.get(p, 'where.general')) {
    return p;
  }

  return {
    ...p,
    subject: [p.where.general],
    where: p.where.precise,
  };
});

module.exports = includeSubjectFromLocality;
