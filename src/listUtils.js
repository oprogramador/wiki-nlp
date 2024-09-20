const getBeforeLast = list => (list || []).slice(-2, -1)[0] || {};
const getBeforeBeforeLast = list => (list || []).slice(-3, -2)[0] || {};
const getBeforeBeforeBeforeLast = list => (list || []).slice(-4, -3)[0] || {};
const getFirst = (list, number) => list.slice(0, number);
const getLast = (list, number) => (number > 0 ? list.slice(-number) : []);
const withoutLast = (list, number) => (number > 0 ? list.slice(0, -number) : list);
const withoutFirst = (list, number) => list.slice(number);
const withoutLastOne = list => withoutLast(list, 1);
const withoutFirstOne = list => withoutFirst(list, 1);

const withoutRange = (list, start, end) => {
  if (start > end) {
    return list;
  }

  return [...getFirst(list, start), ...getLast(list, list.length - end - 1)];
};

module.exports = {
  getBeforeBeforeBeforeLast,
  getBeforeBeforeLast,
  getBeforeLast,
  getFirst,
  getLast,
  withoutFirst,
  withoutFirstOne,
  withoutLast,
  withoutLastOne,
  withoutRange,
};
