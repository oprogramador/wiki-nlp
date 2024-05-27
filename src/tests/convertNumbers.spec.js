const convertNumbers = require('../convertNumbers');
const expect = require('./expect');

describe('convertNumbers', () => {
  it('converts', () => {
    const words = ['Alan', 'has', 'five', 'apples'];

    const result = convertNumbers(words);

    expect(result).to.deep.equal([
      'Alan',
      'has',
      5,
      'apples',
    ]);
  });
});
