const convertNumbers = require('../convertNumbers');
const expect = require('./expect');

describe('convertNumbers', () => {
  it('converts from a word', () => {
    const words = ['Alan', 'has', 'five', 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      5,
      'apples',
    ]);
  });

  it('converts from digits', () => {
    const words = ['Alan', 'has', '5', 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      5,
      'apples',
    ]);
  });

  it('converts with a dot', () => {
    const words = ['Alan', 'has', '1.234', 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      1.234,
      'apples',
    ]);
  });

  it('converts with a comma', () => {
    const words = ['Alan', 'has', '1,234', 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      1234,
      'apples',
    ]);
  });

  it('converts with two commas', () => {
    const words = ['Alan', 'has', '1,234,567', 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      1234567,
      'apples',
    ]);
  });

  it('converts with %', () => {
    const words = ['Alan', 'has', '5', '%', 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'share',
        value: 0.05,
      },
      'apples',
    ]);
  });

  it('converts with per cent', () => {
    const words = ['Alan', 'has', '7', 'per', 'cent', 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'share',
        value: 0.07,
      },
      'apples',
    ]);
  });

  it('converts with percent', () => {
    const words = ['Alan', 'has', '8', 'percent', 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      {
        groupType: 'share',
        value: 0.08,
      },
      'apples',
    ]);
  });

  it('converts with million', () => {
    const words = ['Alan', 'has', '3', 'million', 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      3e6,
      'apples',
    ]);
  });

  it('converts with billion', () => {
    const words = ['Alan', 'has', '3.5', 'billion', 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      3.5e9,
      'apples',
    ]);
  });

  it('converts with trillion', () => {
    const words = ['Alan', 'has', '3.45', 'trillion', 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      3.45e12,
      'apples',
    ]);
  });

  it('converts with euro', () => {
    const words = ['Alan', 'has', '€', '12.34'];

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
    const words = ['Alan', 'has', '€', '12.34', 'million'];

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
