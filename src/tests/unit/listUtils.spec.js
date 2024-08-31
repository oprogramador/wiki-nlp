const {
  getBeforeLast,
  getBeforeBeforeLast,
  getLast,
  withoutLast,
  withoutRange,
} = require('../../listUtils');
const expect = require('../expect');

describe('listUtils', () => {
  describe('getLast', () => {
    it('gets the last zero items', () => {
      const result = getLast(['a', 'b', 'c', 'd', 'e'], 0);

      expect(result).to.deep.equal([]);
    });

    it('gets the last one item', () => {
      const result = getLast(['a', 'b', 'c', 'd', 'e'], 1);

      expect(result).to.deep.equal(['e']);
    });

    it('gets the last two items', () => {
      const result = getLast(['a', 'b', 'c', 'd', 'e'], 2);

      expect(result).to.deep.equal(['d', 'e']);
    });
  });

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

  describe('withoutLast', () => {
    it('skips 0 elements', () => {
      const result = withoutLast(['a', 'b', 'c'], 0);

      expect(result).to.deep.equal(['a', 'b', 'c']);
    });

    it('skips 1 element', () => {
      const result = withoutLast(['a', 'b', 'c'], 1);

      expect(result).to.deep.equal(['a', 'b']);
    });

    it('skips 2 elements', () => {
      const result = withoutLast(['a', 'b', 'c'], 2);

      expect(result).to.deep.equal(['a']);
    });

    it('skips 3 elements', () => {
      const result = withoutLast(['a', 'b', 'c'], 3);

      expect(result).to.deep.equal([]);
    });
  });

  describe('withoutRange', () => {
    it('handles start above end', () => {
      const result = withoutRange(['a', 'b', 'c', 'd', 'e'], 40, 0);

      expect(result).to.deep.equal(['a', 'b', 'c', 'd', 'e']);
    });

    it('skips a 2-element range in the middle', () => {
      const result = withoutRange(['a', 'b', 'c', 'd', 'e'], 2, 3);

      expect(result).to.deep.equal(['a', 'b', 'e']);
    });

    it('skips a 2-element range at the end', () => {
      const result = withoutRange(['a', 'b', 'c', 'd', 'e'], 3, 4);

      expect(result).to.deep.equal(['a', 'b', 'c']);
    });

    it('skips a 2-element range at the beginning', () => {
      const result = withoutRange(['a', 'b', 'c', 'd', 'e'], 0, 1);

      expect(result).to.deep.equal(['c', 'd', 'e']);
    });
  });
});
