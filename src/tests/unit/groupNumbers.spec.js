const groupNumbers = require('../../groupNumbers');
const expect = require('../expect');

describe('groupNumbers', () => {
  it('groups from a word', () => {
    const words = ['Alan', 'has', 'five', 'apples'];

    const result = groupNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity-raw',
        words: ['five', 'apples'],
      },
    ]);
  });

  it('finishes adding', () => {
    const words = ['Alan', 'has', 'five', 'apples', 'but', 'no', 'oranges'];

    const result = groupNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity-raw',
        words: ['five', 'apples'],
      },
      'but',
      'no',
      'oranges',
    ]);
  });

  it('groups from digits', () => {
    const words = ['Alan', 'has', '5', 'apples'];

    const result = groupNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity-raw',
        words: ['5', 'apples'],
      },
    ]);
  });

  it('groups with over', () => {
    const words = ['Alan', 'has', 'over', '50', 'apples'];

    const result = groupNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity-raw',
        words: ['over', '50', 'apples'],
      },
    ]);
  });

  it('groups with above', () => {
    const words = ['Alan', 'has', 'above', '50', 'apples'];

    const result = groupNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity-raw',
        words: ['above', '50', 'apples'],
      },
    ]);
  });

  it('groups with around', () => {
    const words = ['Alan', 'has', 'around', '50', 'apples'];

    const result = groupNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity-raw',
        words: ['around', '50', 'apples'],
      },
    ]);
  });

  it('groups with about', () => {
    const words = ['Alan', 'has', 'about', '50', 'apples'];

    const result = groupNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity-raw',
        words: ['about', '50', 'apples'],
      },
    ]);
  });

  it('groups with a dot', () => {
    const words = ['Alan', 'has', '1.234', 'apples'];

    const result = groupNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity-raw',
        words: ['1.234', 'apples'],
      },
    ]);
  });

  it('groups with a comma', () => {
    const words = ['Alan', 'has', '1,234', 'apples'];

    const result = groupNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity-raw',
        words: ['1,234', 'apples'],
      },
    ]);
  });

  it('groups with two commas', () => {
    const words = ['Alan', 'has', '1,234,567', 'apples'];

    const result = groupNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity-raw',
        words: ['1,234,567', 'apples'],
      },
    ]);
  });

  it('groups with %', () => {
    const words = ['Unemployment', 'is', '5', '%'];

    const result = groupNumbers(words);

    expect(result).to.deep.equal([
      'Unemployment',
      'is',
      {
        groupType: 'quantity-raw',
        words: ['5', '%'],
      },
    ]);
  });

  it('groups with million', () => {
    const words = ['Alan', 'has', '3', 'million', 'apples'];

    const result = groupNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity-raw',
        words: ['3', 'million', 'apples'],
      },
    ]);
  });

  it('groups with a million', () => {
    const words = ['Alan', 'has', 'a', 'million', 'apples'];

    const result = groupNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity-raw',
        words: ['a', 'million', 'apples'],
      },
    ]);
  });

  it('groups with billion', () => {
    const words = ['Alan', 'has', '3.5', 'billion', 'apples'];

    const result = groupNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity-raw',
        words: ['3.5', 'billion', 'apples'],
      },
    ]);
  });

  it('groups with trillion', () => {
    const words = ['Alan', 'has', '3.45', 'trillion', 'apples'];

    const result = groupNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity-raw',
        words: ['3.45', 'trillion', 'apples'],
      },
    ]);
  });

  it('groups with euro', () => {
    const words = ['Alan', 'has', '€', '12.34'];

    const result = groupNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity-raw',
        words: ['€', '12.34'],
      },
    ]);
  });

  it('groups with about & euro', () => {
    const words = ['Alan', 'has', 'about', '€', '12.34'];

    const result = groupNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity-raw',
        words: ['about', '€', '12.34'],
      },
    ]);
  });

  it('groups with euro and million', () => {
    const words = ['Alan', 'has', '€', '12.34', 'million'];

    const result = groupNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity-raw',
        words: ['€', '12.34', 'million'],
      },
    ]);
  });

  it('groups with over, euro and million', () => {
    const words = ['Alan', 'has', 'over', '€', '12', 'million'];

    const result = groupNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity-raw',
        words: ['over', '€', '12', 'million'],
      },
    ]);
  });
});
