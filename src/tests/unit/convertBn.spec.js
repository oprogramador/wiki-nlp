const convertBn = require('../../convertBn');
const expect = require('../expect');

describe('convertBn', () => {
  it('does not convert a raw number', () => {
    const words = ['GDP', 'is', '12', 'billion'];

    const result = convertBn(words);

    expect(result).to.deep.equal([
      'GDP',
      'is',
      '12',
      'billion',
    ]);
  });

  it('does not convert a group', () => {
    const words = ['Something', 'is', { groupType: 'foo' }];

    const result = convertBn(words);

    expect(result).to.deep.equal([
      'Something',
      'is',
      { groupType: 'foo' },
    ]);
  });

  it('does not convert non-digits ending with bn', () => {
    const words = ['Something', 'is', 'foobn'];

    const result = convertBn(words);

    expect(result).to.deep.equal([
      'Something',
      'is',
      'foobn',
    ]);
  });

  it('converts bn', () => {
    const words = ['GDP', 'is', '12bn'];

    const result = convertBn(words);

    expect(result).to.deep.equal([
      'GDP',
      'is',
      '12',
      'billion',
    ]);
  });

  it('converts bn with something after', () => {
    const words = ['They', 'spend', '12bn', 'on', 'nothing'];

    const result = convertBn(words);

    expect(result).to.deep.equal([
      'They',
      'spend',
      '12',
      'billion',
      'on',
      'nothing',
    ]);
  });
});
