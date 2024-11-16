const groupAnd = require('./groupAnd');

const groupNor = phrase => groupAnd(phrase, 'nor');

module.exports = groupNor;
