const flow = require('../../flow');
const splitText = require('../../splitText');
const expect = require('../expect');

describe('alternative names (e2e)', () => {
  it('converts "also known as" with passive', () => {
    // eslint-disable-next-line max-len
    const words = 'Solenopsis amblychila, also known as the fire ant, was discovered in the 1990s, in Arizona by Dave Davis';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            alternativeNames: [
              {
                groupType: 'article',
                words: [
                  'the',
                  'fire',
                  'ant',
                ],
              },
            ],
            groupType: 'article',
            words: [
              'Solenopsis',
              'amblychila',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Dave',
              'Davis',
            ],
          },
        ],
        verb: 'discover',
        when: {
          groupType: 'date',
          maxYear: 1999,
          minYear: 1990,
        },
        where: 'Arizona',
      },
    ]]);
  });

  it('converts "also known as" with OR', () => {
    const words = 'A boss, also known as a lord, head, or mastermind is the leader';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'leader',
            ],
          },
        ],
        subject: [
          {
            alternativeNames: [
              {
                groupType: 'article',
                words: [
                  'a',
                  'lord',
                ],
              },
              'head',
              'mastermind',
            ],
            groupType: 'article',
            words: [
              'a',
              'boss',
            ],
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('converts "also known as" after a word with no article', () => {
    const words = 'CEO, also known as an executive, is the main leader';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'main',
              'leader',
            ],
          },
        ],
        subject: [
          {
            alternativeNames: [
              {
                groupType: 'article',
                words: [
                  'an',
                  'executive',
                ],
              },
            ],
            groupType: 'article',
            words: [
              'CEO',
            ],
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('converts "also known as" inside a bracket', () => {
    const words = 'A Venetian window (also known as a central window) was used by artists in the 16th century';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            alternativeNames: [
              {
                groupType: 'article',
                words: [
                  'a',
                  'central',
                  'window',
                ],
              },
            ],
            groupType: 'article',
            words: [
              'a',
              'Venetian',
              'window',
            ],
          },
        ],
        subject: [
          'artists',
        ],
        verb: 'use',
        when: {
          groupType: 'date',
          maxYear: 1600,
          minYear: 1501,
        },
      },
    ]]);
  });
});
