const groupPrepositions = require('../groupPrepositions');
const expect = require('./expect');

describe('groupPrepositions', () => {
  it('groups with a preposition in the middle', () => {
    const words = ['a', 'b', 'of', 'c', 'd'];

    const result = groupPrepositions(words);

    expect(result).to.deep.equal([
      'a',
      {
        groupType: 'preposition',
        object: 'c',
        subject: 'b',
        verb: 'of',
      },
      'd',
    ]);
  });

  it('groups without any preposition', () => {
    const words = ['a', 'b', 'c', 'd'];

    const result = groupPrepositions(words);

    expect(result).to.deep.equal([
      'a', 'b', 'c', 'd',
    ]);
  });
});
