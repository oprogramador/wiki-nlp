const groupDates = require('../../transformers/groupDates');
const expect = require('../expect');

describe('groupDates', () => {
  it('groups with a day, and month', () => {
    const words = ['It', 'was', 'done', 'on', '7', 'May', 'here'];

    const result = groupDates(words);

    expect(result).to.deep.equal([
      'It',
      'was',
      'done',
      'on',
      { day: 7, groupType: 'date', month: 5 },
      'here',
    ]);
  });

  it('groups with a day, and month, and year', () => {
    const words = ['It', 'was', 'done', 'on', '7', 'May', '2012', 'here'];

    const result = groupDates(words);

    expect(result).to.deep.equal([
      'It',
      'was',
      'done',
      'on',
      {
        day: 7,
        groupType: 'date',
        month: 5,
        year: 2012,
      },
      'here',
    ]);
  });

  it('groups with a month, and year', () => {
    const words = ['It', 'was', 'done', 'on', 'May', '2012', 'here'];

    const result = groupDates(words);

    expect(result).to.deep.equal([
      'It',
      'was',
      'done',
      'on',
      { groupType: 'date', month: 5, year: 2012 },
      'here',
    ]);
  });
});
