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

  it('converts "also known as" with OR inside a bracket', () => {
    // eslint-disable-next-line max-len
    const words = 'A Venetian window (also known as a central window, a large frame or a triple fenestra) was used by artists in the 16th and 17th centuries';

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
              {
                groupType: 'article',
                words: [
                  'a',
                  'large',
                  'frame',
                ],
              },
              {
                groupType: 'article',
                words: [
                  'a',
                  'triple',
                  'fenestra',
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
          maxYear: 1700,
          minYear: 1501,
        },
      },
    ]]);
  });

  it('finds an alternative name, at the beginning, with commas', () => {
    const words = 'Mount Etna, a volcano, is surrounded by highlands';

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
                  'volcano',
                ],
              },
            ],
            groupType: 'article',
            words: [
              'Mount',
              'Etna',
            ],
          },
        ],
        subject: [
          'highlands',
        ],
        verb: 'surround',
      },
    ]]);
  });

  it('finds an alternative name, at the end, with a comma', () => {
    const words = 'They visited Mount Etna, an active stratovolcano in 2000';

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
                  'an',
                  'active',
                  'stratovolcano',
                ],
              },
            ],
            groupType: 'article',
            words: [
              'Mount',
              'Etna',
            ],
          },
        ],
        subject: [
          'They',
        ],
        verb: 'visited',
        when: {
          groupType: 'date',
          year: 2000,
        },
      },
    ]]);
  });

  it('converts "or simply"', () => {
    // eslint-disable-next-line max-len
    const words = 'The Māori language (also known as te reo Māori or simply Te Reo) is an official language in New Zealand as of 2000';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'an',
              'official',
              'language',
            ],
          },
        ],
        subject: [
          {
            alternativeNames: [
              {
                groupType: 'article',
                words: [
                  'te',
                  'reo',
                  'Māori',
                ],
              },
              {
                groupType: 'article',
                words: [
                  'Te',
                  'Reo',
                ],
              },
            ],
            groupType: 'article',
            words: [
              'the',
              'Māori',
              'language',
            ],
          },
        ],
        verb: 'is',
        when: {
          groupType: 'date',
          year: 2000,
        },
        where: {
          groupType: 'article',
          words: [
            'New',
            'Zealand',
          ],
        },
      },
    ]]);
  });

  it('converts "usually synonymous with"', () => {
    const words = 'Trichiales (usually synonymous with Trichiida) is an order of Myxomycetes';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              'Myxomycetes',
            ],
            subject: [
              {
                groupType: 'article',
                words: [
                  'an',
                  'order',
                ],
              },
            ],
            verb: 'of',
          },
        ],
        subject: [
          {
            alternativeNames: [
              'Trichiida',
            ],
            groupType: 'article',
            words: [
              'Trichiales',
            ],
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('finds an alternative name, at the beginning, with one comma', () => {
    const words = 'An indigenous language, te reo Māori is closely related to many Polynesian languages';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'closely',
        ],
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'quantity',
                item: {
                  groupType: 'article',
                  words: [
                    'Polynesian',
                    'languages',
                  ],
                },
                min: 3,
              },
            ],
            subject: [
              'related',
            ],
            verb: 'to',
          },
        ],
        subject: [
          {
            alternativeNames: [
              {
                groupType: 'article',
                words: [
                  'te',
                  'reo',
                  'Māori',
                ],
              },
            ],
            groupType: 'article',
            words: [
              'an',
              'indigenous',
              'language',
            ],
          },
        ],
        verb: 'is',
      },
    ]]);
  });
});
