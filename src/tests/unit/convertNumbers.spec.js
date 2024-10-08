const convertNumbers = require('../../transformers/convertNumbers');
const expect = require('../expect');

describe('convertNumbers', () => {
  it('converts from a word', () => {
    const words = ['Alan', 'has', { groupType: 'quantity-raw', words: ['five'] }, 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity',
        value: 5,
      },
      'apples',
    ]);
  });

  it('converts from digits', () => {
    const words = ['Alan', 'has', { groupType: 'quantity-raw', words: ['5'] }, 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity',
        value: 5,
      },
      'apples',
    ]);
  });

  it('converts with over', () => {
    const words = ['Alan', 'has', { groupType: 'quantity-raw', words: ['over', '50'] }, 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity',
        min: 50,
      },
      'apples',
    ]);
  });

  it('converts with above', () => {
    const words = ['Alan', 'has', { groupType: 'quantity-raw', words: ['above', '50'] }, 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity',
        min: 50,
      },
      'apples',
    ]);
  });

  it('converts with around', () => {
    const words = ['Alan', 'has', { groupType: 'quantity-raw', words: ['around', '50'] }, 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity',
        isExact: false,
        value: 50,
      },
      'apples',
    ]);
  });

  it('converts with about', () => {
    const words = ['Alan', 'has', { groupType: 'quantity-raw', words: ['about', '50'] }, 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity',
        isExact: false,
        value: 50,
      },
      'apples',
    ]);
  });

  it('converts with a dot', () => {
    const words = ['Alan', 'has', { groupType: 'quantity-raw', words: ['1.234'] }, 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity',
        value: 1.234,
      },
      'apples',
    ]);
  });

  it('converts with a comma', () => {
    const words = ['Alan', 'has', { groupType: 'quantity-raw', words: ['1,234'] }, 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity',
        value: 1234,
      },
      'apples',
    ]);
  });

  it('converts with two commas', () => {
    const words = ['Alan', 'has', { groupType: 'quantity-raw', words: ['1,234,567'] }, 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity',
        value: 1234567,
      },
      'apples',
    ]);
  });

  it('converts with %', () => {
    const words = ['Unemployment', 'is', { groupType: 'quantity-raw', words: ['5', '%'] }];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Unemployment',
      'is',
      {
        groupType: 'share',
        value: 0.05,
      },
    ]);
  });

  it('converts with million', () => {
    const words = ['Alan', 'has', { groupType: 'quantity-raw', words: ['3', 'million'] }, 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity',
        value: 3e6,
      },
      'apples',
    ]);
  });

  it('converts with a million', () => {
    const words = ['Alan', 'has', { groupType: 'quantity-raw', words: ['a', 'million'] }, 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity',
        value: 1e6,
      },
      'apples',
    ]);
  });

  it('converts with billion', () => {
    const words = ['Alan', 'has', { groupType: 'quantity-raw', words: ['3.5', 'billion'] }, 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity',
        value: 3.5e9,
      },
      'apples',
    ]);
  });

  it('converts with trillion', () => {
    const words = ['Alan', 'has', { groupType: 'quantity-raw', words: ['3.45', 'trillion'] }, 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'quantity',
        value: 3.45e12,
      },
      'apples',
    ]);
  });

  it('converts with euro', () => {
    const words = ['Alan', 'has', { groupType: 'quantity-raw', words: ['€', '12.34'] }];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        currency: 'EUR',
        groupType: 'currency',
        value: 12.34,
      },
    ]);
  });

  it('converts with euro and million', () => {
    const words = ['Alan', 'has', { groupType: 'quantity-raw', words: ['€', '12.34', 'million'] }];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        currency: 'EUR',
        groupType: 'currency',
        value: 1.234e7,
      },
    ]);
  });
});
