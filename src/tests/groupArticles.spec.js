const groupArticles = require('../groupArticles');
const expect = require('./expect');

describe('groupArticles', () => {
  it('groups with an article followed by one word', () => {
    const words = ['The', 'egg', 'is', 'white'];

    const result = groupArticles(words);

    expect(result).to.deep.equal([
      ['The', 'egg'],
      'is',
      'white',
    ]);
  });
});
