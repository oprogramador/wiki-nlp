const _ = require('lodash');
const groupAnd = require('../../groupAnd');
const convertNumbers = require('../../convertNumbers');
const groupVerbs = require('../../groupVerbs');
const expect = require('../expect');

describe('groupAnd & convertNumbers & groupVerbs', () => {
  it('converts', () => {
    const words = ['Alan', 'has', 'ten', 'apples', ',', 'bananas', ',', 'and', 'oranges'];

    const result = _.flow(
      groupAnd,
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
                'banabas',
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
