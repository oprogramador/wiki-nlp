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
});
