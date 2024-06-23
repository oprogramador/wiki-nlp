const getBeforeLast = list => list.slice(-2, -1)[0] || {};
const getBeforeBeforeLast = list => list.slice(-3, -2)[0] || {};
const getFirst = (list, number) => list.slice(0, number);
const getLast = (list, number) => list.slice(-number);
const withoutLast = (list, number) => list.slice(0, -number);
const withoutFirst = (list, number) => list.slice(number);
const withoutLastOne = list => withoutLast(list, 1);
const withoutFirstOne = list => withoutFirst(list, 1);

module.exports = {
  getBeforeBeforeLast,
  getBeforeLast,
  getFirst,
  getLast,
  withoutFirst,
  withoutFirstOne,
  withoutLast,
  withoutLastOne,
};
