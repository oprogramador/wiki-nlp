const groupOr = require('../../transformers/groupOr');
const expect = require('../expect');

describe('groupOr', () => {
  it('groups 2 elements', () => {
    const words = ['They', 'include', 'orange', ',', 'or', 'banana'];

    const result = groupOr(words);

    expect(result).to.deep.equal([
      'They',
      'include',
      {
        groupType: 'or',
        members: [
          'orange',
          'banana',
        ],
      },
    ]);
  });

  it('groups 3 elements', () => {
    const words = ['They', 'include', 'apple', ',', 'orange', ',', 'or', 'banana'];

    const result = groupOr(words);

    expect(result).to.deep.equal([
      'They',
      'include',
      {
        groupType: 'or',
        members: [
          'apple',
          'orange',
          'banana',
        ],
      },
    ]);
  });

  it('groups followed by something', () => {
    const words = ['Fruits', 'such', 'like', ':', 'orange', ',', 'or', 'banana', 'are', 'tasty'];

    const result = groupOr(words);

    expect(result).to.deep.equal([
      'Fruits',
      'such',
      'like',
      ':',
      {
        groupType: 'or',
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
    const words = ['Orange', ',', 'or', 'banana', 'are', 'tasty'];

    const result = groupOr(words);

    expect(result).to.deep.equal([
      {
        groupType: 'or',
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
