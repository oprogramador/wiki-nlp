const _ = require('lodash');
const groupAnd = require('../../groupAnd');
const convertNumbers = require('../../convertNumbers');
const groupNumbers = require('../../groupNumbers');
const itemize = require('../../itemize');
const groupVerbs = require('../../groupVerbs');
const expect = require('../expect');

describe('groupAnd & convertNumbers & itemize & groupVerbs', () => {
  it('converts', () => {
    const words = ['Alan', 'has', 'ten', 'apples', ',', 'bananas', ',', 'and', 'oranges'];

    const result = _.flow(
      groupNumbers,
      convertNumbers,
      groupAnd,
      itemize,
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
