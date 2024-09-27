const addCommas = require('../../transformers/addCommas');
const expect = require('../expect');

describe('addCommas', () => {
  it('adds a comma for 2 words', () => {
    const words = ['Orange', 'and', 'banana'];

    const result = addCommas(words);

    expect(result).to.deep.equal([
      'Orange',
      ',',
      'and',
      'banana',
    ]);
  });
});
