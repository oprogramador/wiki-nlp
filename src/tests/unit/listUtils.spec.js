const { withoutRange } = require('../../listUtils');
const expect = require('../expect');

describe('listUtils', () => {
  describe('withoutRange', () => {
    it('skips a 2-element range', () => {
      const result = withoutRange(['a', 'b', 'c', 'd', 'e'], 2, 3);

      expect(result).to.deep.equal(['a', 'b', 'e']);
    });
  });
});
