const groupVerbs = require('../../groupVerbs');
const expect = require('../expect');

describe('groupVerbs', () => {
  it('groups with a verb in the middle', () => {
    const words = ['Alan', 'is', 'smart'];

    const result = groupVerbs(words);

    expect(result).to.deep.equal([{
      groupType: 'verb',
      object: ['smart'],
      subject: ['Alan'],
      verb: 'is',
    }]);
  });

  it('groups with a verb before article', () => {
    const words = [
      'Alan',
      'became',
      {
        groupType: 'article',
        words: ['the', 'best'],
      },
    ];

    const result = groupVerbs(words);

    expect(result).to.deep.equal([{
      groupType: 'verb',
      object: [{
        groupType: 'article',
        words: ['the', 'best'],
      }],
      subject: ['Alan'],
      verb: 'became',
    }]);
  });

  it('groups with a verb at the end', () => {
    const words = ['Alan', 'ate'];

    const result = groupVerbs(words);

    expect(result).to.deep.equal([{
      groupType: 'verb',
      subject: ['Alan'],
      verb: 'ate',
    }]);
  });

  it('does not group with uppercase at the end', () => {
    const words = ['Alan', 'Smith'];

    const result = groupVerbs(words);

    expect(result).to.deep.equal([
      'Alan',
      'Smith',
    ]);
  });

  it('does not group with a punctuation at the end', () => {
    const words = ['Alan', '$'];

    const result = groupVerbs(words);

    expect(result).to.deep.equal([
      'Alan',
      '$',
    ]);
  });

  it('does not group with a number at the end', () => {
    const words = ['Alan', '123'];

    const result = groupVerbs(words);

    expect(result).to.deep.equal([
      'Alan',
      '123',
    ]);
  });

  it('groups with a negation (not)', () => {
    const words = ['Alan', 'is', 'not', 'smart'];

    const result = groupVerbs(words);

    expect(result).to.deep.equal([{
      groupType: 'verb',
      isNegated: true,
      object: ['smart'],
      subject: ['Alan'],
      verb: 'is',
    }]);
  });

  it('groups with a negation (no)', () => {
    const words = ['Alan', 'has', 'no', 'money'];

    const result = groupVerbs(words);

    expect(result).to.deep.equal([{
      groupType: 'verb',
      isNegated: true,
      object: ['money'],
      subject: ['Alan'],
      verb: 'has',
    }]);
  });

  it('splits a long phrase', () => {
    const words = ['The', 'executive', 'branch', 'is', 'organised', 'as', 'a', 'simple', 'system'];

    const result = groupVerbs(words);

    expect(result).to.deep.equal([{
      groupType: 'verb',
      object: ['organised', 'as', 'a', 'simple', 'system'],
      subject: ['The', 'executive', 'branch'],
      verb: 'is',
    }]);
  });
});
