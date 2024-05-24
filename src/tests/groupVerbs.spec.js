const groupVerbs = require('../groupVerbs');
const expect = require('./expect');

describe('groupVerbs', () => {
  it('groups with a preposition in the middle', () => {
    const words = ['Alan', 'is', 'smart'];

    const result = groupVerbs(words);

    expect(result).to.deep.equal([{
      groupType: 'verb',
      object: 'smart',
      subject: 'Alan',
      verb: 'is',
    }]);
  });
});
