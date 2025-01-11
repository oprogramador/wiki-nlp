const flow = require('../../flow');
const splitText = require('../../splitText');
const expect = require('../expect');

describe('frequency (e2e)', () => {
  it('converts "every" after an adverb', () => {
    const words = 'The election is performed regularly every 5 years';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'regularly',
        ],
        frequency: {
          groupType: 'quantity',
          item: 'years',
          value: 5,
        },
        groupType: 'verb',
        object: [
          'performed',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'election',
            ],
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('converts "every" with no adverb', () => {
    const words = 'The leaders have been meeting every 3 weeks';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        frequency: {
          groupType: 'quantity',
          item: 'weeks',
          value: 3,
        },
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'been',
              'meeting',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'leaders',
            ],
          },
        ],
        verb: 'have',
      },
    ]]);
  });
});
