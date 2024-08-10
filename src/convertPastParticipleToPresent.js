const isVowel = require('./isVowel');

const convertPastParticipleToPresent = (word) => {
  const withoutEd = word.replace(/ed$/, '');
  const last = withoutEd[withoutEd.length - 1];
  const beforeLast = withoutEd[withoutEd.length - 2];
  const beforeBeforeLast = withoutEd[withoutEd.length - 3];
  if (last === 'i') {
    return withoutEd.replace(/i$/, 'y');
  }
  if (beforeLast === 'e' && last === 'l') {
    return withoutEd;
  }
  if (beforeLast === 'p' && last === 's') {
    return `${withoutEd}e`;
  }
  if (last === 'x') {
    return withoutEd;
  }
  if (beforeBeforeLast === 'e' && ['a', 'e'].includes(beforeLast)) {
    return withoutEd;
  }
  if (beforeLast === last && ['p', 'n', 'r'].includes(last)) {
    return withoutEd.replace(/.$/, '');
  }
  if (beforeBeforeLast === 'e' && beforeLast === last && ['l'].includes(last)) {
    return withoutEd.replace(/.$/, '');
  }
  if (['a', 'o'].includes(beforeBeforeLast) && beforeLast === 'i') {
    return withoutEd;
  }
  if (beforeLast === 'i' && last === 't') {
    return withoutEd;
  }
  if (beforeLast === 'b' && last === 'l') {
    return `${withoutEd}e`;
  }
  if (beforeLast === 'e' && last === 'n') {
    return withoutEd;
  }
  if (beforeLast === 'n' && last === 'g') {
    return withoutEd;
  }
  if (beforeLast === 'a' && last === 'r') {
    return `${withoutEd}e`;
  }
  if (['r', 'w', 'y'].includes(last) && ['a', 'e', 'o'].includes(beforeLast)) {
    return withoutEd;
  }
  if (isVowel(beforeLast) || isVowel(last) || ['c', 'g', 'v'].includes(last)) {
    return `${withoutEd}e`;
  }

  return withoutEd;
};

module.exports = convertPastParticipleToPresent;
