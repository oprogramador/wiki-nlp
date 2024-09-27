const groupAnd = require('../../transformers/groupAnd');
const expect = require('../expect');

describe('groupAnd', () => {
  it('groups 2 elements', () => {
    const words = ['They', 'include', 'orange', ',', 'and', 'banana'];

    const result = groupAnd(words);

    expect(result).to.deep.equal([
      'They',
      'include',
      {
        groupType: 'and',
        members: [
          'orange',
          'banana',
        ],
      },
    ]);
  });

  it('groups 3 elements', () => {
    const words = ['They', 'include', 'apple', ',', 'orange', ',', 'and', 'banana'];

    const result = groupAnd(words);

    expect(result).to.deep.equal([
      'They',
      'include',
      {
        groupType: 'and',
        members: [
          'apple',
          'orange',
          'banana',
        ],
      },
    ]);
  });

  it('groups followed by something', () => {
    const words = ['Fruits', 'such', 'like', ':', 'orange', ',', 'and', 'banana', 'are', 'tasty'];

    const result = groupAnd(words);

    expect(result).to.deep.equal([
      'Fruits',
      'such',
      'like',
      ':',
      {
        groupType: 'and',
        members: [
          'orange',
          'banana',
        ],
      },
      'are',
      'tasty',
    ]);
  });

  it('groups from beginning', () => {
    const words = ['Orange', ',', 'and', 'banana', 'are', 'tasty'];

    const result = groupAnd(words);

    expect(result).to.deep.equal([
      {
        groupType: 'and',
        members: [
          'Orange',
          'banana',
        ],
      },
      'are',
      'tasty',
    ]);
  });
});
