const groupVerbs = require('./groupVerbs');
const prepositions = require('./prepositionList');

const groupPrepositions = phrase => groupVerbs(
  phrase,
  {
    groupType: 'preposition',
    list: prepositions,
  },
);

module.exports = groupPrepositions;
