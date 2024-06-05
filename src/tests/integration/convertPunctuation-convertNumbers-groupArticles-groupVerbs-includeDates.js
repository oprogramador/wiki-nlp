const _ = require('lodash');
const convertPunctuation = require('../../convertPunctuation');
const convertNumbers = require('../../convertNumbers');
const groupArticles = require('../../groupArticles');
const groupVerbs = require('../../groupVerbs');
const includeDates = require('../../includeDates');
const expect = require('../expect');

describe('convertPunctuation & convertNumbers & groupArticles & groupVerbs & includeDates', () => {
  it('converts', () => {
    const words = ['In', '2001', ',', 'Kofi', 'Annan', 'was', 'awarded', 'the', 'Nobel', 'Peace', 'Prize'];

    const result = _.flow(
      convertPunctuation,
      convertNumbers,
      groupArticles,
      groupVerbs,
      includeDates,
    )(words);

    expect(result).to.deep.equal([
      {
        groupType: 'verb',
        object: [
          'awarded',
          {
            groupType: 'article',
            words: [
              'the',
              'Nobel',
              'Peace',
              'Prize',
            ],
          },
        ],
        subject: [
          ',',
          {
            groupType: 'article',
            words: [
              'Kofi',
              'Annan',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          year: 2001,
        },
      },
    ]);
  });
});
