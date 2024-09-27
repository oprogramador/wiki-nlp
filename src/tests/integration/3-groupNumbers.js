const _ = require('lodash');
const convertPunctuation = require('../../transformers/convertPunctuation');
const convertNumbers = require('../../transformers/convertNumbers');
const groupArticles = require('../../transformers/groupArticles');
const groupNumbers = require('../../transformers/groupNumbers');
const itemize = require('../../transformers/itemize');
const groupVerbs = require('../../transformers/groupVerbs');
const groupPrepositions = require('../../transformers/groupPrepositions');
const splitText = require('../../splitText');
const expect = require('../expect');

describe('convertPunctuation & groupNumbers && convertNumbers & groupArticles & groupVerbs & groupPrepositions', () => {
  it('converts', () => {
    // eslint-disable-next-line max-len
    const text = 'The Eastern Caribbean dollar is the official currency in 7 member states of the Organisation of Eastern Caribbean States (OECS).';
    const words = splitText(text);

    const result = words.map(phrase => _.flow(
      convertPunctuation,
      groupNumbers,
      convertNumbers,
      groupArticles,
      itemize,
      groupVerbs,
      groupPrepositions,
    )(phrase));

    expect(result).to.deep.equal([
      [
        {
          groupType: 'verb',
          object: [
            {
              groupType: 'preposition',
              object: [
                {
                  groupType: 'preposition',
                  object: [
                    {
                      abbreviation: 'OECS',
                      groupType: 'article',
                      words: [
                        'the',
                        'Organisation',
                        'of',
                        'Eastern',
                        'Caribbean',
                        'States',
                      ],
                    },
                  ],
                  subject: [
                    {
                      groupType: 'quantity',
                      item: {
                        groupType: 'article',
                        words: [
                          'member',
                          'states',
                        ],
                      },
                      value: 7,
                    },
                  ],
                  verb: 'of',
                },
              ],
              subject: [
                {
                  groupType: 'article',
                  words: [
                    'the',
                    'official',
                    'currency',
                  ],
                },
              ],
              verb: 'in',
            },
          ],
          subject: [
            {
              groupType: 'article',
              words: [
                'The',
                'Eastern',
                'Caribbean',
                'dollar',
              ],
            },
          ],
          verb: 'is',
        },
      ],
    ]);
  });
});
