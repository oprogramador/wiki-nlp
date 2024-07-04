const { getBeforeLast, getBeforeBeforeLast, withoutRange } = require('../../listUtils');
const expect = require('../expect');

describe('listUtils', () => {
  describe('getBeforeLast', () => {
    it('returns an empty object for a missing item', () => {
      const result = getBeforeLast(['a']);

      expect(result).to.deep.equal({});
    });

    it('returns an item', () => {
      const result = getBeforeLast(['a', 'b', 'c', 'd', 'e']);

      expect(result).to.deep.equal('d');
    });
  });

  describe('getBeforeBeforeLast', () => {
    it('returns an empty object for a missing item', () => {
      const result = getBeforeBeforeLast(['a', 'b']);

      expect(result).to.deep.equal({});
    });

    it('returns an item', () => {
      const result = getBeforeBeforeLast(['a', 'b', 'c', 'd', 'e']);

      expect(result).to.deep.equal('c');
    });
  });

  describe('withoutRange', () => {
    it('handles start above end', () => {
      const result = withoutRange(['a', 'b', 'c', 'd', 'e'], 40, 0);

      expect(result).to.deep.equal(['a', 'b', 'c', 'd', 'e']);
    });

    it('skips a 2-element range', () => {
      const result = withoutRange(['a', 'b', 'c', 'd', 'e'], 2, 3);

      expect(result).to.deep.equal(['a', 'b', 'e']);
    });
  });
});
