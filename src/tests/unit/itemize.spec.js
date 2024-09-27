const itemize = require('../../transformers/itemize');
const expect = require('../expect');

describe('itemize', () => {
  it('does not add an item', () => {
    const words = [
      'Alan',
      'is',
      {
        groupType: 'quantity',
        value: 25,
      },
    ];

    const result = itemize(words);

    expect(result).to.deep.equal([
      'Alan',
      'is',
      {
        groupType: 'quantity',
        value: 25,
      },
    ]);
  });

  it('adds a string item', () => {
    const words = [
      'Alan',
      'has',
      {
        groupType: 'quantity',
        value: 5,
      },
      'apples',
      'recently',
    ];

    const result = itemize(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity',
        item: 'apples',
        value: 5,
      },
      'recently',
    ]);
  });

  it('adds a group item', () => {
    const words = [
      'Alan',
      'has',
      {
        groupType: 'quantity',
        value: 5,
      },
      {
        groupType: 'and',
        members: [
          'apples',
          'oranges',
        ],
      },
      'recently',
    ];

    const result = itemize(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity',
        item: {
          groupType: 'and',
          members: [
            'apples',
            'oranges',
          ],
        },
        value: 5,
      },
      'recently',
    ]);
  });
});
