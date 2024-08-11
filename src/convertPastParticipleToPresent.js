const _ = require('lodash');
const isVowel = require('./isVowel');
const irregularVerbsList = require('./irregularVerbsList');

const convertPastParticipleToPresent = (word) => {
  const found = _.get(
    irregularVerbsList.find(item => item.pastParticiple === word),
    'present',
  );
  if (found) {
    return found;
  }

  const base = word.replace(/ed$/, '');
  const withE = `${base}e`;
  const withoutDuplicatedLast = base.replace(/.$/, '');
  const last = base[base.length - 1];
  const beforeLast = base[base.length - 2];
  const beforeBeforeLast = base[base.length - 3];

  if (last === 'i') {
    return base.replace(/i$/, 'y');
  }
  if (last === 'x') {
    return base;
  }
  if (beforeLast === last && ['p', 'n', 'r'].includes(last)) {
    return withoutDuplicatedLast;
  }
  if (beforeBeforeLast === 'e' && ['a', 'e'].includes(beforeLast)) {
    return base;
  }
  if (beforeBeforeLast === 'e' && beforeLast === last && last === 'l') {
    return withoutDuplicatedLast;
  }
  if (['a', 'o'].includes(beforeBeforeLast) && beforeLast === 'i') {
    return base;
  }
  if (beforeLast === 'e' && ['l', 'n'].includes(last)) {
    return base;
  }
  if (['it', 'ng'].includes(`${beforeLast}${last}`)) {
    return base;
  }
  if (['ar', 'bl', 'ps'].includes(`${beforeLast}${last}`)) {
    return withE;
  }
  if (['a', 'e', 'o'].includes(beforeLast) && ['r', 'w', 'y'].includes(last)) {
    return base;
  }
  if (isVowel(beforeLast) || isVowel(last) || ['c', 'g', 'v'].includes(last)) {
    return withE;
  }

  return base;
};

module.exports = convertPastParticipleToPresent;
