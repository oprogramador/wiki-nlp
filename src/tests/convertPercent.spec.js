const convertPercent = require('../convertPercent');
const expect = require('./expect');

describe('convertPercent', () => {
  it('does not convert with %', () => {
    const words = ['Unemployment', 'is', '5', '%'];

    const result = convertPercent(words);

    expect(result).to.deep.equal([
      'Unemployment',
      'is',
      '5',
      '%',
    ]);
  });

  it('does not convert with per', () => {
    const words = ['GDP', 'is', '7000', 'per', 'capita'];

    const result = convertPercent(words);

    expect(result).to.deep.equal([
      'GDP',
      'is',
      '7000',
      'per',
      'capita',
    ]);
  });

  it('converts with per cent', () => {
    const words = ['Unemployment', 'is', '7', 'per', 'cent'];

    const result = convertPercent(words);

    expect(result).to.deep.equal([
      'Unemployment',
      'is',
      '7',
      '%',
    ]);
  });

  it('converts with percent', () => {
    const words = ['Unemployment', 'is', '8', 'percent'];

    const result = convertPercent(words);

    expect(result).to.deep.equal([
      'Unemployment',
      'is',
      '8',
      '%',
    ]);
  });
});
