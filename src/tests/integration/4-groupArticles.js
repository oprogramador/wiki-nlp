const _ = require('lodash');
const convertPunctuation = require('../../transformers/convertPunctuation');
const groupArticles = require('../../transformers/groupArticles');
const groupVerbs = require('../../transformers/groupVerbs');
const groupPrepositions = require('../../transformers/groupPrepositions');
const splitText = require('../../splitText');
const expect = require('../expect');

describe('convertPunctuation & groupArticles & groupVerbs & groupPrepositions', () => {
  it('converts', () => {
    const text = 'The gross domestic product (GDP) is a measure of economic success';
    const words = splitText(text);

    const result = words.map(phrase => _.flow(
      convertPunctuation,
      groupArticles,
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
                  groupType: 'article',
                  words: [
                    'economic',
                    'success',
                  ],
                },
              ],
              subject: [
                {
                  groupType: 'article',
                  words: [
                    'a',
                    'measure',
                  ],
                },
              ],
              verb: 'of',
            },
          ],
          subject: [
            {
              abbreviation: 'GDP',
              groupType: 'article',
              words: [
                'The',
                'gross',
                'domestic',
                'product',
              ],
            },
          ],
          verb: 'is',
        },
      ],
    ]);
  });
});
