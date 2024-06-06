const _ = require('lodash');
const convertPunctuation = require('../../convertPunctuation');
const groupAnd = require('../../groupAnd');
const groupArticles = require('../../groupArticles');
const groupVerbs = require('../../groupVerbs');
const groupPrepositions = require('../../groupPrepositions');
const splitText = require('../../splitText');
const expect = require('../expect');

describe('convertPunctuation & groupAnd & groupArticles & groupVerbs & groupPrepositions', () => {
  it('converts', () => {
    const text = 'American athletes are described as strong, fast, and resilient.';
    const words = splitText(text);

    const result = words.map(phrase => _.flow(
      convertPunctuation,
      groupAnd,
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
                  groupType: 'and',
                  members: [
                    'strong',
                    'fast',
                    'resilient',
                  ],
                },
              ],
              subject: [
                'described',
              ],
              verb: 'as',
            },
          ],
          subject: [
            'American',
            'athletes',
          ],
          verb: 'are',
        },
      ],
    ]);
  });
});
