const groupVerbs = require('../groupVerbs');
const expect = require('./expect');

describe('groupVerbs', () => {
  it('groups with a verb in the middle', () => {
    const words = ['Alan', 'is', 'smart'];

    const result = groupVerbs(words);

    expect(result).to.deep.equal([{
      groupType: 'verb',
      object: 'smart',
      subject: 'Alan',
      verb: 'is',
    }]);
  });

  it('groups with a negation (not)', () => {
    const words = ['Alan', 'is', 'not', 'smart'];

    const result = groupVerbs(words);

    expect(result).to.deep.equal([{
      groupType: 'verb',
      isNegated: true,
      object: 'smart',
      subject: 'Alan',
      verb: 'is',
    }]);
  });

  it('groups with a negation (no)', () => {
    const words = ['Alan', 'has', 'no', 'money'];

    const result = groupVerbs(words);

    expect(result).to.deep.equal([{
      groupType: 'verb',
      isNegated: true,
      object: 'money',
      subject: 'Alan',
      verb: 'has',
    }]);
  });
});
