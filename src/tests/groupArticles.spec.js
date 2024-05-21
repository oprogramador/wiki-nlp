const groupArticles = require('../groupArticles');
const expect = require('./expect');

describe('groupArticles', () => {
  it('groups with an article followed by one word', () => {
    const words = ['The', 'egg', 'is', 'white'];

    const result = groupArticles(words);

    expect(result).to.deep.equal([
      { groupType: 'article', words: ['The', 'egg'] },
      'is',
      'white',
    ]);
  });

  it('groups with an article followed by two-words proper name', () => {
    const words = ['The', 'European', 'Union', 'is', 'large'];

    const result = groupArticles(words);

    expect(result).to.deep.equal([
      { groupType: 'article', words: ['The', 'European', 'Union'] },
      'is',
      'large',
    ]);
  });

  it('groups with an article followed by three-words proper name', () => {
    const words = ['You', 'work', 'in', 'the', 'European', 'Central', 'Bank'];

    const result = groupArticles(words);

    expect(result).to.deep.equal([
      'You',
      'work',
      'in',
      { groupType: 'article', words: ['the', 'European', 'Central', 'Bank'] },
    ]);
  });

  it('groups with a preposition inside', () => {
    const words = ['I', 'signed', 'the', 'Treaty', 'of', 'Lisbon'];

    const result = groupArticles(words);

    expect(result).to.deep.equal([
      'I',
      'signed',
      { groupType: 'article', words: ['the', 'Treaty', 'of', 'Lisbon'] },
    ]);
  });

  it('groups with two prepositions inside', () => {
    const words = ['The', 'Nomenclature', 'of', 'Territorial', 'Units', 'for', 'Statistics', 'is', 'a', 'standard'];

    const result = groupArticles(words);

    expect(result).to.deep.equal([
      { groupType: 'article', words: ['The', 'Nomenclature', 'of', 'Territorial', 'Units', 'for', 'Statistics'] },
      'is',
      { groupType: 'article', words: ['a', 'standard'] },
    ]);
  });
});
