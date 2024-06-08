const convertPunctuation = require('../../convertPunctuation');
const expect = require('../expect');

describe('convertPunctuation', () => {
  it('groups with a comma', () => {
    const words = ['Alan,', 'Bob'];

    const result = convertPunctuation(words);

    expect(result).to.deep.equal([
      'Alan',
      ',',
      'Bob',
    ]);
  });

  it('groups without a comma', () => {
    const words = ['Alan', 'Bob'];

    const result = convertPunctuation(words);

    expect(result).to.deep.equal([
      'Alan',
      'Bob',
    ]);
  });

  it('groups with a euro sign', () => {
    const words = ['Alan', 'has', '€100'];

    const result = convertPunctuation(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      '€',
      '100',
    ]);
  });

  it('groups with both a comma and euro sign', () => {
    const words = ['Alan', 'has', '€100,', 'and', 'a', 'car'];

    const result = convertPunctuation(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      '€',
      '100',
      ',',
      'and',
      'a',
      'car',
    ]);
  });
});
