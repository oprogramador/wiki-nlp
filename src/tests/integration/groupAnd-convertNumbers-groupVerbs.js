const _ = require('lodash');
const groupAnd = require('../../groupAnd');
const convertNumbers = require('../../convertNumbers');
const groupNumbers = require('../../groupNumbers');
const groupVerbs = require('../../groupVerbs');
const expect = require('../expect');

describe('groupAnd & convertNumbers & groupVerbs', () => {
  it('converts', () => {
    const words = ['Alan', 'has', 'ten', 'apples', ',', 'bananas', ',', 'and', 'oranges'];

    const result = _.flow(
      groupAnd,
      groupNumbers,
      convertNumbers,
      groupVerbs,
    )(words);

    expect(result).to.deep.equal([
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: {
              groupType: 'and',
              members: [
                'apples',
                'bananas',
                'oranges',
              ],
            },
            value: 10,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]);
  });
});
