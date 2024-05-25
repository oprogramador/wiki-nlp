const convertPunctuation = require('../convertPunctuation');
const expect = require('./expect');

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
});
