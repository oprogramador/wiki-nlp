const groupPrepositions = require('../../transformers/groupPrepositions');
const expect = require('../expect');

describe('groupPrepositions', () => {
  it('groups with a preposition in the middle', () => {
    const words = ['a', 'b', 'of', 'c', 'd'];

    const result = groupPrepositions(words);

    expect(result).to.deep.equal([
      {
        groupType: 'preposition',
        object: ['c', 'd'],
        subject: ['a', 'b'],
        verb: 'of',
      },
    ]);
  });

  it('groups inside groups', () => {
    const words = [{
      groupType: 'verb',
      object: ['a', 'of', 'b'],
      subject: ['c', 'of', 'd'],
    }];

    const result = groupPrepositions(words);

    expect(result).to.deep.equal([{
      groupType: 'verb',
      object: [{
        groupType: 'preposition',
        object: ['b'],
        subject: ['a'],
        verb: 'of',
      }],
      subject: [{
        groupType: 'preposition',
        object: ['d'],
        subject: ['c'],
        verb: 'of',
      }],
    }]);
  });

  it('groups inside missing groups', () => {
    const words = [{
      groupType: 'verb',
    }];

    const result = groupPrepositions(words);

    expect(result).to.deep.equal([{
      groupType: 'verb',
    }]);
  });

  it('groups without any preposition', () => {
    const words = ['a', 'b', 'c', 'd'];

    const result = groupPrepositions(words);

    expect(result).to.deep.equal([
      'a', 'b', 'c', 'd',
    ]);
  });
});
