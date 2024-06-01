const groupAnd = require('./groupAnd');

const groupOr = phrase => groupAnd(phrase, 'or');

module.exports = groupOr;
