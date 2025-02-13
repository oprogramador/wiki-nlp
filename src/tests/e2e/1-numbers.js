const flow = require('../../flow');
const splitText = require('../../splitText');
const expect = require('../expect');

describe('numbers (e2e)', () => {
  it('converts from a word', () => {
    const words = 'Alan has five apples';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'apples',
            value: 5,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts from digits', () => {
    const words = 'Alan has 5 apples';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'apples',
            value: 5,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts from a word at the beginning', () => {
    const words = 'Four cats are owned by Alan';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'cats',
            value: 4,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'own',
      },
    ]]);
  });

  it('converts with over', () => {
    const words = 'Alan has over 50 apples';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'apples',
            min: 50,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts with around', () => {
    const words = 'Alan has around 50 apples';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            isExact: false,
            item: 'apples',
            value: 50,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts "an estimated"', () => {
    const words = 'An estimated 3 million Nigerians migrated';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        subject: [
          {
            groupType: 'quantity',
            isExact: false,
            item: 'Nigerians',
            value: 3e6,
          },
        ],
        verb: 'migrated',
      },
    ]]);
  });

  it('converts with "Approximately" (uppercase)', () => {
    const words = 'Approximately three apples are from imports';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'from',
          'imports',
        ],
        subject: [
          {
            groupType: 'quantity',
            isExact: false,
            item: 'apples',
            value: 3,
          },
        ],
        verb: 'are',
      },
    ]]);
  });

  it('converts with a dot', () => {
    const words = 'Alan has 1.234 apples';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'apples',
            value: 1.234,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts with a comma', () => {
    const words = 'Alan has 1,234 apples';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'apples',
            value: 1234,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts with two commas', () => {
    const words = 'Alan has 1,234,567 apples';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'apples',
            value: 1234567,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts with %', () => {
    const words = 'Unemployment is 5%';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'share',
            value: 0.05,
          },
        ],
        subject: [
          'Unemployment',
        ],
        verb: 'is',
      },
    ]]);
  });

  it('converts with per cent', () => {
    const words = 'Unemployment is 7 per cent';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'share',
            value: 0.07,
          },
        ],
        subject: [
          'Unemployment',
        ],
        verb: 'is',
      },
    ]]);
  });

  it('converts with percent', () => {
    const words = 'Unemployment is 8 percent';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'share',
            value: 0.08,
          },
        ],
        subject: [
          'Unemployment',
        ],
        verb: 'is',
      },
    ]]);
  });

  it('converts "most of" at the beginning', () => {
    const words = 'Most of the casualties were the result of the tsunami in 2000';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'article',
                words: [
                  'the',
                  'tsunami',
                ],
              },
            ],
            subject: [
              {
                groupType: 'article',
                words: [
                  'the',
                  'result',
                ],
              },
            ],
            verb: 'of',
          },
        ],
        subject: [
          {
            groupType: 'share',
            item: {
              groupType: 'article',
              words: [
                'the',
                'casualties',
              ],
            },
            min: 0.5,
          },
        ],
        verb: 'were',
        when: {
          groupType: 'date',
          year: 2000,
        },
      },
    ]]);
  });

  it.skip('converts "most of" with AND followed by a preposition', () => {
    const words = 'They have visited most of Europe, and parts of Asia';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
    ]]);
  });

  it('converts with percent of', () => {
    const words = 'The spending is 28 percent of GDP';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'share',
            item: 'GDP',
            value: 0.28,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'spending',
            ],
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('converts with million', () => {
    const words = 'Alan has 3 million apples';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'apples',
            value: 3e6,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts with a million', () => {
    const words = 'Alan has a million apples';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'apples',
            value: 1e6,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts with billion', () => {
    const words = 'Alan has 3.5 billion apples';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'apples',
            value: 3.5e9,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts "hundreds of billions of"', () => {
    const words = 'The government spends hundreds of billions of dollars';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'dollars',
            min: 1e11,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'government',
            ],
          },
        ],
        verb: 'spends',
      },
    ]]);
  });

  it('converts "billions of"', () => {
    const words = 'Billions of people are hungry';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'hungry',
        ],
        subject: [
          {
            groupType: 'quantity',
            item: 'people',
            min: 1e9,
          },
        ],
        verb: 'are',
      },
    ]]);
  });

  it('converts "hundreds of millions of"', () => {
    const words = 'Hundreds of millions of people are hungry';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'hungry',
        ],
        subject: [
          {
            groupType: 'quantity',
            item: 'people',
            min: 1e8,
          },
        ],
        verb: 'are',
      },
    ]]);
  });

  it('converts "millions of"', () => {
    const words = 'Millions of people are hungry';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'hungry',
        ],
        subject: [
          {
            groupType: 'quantity',
            item: 'people',
            min: 1e6,
          },
        ],
        verb: 'are',
      },
    ]]);
  });

  it('converts "many hundreds of thousands of"', () => {
    const words = 'Many hundreds of thousands of people are hungry';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'hungry',
        ],
        subject: [
          {
            groupType: 'quantity',
            item: 'people',
            min: 1e5,
          },
        ],
        verb: 'are',
      },
    ]]);
  });

  it('converts "hundreds of thousands of"', () => {
    const words = 'Hundreds of thousands of people are hungry';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'hungry',
        ],
        subject: [
          {
            groupType: 'quantity',
            item: 'people',
            min: 1e5,
          },
        ],
        verb: 'are',
      },
    ]]);
  });

  it('converts "thousands of"', () => {
    const words = 'Thousands of people are hungry';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'hungry',
        ],
        subject: [
          {
            groupType: 'quantity',
            item: 'people',
            min: 1e3,
          },
        ],
        verb: 'are',
      },
    ]]);
  });

  it('converts "hundreds of"', () => {
    const words = 'Hundreds of people are hungry';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'hungry',
        ],
        subject: [
          {
            groupType: 'quantity',
            item: 'people',
            min: 100,
          },
        ],
        verb: 'are',
      },
    ]]);
  });

  it('converts "dozens of"', () => {
    const words = 'Dozens of people are hungry';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'hungry',
        ],
        subject: [
          {
            groupType: 'quantity',
            item: 'people',
            min: 10,
          },
        ],
        verb: 'are',
      },
    ]]);
  });

  it('converts with trillion', () => {
    const words = 'Alan has 3.45 trillion apples';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'apples',
            value: 3.45e12,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts with euro', () => {
    const words = 'Alan has €12.34';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            currency: 'EUR',
            groupType: 'currency',
            value: 12.34,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts with euro and about', () => {
    const words = 'Alan has about €12.34';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            currency: 'EUR',
            groupType: 'currency',
            isExact: false,
            value: 12.34,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts with euro and above', () => {
    const words = 'Alan has above €12.34';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            currency: 'EUR',
            groupType: 'currency',
            min: 12.34,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts with euro and million', () => {
    const words = 'Alan has €12.34 million';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            currency: 'EUR',
            groupType: 'currency',
            value: 12.34e6,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts with euro, about, and billion', () => {
    const words = 'Alan has about €12 billion';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            currency: 'EUR',
            groupType: 'currency',
            isExact: false,
            value: 12e9,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts with euro, about, and bn', () => {
    const words = 'Alan has about €12bn';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            currency: 'EUR',
            groupType: 'currency',
            isExact: false,
            value: 12e9,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts with euro, and bn', () => {
    const words = 'Alan has €14bn';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            currency: 'EUR',
            groupType: 'currency',
            value: 14e9,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts with euro, above, and trillion', () => {
    const words = 'Alan has above €12 trillion';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            currency: 'EUR',
            groupType: 'currency',
            min: 12e12,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts with and', () => {
    const words = 'Alan has over 200 apples, and oranges';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: {
              groupType: 'and',
              members: [
                'apples',
                'oranges',
              ],
            },
            min: 200,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts with several', () => {
    const words = 'Alan has several red apples';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: {
              groupType: 'article',
              words: [
                'red',
                'apples',
              ],
            },
            max: 99,
            min: 3,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts with many, uppercase', () => {
    const words = 'Many apples are red';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'red',
        ],
        subject: [
          {
            groupType: 'quantity',
            item: 'apples',
            min: 3,
          },
        ],
        verb: 'are',
      },
    ]]);
  });

  it('converts with an adjective after uppercase', () => {
    const words = 'There are 123 million EU citizens';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: {
              groupType: 'article',
              words: [
                'EU',
                'citizens',
              ],
            },
            value: 123e6,
          },
        ],
        subject: [
          'There',
        ],
        verb: 'are',
      },
    ]]);
  });

  it('converts for % followed by "of"', () => {
    const words = 'It has 7% of the world population in 2020';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'share',
            item: {
              groupType: 'article',
              words: [
                'the',
                'world',
                'population',
              ],
            },
            value: 0.07,
          },
        ],
        subject: [
          'It',
        ],
        verb: 'has',
        when: {
          groupType: 'date',
          year: 2020,
        },
      },
    ]]);
  });

  it('converts ranges with large numbers', () => {
    const words = 'It has 3–4 million inhabitants';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'inhabitants',
            max: 4e6,
            min: 3e6,
          },
        ],
        subject: [
          'It',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts ranges', () => {
    const words = 'They have 30,000–40,000 applications with 1,500–1,700 candidates';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'quantity',
                item: 'candidates',
                max: 1700,
                min: 1500,
              },
            ],
            subject: [
              {
                groupType: 'quantity',
                item: 'applications',
                max: 4e4,
                min: 3e4,
              },
            ],
            verb: 'with',
          },
        ],
        subject: [
          'They',
        ],
        verb: 'have',
      },
    ]]);
  });

  it('converts with AND of shares', () => {
    // eslint-disable-next-line max-len
    const words = 'In 2010, EU countries imported 60 per cent of their gold demands, 75 percent of their silver demands, and 80% of their iron demands';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'and',
            members: [
              {
                groupType: 'share',
                item: {
                  groupType: 'article',
                  words: [
                    'their',
                    'gold',
                    'demands',
                  ],
                },
                value: 0.6,
              },
              {
                groupType: 'share',
                item: {
                  groupType: 'article',
                  words: [
                    'their',
                    'silver',
                    'demands',
                  ],
                },
                value: 0.75,
              },
              {
                groupType: 'share',
                item: {
                  groupType: 'article',
                  words: [
                    'their',
                    'iron',
                    'demands',
                  ],
                },
                value: 0.8,
              },
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'EU',
              'countries',
            ],
          },
        ],
        verb: 'imported',
        when: {
          groupType: 'date',
          year: 2010,
        },
      },
    ]]);
  });

  it('converts km2', () => {
    const words = 'The area is 1,234 km2';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'unit',
            unit: 'm2',
            value: 1.234e9,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'area',
            ],
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('converts square kilometers', () => {
    const words = 'They cover an area of 2,345 square kilometers';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'unit',
                unit: 'm2',
                value: 2.345e9,
              },
            ],
            subject: [
              {
                groupType: 'article',
                words: [
                  'an',
                  'area',
                ],
              },
            ],
            verb: 'of',
          },
        ],
        subject: [
          'They',
        ],
        verb: 'cover',
      },
    ]]);
  });

  it('skips unit in brackets', () => {
    const words = 'They cover an area of 3,456 square kilometres (1,334 sq mi)';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'unit',
                unit: 'm2',
                value: 3.456e9,
              },
            ],
            subject: [
              {
                groupType: 'article',
                words: [
                  'an',
                  'area',
                ],
              },
            ],
            verb: 'of',
          },
        ],
        subject: [
          'They',
        ],
        verb: 'cover',
      },
    ]]);
  });

  it('converts numbered', () => {
    const words = 'Article 27 of the Treaty recognises the status';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'status',
            ],
          },
        ],
        subject: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'article',
                words: [
                  'the',
                  'Treaty',
                ],
              },
            ],
            subject: [
              {
                groupType: 'numbered',
                item: 'Article',
                number: 27,
              },
            ],
            verb: 'of',
          },
        ],
        verb: 'recognises',
      },
    ]]);
  });

  it('converts a fraction with 1 as the numerator', () => {
    const words = 'They have approximately one fifth of global nominal GDP';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'share',
            isExact: false,
            item: {
              groupType: 'article',
              words: [
                'global',
                'nominal',
                'GDP',
              ],
            },
            value: 0.2,
          },
        ],
        subject: [
          'They',
        ],
        verb: 'have',
      },
    ]]);
  });

  it('converts a fraction with "half"', () => {
    const words = 'They had one half of the GDP';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'share',
            item: {
              groupType: 'article',
              words: [
                'the',
                'GDP',
              ],
            },
            value: 0.5,
          },
        ],
        subject: [
          'They',
        ],
        verb: 'had',
      },
    ]]);
  });

  it('converts "half the"', () => {
    const words = 'More than half the population is young in Egypt';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'young',
        ],
        subject: [
          {
            groupType: 'share',
            item: {
              groupType: 'article',
              words: [
                'the',
                'population',
              ],
            },
            min: 0.5,
          },
        ],
        verb: 'is',
        where: 'Egypt',
      },
    ]]);
  });

  it('converts a fraction with "one quarter"', () => {
    const words = 'One quarter of the GDP was generated by the primary sector in the 1990s';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'share',
            item: {
              groupType: 'article',
              words: [
                'the',
                'GDP',
              ],
            },
            value: 0.25,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'primary',
              'sector',
            ],
          },
        ],
        verb: 'generate',
        when: {
          groupType: 'date',
          maxYear: 1999,
          minYear: 1990,
        },
      },
    ]]);
  });

  it('converts a fraction with "quarters"', () => {
    const words = 'They had three quarters of the GDP';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'share',
            item: {
              groupType: 'article',
              words: [
                'the',
                'GDP',
              ],
            },
            value: 0.75,
          },
        ],
        subject: [
          'They',
        ],
        verb: 'had',
      },
    ]]);
  });

  it('converts a fraction with "ies"', () => {
    const words = 'They had three twenties of the GDP';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'share',
            item: {
              groupType: 'article',
              words: [
                'the',
                'GDP',
              ],
            },
            value: 0.15,
          },
        ],
        subject: [
          'They',
        ],
        verb: 'had',
      },
    ]]);
  });

  it('converts a fraction with 2 as the numerator', () => {
    const words = 'They have around two fifths of global population';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'share',
            isExact: false,
            item: {
              groupType: 'article',
              words: [
                'global',
                'population',
              ],
            },
            value: 0.4,
          },
        ],
        subject: [
          'They',
        ],
        verb: 'have',
      },
    ]]);
  });

  it('does not convert a fraction without a numerator', () => {
    const words = 'The anthem is the ninth symphony';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'ninth',
              'symphony',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'anthem',
            ],
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('converts a currency with a country code', () => {
    const words = 'EFTA member states generated a GDP of around US$1.7 trillion';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              {
                currency: 'USD',
                groupType: 'currency',
                isExact: false,
                value: 1.7e12,
              },
            ],
            subject: [
              {
                groupType: 'article',
                words: [
                  'a',
                  'GDP',
                ],
              },
            ],
            verb: 'of',
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'EFTA',
              'member',
              'states',
            ],
          },
        ],
        verb: 'generated',
      },
    ]]);
  });

  it('converts USD inside a bracket', () => {
    const words = 'The USA has the largest GDP (US$25 trillion)';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            basic: {
              groupType: 'article',
              words: [
                'the',
                'largest',
                'GDP',
              ],
            },
            extra: [
              {
                currency: 'USD',
                groupType: 'currency',
                value: 2.5e13,
              },
            ],
            groupType: 'extra',
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'USA',
            ],
          },
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts a growth with dates', () => {
    const words = 'The trade surplus rose from $123 billion in 2000 to more than $246 billion in 2010';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        endValue: {
          currency: 'USD',
          groupType: 'currency',
          min: 2.46e11,
        },
        groupType: 'verb',
        initialValue: {
          currency: 'USD',
          groupType: 'currency',
          value: 1.23e11,
        },
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'trade',
              'surplus',
            ],
          },
        ],
        verb: 'rose',
        whenEndValue: {
          groupType: 'quantity',
          value: 2010,
        },
        whenInitialValue: {
          groupType: 'quantity',
          value: 2000,
        },
      },
    ]]);
  });

  it('converts a growth', () => {
    const words = 'The trade surplus rose from $12 billion to 15 billion';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        endValue: {
          groupType: 'quantity',
          value: 1.5e10,
        },
        groupType: 'verb',
        initialValue: {
          currency: 'USD',
          groupType: 'currency',
          value: 1.2e10,
        },
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'trade',
              'surplus',
            ],
          },
        ],
        verb: 'rose',
      },
    ]]);
  });

  it('converts a growth with brackets', () => {
    const words = 'The ratio ranged from 60 per cent (Barcelona) to 270 per cent (Luxembourg)';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        endValue: {
          basic: {
            groupType: 'share',
            value: 2.7,
          },
          extra: [
            'Luxembourg',
          ],
          groupType: 'extra',
        },
        groupType: 'verb',
        initialValue: {
          basic: {
            groupType: 'share',
            value: 0.6,
          },
          extra: [
            'Barcelona',
          ],
          groupType: 'extra',
        },
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'ratio',
            ],
          },
        ],
        verb: 'ranged',
      },
    ]]);
  });

  it.skip('converts a growth with brackets and another preposition inside', () => {
    // eslint-disable-next-line max-len
    const words = 'The ratio ranged from 60 per cent (Barcelona) of the EU28 average (€40,000) to 270 per cent (Luxembourg)';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
    ]]);
  });

  it('converts "handful"', () => {
    const words = 'He knows a handful of languages';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'languages',
            max: 5,
            min: 1,
          },
        ],
        subject: [
          'He',
        ],
        verb: 'knows',
      },
    ]]);
  });

  it('converts "a number of" preceded by "in"', () => {
    const words = 'they act in a number of areas';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'in',
          {
            groupType: 'quantity',
            item: 'areas',
            min: 3,
          },
        ],
        subject: [
          'they',
        ],
        verb: 'act',
      },
    ]]);
  });

  it('converts a pre-numbered item', () => {
    const words = 'That street is named after the 1925 Paris Agreement';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'prenumbered',
                item: {
                  groupType: 'article',
                  words: [
                    'Paris',
                    'Agreement',
                  ],
                },
                number: 1925,
              },
            ],
            subject: [
              'named',
            ],
            verb: 'after',
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'That',
              'street',
            ],
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('does not convert prenumbered when the second word is lowercase', () => {
    const words = 'In 2023, the agrement was signed by leaders of the 27 EU member states';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'agrement',
            ],
          },
        ],
        subject: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'quantity',
                item: {
                  groupType: 'article',
                  words: [
                    'EU',
                    'member',
                    'states',
                  ],
                },
                value: 27,
              },
            ],
            subject: [
              'leaders',
            ],
            verb: 'of',
          },
        ],
        verb: 'sign',
        when: {
          groupType: 'date',
          year: 2023,
        },
      },
    ]]);
  });

  it('skips "the" before a number', () => {
    const words = 'On 13 August 1954, the three countries accepted the rules';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'rules',
            ],
          },
        ],
        subject: [
          {
            groupType: 'quantity',
            item: 'countries',
            value: 3,
          },
        ],
        verb: 'accepted',
        when: {
          day: 13,
          groupType: 'date',
          month: 8,
          year: 1954,
        },
      },
    ]]);
  });

  it('skips "The" before a number', () => {
    const words = 'The two largest suppliers are Russia and Norway';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'and',
            members: [
              'Russia',
              'Norway',
            ],
          },
        ],
        subject: [
          {
            groupType: 'quantity',
            item: {
              groupType: 'article',
              words: [
                'largest',
                'suppliers',
              ],
            },
            value: 2,
          },
        ],
        verb: 'are',
      },
    ]]);
  });

  it('converts an ordinal - second', () => {
    const words = 'India was the second-largest textile exporter in the 2003 calendar year';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            adjective: 'largest',
            groupType: 'ordinal',
            item: [
              'textile',
              'exporter',
            ],
            ordinal: 2,
          },
        ],
        subject: [
          'India',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          year: 2003,
        },
      },
    ]]);
  });

  it('converts an ordinal - third', () => {
    const words = 'In 2005, Japan was the third-largest fish exporter';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            adjective: 'largest',
            groupType: 'ordinal',
            item: [
              'fish',
              'exporter',
            ],
            ordinal: 3,
          },
        ],
        subject: [
          'Japan',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          year: 2005,
        },
      },
    ]]);
  });

  it('converts "out of" with an ordinal', () => {
    const words = 'Armenia was ranked 142nd out of 190 countries';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'ranked',
          {
            groupType: 'outOf',
            item: 'countries',
            maxScope: 190,
            number: 142,
          },
        ],
        subject: [
          'Armenia',
        ],
        verb: 'was',
      },
    ]]);
  });

  it('converts "out of" with a number', () => {
    const words = 'Armenia is ranked 100 out of 190 countries';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'ranked',
          {
            groupType: 'outOf',
            item: 'countries',
            maxScope: 190,
            number: 100,
          },
        ],
        subject: [
          'Armenia',
        ],
        verb: 'is',
      },
    ]]);
  });

  it('converts "out of" as an only part of the object', () => {
    const words = 'The party won 49 out of 300 seats';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'outOf',
            item: 'seats',
            maxScope: 300,
            number: 49,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'party',
            ],
          },
        ],
        verb: 'won',
      },
    ]]);
  });

  it('converts "out of" with an item after the first number', () => {
    const words = '35 dogs out of 100 walked';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        subject: [
          {
            groupType: 'outOf',
            item: 'dogs',
            maxScope: 100,
            number: 35,
          },
        ],
        verb: 'walked',
      },
    ]]);
  });

  it('converts "out of" with an item and bracket', () => {
    const words = '45 dogs (out of 100) walked';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        subject: [
          {
            groupType: 'outOf',
            item: 'dogs',
            maxScope: 100,
            number: 45,
          },
        ],
        verb: 'walked',
      },
    ]]);
  });

  it('converts "out of" with bracket but no item', () => {
    const words = 'They scored 19 (out of twenty)';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'outOf',
            maxScope: 20,
            number: 19,
          },
        ],
        subject: [
          'They',
        ],
        verb: 'scored',
      },
    ]]);
  });

  it('converts "out of" with currency', () => {
    const words = 'They risked only $15,000 (out of $100,000)';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'outOf',
            item: {
              currency: 'USD',
              groupType: 'currency',
            },
            maxScope: 1e5,
            number: 15e3,
          },
        ],
        subject: [
          'They',
        ],
        verb: 'risked',
      },
    ]]);
  });

  it('converts "out of" with a range', () => {
    const words = 'It occurs in 40–70 out of 100,000 live births';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'in',
          {
            groupType: 'outOf',
            item: {
              groupType: 'article',
              words: [
                'live',
                'births',
              ],
            },
            max: 70,
            maxScope: 1e5,
            min: 40,
          },
        ],
        subject: [
          'It',
        ],
        verb: 'occurs',
      },
    ]]);
  });

  it('converts "out of" with a range defined with "to"', () => {
    const words = 'It occurs in about 50 to 60 out of 1000 live births';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'in',
          {
            groupType: 'outOf',
            isExact: false,
            item: {
              groupType: 'article',
              words: [
                'live',
                'births',
              ],
            },
            max: 60,
            maxScope: 1000,
            min: 50,
          },
        ],
        subject: [
          'It',
        ],
        verb: 'occurs',
      },
    ]]);
  });

  it('converts "out of" with a range defined with "or"', () => {
    const words = 'Only four or five out of 100 such trees will have mushrooms';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'have',
          'mushrooms',
        ],
        subject: [
          {
            groupType: 'outOf',
            item: {
              groupType: 'article',
              words: [
                'such',
                'trees',
              ],
            },
            max: 5,
            maxScope: 100,
            min: 4,
          },
        ],
        verb: 'will',
      },
    ]]);
  });

  it('converts "out of" with "around"', () => {
    const words = 'Around 1 out of 100,000 is excellent';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'excellent',
        ],
        subject: [
          {
            groupType: 'outOf',
            isExact: false,
            maxScope: 1e5,
            number: 1,
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it.skip('converts "out of" with no item after an ordinal', () => {
    const words = 'They were 3rd (out of 10)';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
    ]]);
  });

  it('converts "out of" with an item inside bracket', () => {
    const words = 'They scored 789 (out of 1000 points)';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'outOf',
            item: 'points',
            maxScope: 1000,
            number: 789,
          },
        ],
        subject: [
          'They',
        ],
        verb: 'scored',
      },
    ]]);
  });

  it('converts "out of" at the beginning, with word numbers', () => {
    const words = 'Five out of twelve customers have lost electricity';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'lost',
              'electricity',
            ],
          },
        ],
        subject: [
          {
            groupType: 'outOf',
            item: 'customers',
            maxScope: 12,
            number: 5,
          },
        ],
        verb: 'have',
      },
    ]]);
  });

  it('converts "out of" at the beginning, with partially word numbers', () => {
    const words = '5 out of eleven customers have lost electricity';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'lost',
              'electricity',
            ],
          },
        ],
        subject: [
          {
            groupType: 'outOf',
            item: 'customers',
            maxScope: 11,
            number: 5,
          },
        ],
        verb: 'have',
      },
    ]]);
  });

  it('converts "out of" at the beginning, with a non-integer', () => {
    const words = '123.5 out of 1000 children are poor';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'poor',
        ],
        subject: [
          {
            groupType: 'outOf',
            item: 'children',
            maxScope: 1000,
            number: 123.5,
          },
        ],
        verb: 'are',
      },
    ]]);
  });

  it('converts "out of" with nothing before, and a comma before the number', () => {
    const words = 'Out of 123 villages, 67 were bombed';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'bombed',
        ],
        subject: [
          {
            groupType: 'outOf',
            item: 'villages',
            maxScope: 123,
            number: 67,
          },
        ],
        verb: 'were',
      },
    ]]);
  });

  it('converts "out of" with nothing before, and a preposition', () => {
    const words = 'Out of 123 villages in Japan, 67 were bombed';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'bombed',
        ],
        subject: [
          {
            groupType: 'outOf',
            item: 'villages',
            maxScope: 123,
            number: 67,
            place: 'Japan',
          },
        ],
        verb: 'were',
      },
    ]]);
  });

  it('converts "out of" with a range, after a comma', () => {
    const words = 'Out of 123 villages, 67–100 were bombed';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'bombed',
        ],
        subject: [
          {
            groupType: 'outOf',
            item: 'villages',
            max: 100,
            maxScope: 123,
            min: 67,
          },
        ],
        verb: 'were',
      },
    ]]);
  });

  it('converts "out of" with a range scope with scope first', () => {
    const words = 'Out of 100–120 villages, ten were bombed';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'bombed',
        ],
        subject: [
          {
            groupType: 'outOf',
            item: 'villages',
            maxScope: 120,
            maxScopeDetails: {
              groupType: 'quantity',
              item: 'villages',
              max: 120,
              min: 100,
            },
            number: 10,
          },
        ],
        verb: 'were',
      },
    ]]);
  });

  it('converts "out of" with a range scope with scope later', () => {
    const words = 'Sixty out of 200–300 villages were bombed';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'bombed',
        ],
        subject: [
          {
            groupType: 'outOf',
            item: 'villages',
            maxScope: 300,
            maxScopeDetails: {
              groupType: 'quantity',
              item: 'villages',
              max: 300,
              min: 200,
            },
            number: 60,
          },
        ],
        verb: 'were',
      },
    ]]);
  });

  it.skip('converts "out of" with "between [...] and" followed by a comma', () => {
    const words = 'Their group numbered between 350,000 and 420,000 people, out of a population of 2 million';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
    ]]);
  });

  it('converts "out of a population of"', () => {
    const words = 'Out of a population of 2 million, only 500,000 people have stayed in Kharkiv';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'stayed',
        ],
        subject: [
          {
            groupType: 'outOf',
            item: 'people',
            maxScope: 2e6,
            number: 5e5,
          },
        ],
        verb: 'have',
        where: 'Kharkiv',
      },
    ]]);
  });

  it('splits ", and it"', () => {
    const words = 'The famine started in 1903, and it ended in 1910';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([
      [
        {
          groupType: 'verb',
          object: [],
          subject: [
            {
              groupType: 'article',
              words: [
                'the',
                'famine',
              ],
            },
          ],
          verb: 'started',
          when: {
            groupType: 'date',
            year: 1903,
          },
        },
      ],
      [
        {
          groupType: 'verb',
          object: [],
          subject: [
            {
              groupType: 'article',
              words: [
                'the',
                'famine',
              ],
            },
          ],
          verb: 'ended',
          when: {
            groupType: 'date',
            year: 1910,
          },
        },
      ],
    ]);
  });

  it('converts "as of" & ", out of a population of"', () => {
    const words = 'As of 2010, Bangkok had over 1.7 million squatters, out of a population of approximately 9 million';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'outOf',
            item: 'squatters',
            maxScope: 9e6,
            maxScopeDetails: {
              groupType: 'quantity',
              isExact: false,
              value: 9e6,
            },
            min: 1.7e6,
          },
        ],
        subject: [
          'Bangkok',
        ],
        verb: 'had',
        when: {
          groupType: 'date',
          year: 2010,
        },
      },
    ]]);
  });

  it('splits "and it"', () => {
    // eslint-disable-next-line max-len
    const words = 'The famine affected an estimated 123,000 people out of a population of 1.1 million and it shocked the society';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'outOf',
            isExact: false,
            item: 'people',
            maxScope: 11e5,
            number: 123e3,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'famine',
            ],
          },
        ],
        verb: 'affected',
      },
    ],
    [
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'society',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'famine',
            ],
          },
        ],
        verb: 'shocked',
      },
    ]]);
  });

  it('converts "out of" with "as many as" & "little more than"', () => {
    const words = 'Famine killed as many as 3 million Egyptians out of a population of little more than 13 million';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'outOf',
            item: 'Egyptians',
            maxScope: 13e6,
            maxScopeDetails: {
              groupType: 'quantity',
              min: 13e6,
            },
            number: 3e6,
          },
        ],
        subject: [
          'Famine',
        ],
        verb: 'killed',
      },
    ]]);
  });

  it('converts "out of" with "no more than"', () => {
    const words = 'Famine killed 3 million Egyptians out of a population of no more than 13 million';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'outOf',
            item: 'Egyptians',
            maxScope: 13e6,
            maxScopeDetails: {
              groupType: 'quantity',
              max: 13e6,
            },
            number: 3e6,
          },
        ],
        subject: [
          'Famine',
        ],
        verb: 'killed',
      },
    ]]);
  });

  it('converts "out of" with non-exact max scope', () => {
    const words = 'Famine killed 3 million Egyptians out of a population of around 13 million';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'outOf',
            item: 'Egyptians',
            maxScope: 13e6,
            maxScopeDetails: {
              groupType: 'quantity',
              isExact: false,
              value: 13e6,
            },
            number: 3e6,
          },
        ],
        subject: [
          'Famine',
        ],
        verb: 'killed',
      },
    ]]);
  });

  it('converts "out of" with nothing before', () => {
    const words = 'Out of 10,000 female individuals 19 are homeless in San Diego, California';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'homeless',
        ],
        subject: [
          {
            groupType: 'outOf',
            item: {
              groupType: 'article',
              words: [
                'female',
                'individuals',
              ],
            },
            maxScope: 1e4,
            number: 19,
          },
        ],
        verb: 'are',
        where: {
          general: 'California',
          groupType: 'locality',
          precise: {
            groupType: 'article',
            words: [
              'San',
              'Diego',
            ],
          },
        },
      },
    ]]);
  });

  it('converts an ordinal with "after" and one word', () => {
    const words = 'India was the second-largest textile exporter after China in 2004';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            adjective: 'largest',
            groupType: 'ordinal',
            higher: 'China',
            item: [
              'textile',
              'exporter',
            ],
            ordinal: 2,
          },
        ],
        subject: [
          'India',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          year: 2004,
        },
      },
    ]]);
  });

  it('converts an ordinal with "after" and many words', () => {
    const words = 'India was the second-largest services exporter after the United States in 2014';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            adjective: 'largest',
            groupType: 'ordinal',
            higher: {
              groupType: 'article',
              words: [
                'the',
                'United',
                'States',
              ],
            },
            item: [
              'services',
              'exporter',
            ],
            ordinal: 2,
          },
        ],
        subject: [
          'India',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          year: 2014,
        },
      },
    ]]);
  });

  it('converts an ordinal with "after" followed by AND with 2 items', () => {
    const words = 'Japan was the third-largest car exporter after Germany and China in 2000';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            adjective: 'largest',
            groupType: 'ordinal',
            higher: {
              groupType: 'and',
              members: [
                'Germany',
                'China',
              ],
            },
            item: [
              'car',
              'exporter',
            ],
            ordinal: 3,
          },
        ],
        subject: [
          'Japan',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          year: 2000,
        },
      },
    ]]);
  });

  it('converts an ordinal with "after" followed by AND with many items', () => {
    // eslint-disable-next-line max-len
    const words = 'South Korea was the sixth-largest car exporter after Germany, China, Japan, Mexico and United States in 1990';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            adjective: 'largest',
            groupType: 'ordinal',
            higher: {
              groupType: 'and',
              members: [
                'Germany',
                'China',
                'Japan',
                'Mexico',
                {
                  groupType: 'article',
                  words: [
                    'United',
                    'States',
                  ],
                },
              ],
            },
            item: [
              'car',
              'exporter',
            ],
            ordinal: 6,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'South',
              'Korea',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          year: 1990,
        },
      },
    ]]);
  });

  it('converts an ordinal with scope', () => {
    const words = 'Indonesia has the world\'s fourth-largest population';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            adjective: 'largest',
            groupType: 'ordinal',
            item: [
              'population',
            ],
            ordinal: 4,
            scope: 'world',
          },
        ],
        subject: [
          'Indonesia',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts AND of ordinals', () => {
    // eslint-disable-next-line max-len
    const words = 'In 2010, Brazil was the first-fastest producer, the ninth-largest importer and the eighth-largest exporter';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'and',
            members: [
              {
                adjective: 'fastest',
                groupType: 'ordinal',
                item: [
                  'producer',
                ],
                ordinal: 1,
              },
              {
                adjective: 'largest',
                groupType: 'ordinal',
                item: [
                  'importer',
                ],
                ordinal: 9,
              },
              {
                adjective: 'largest',
                groupType: 'ordinal',
                item: [
                  'exporter',
                ],
                ordinal: 8,
              },
            ],
          },
        ],
        subject: [
          'Brazil',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          year: 2010,
        },
      },
    ]]);
  });

  it('converts an ordinal with "by"', () => {
    const words = 'Saudi Arabia is the twelfth-largest country by area';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            adjective: 'largest',
            by: 'area',
            groupType: 'ordinal',
            item: [
              'country',
            ],
            ordinal: 12,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Saudi',
              'Arabia',
            ],
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('converts a mixed ordinal with scope defined after "in"', () => {
    const words = 'Egypt is the 3rd-largest country in Africa by population';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            adjective: 'largest',
            by: 'population',
            groupType: 'ordinal',
            item: [
              'country',
            ],
            ordinal: 3,
            scope: 'Africa',
          },
        ],
        subject: [
          'Egypt',
        ],
        verb: 'is',
      },
    ]]);
  });

  it('converts a mixed ordinal', () => {
    const words = 'Egypt is the world\'s 14th-largest country by population';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            adjective: 'largest',
            by: 'population',
            groupType: 'ordinal',
            item: [
              'country',
            ],
            ordinal: 14,
            scope: 'world',
          },
        ],
        subject: [
          'Egypt',
        ],
        verb: 'is',
      },
    ]]);
  });

  it('skips "only" before a number', () => {
    const words = 'The government officially recognises only four religions';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: ['officially'],
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'religions',
            value: 4,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'government',
            ],
          },
        ],
        verb: 'recognises',
      },
    ]]);
  });

  it('converts an example (with a colon)', () => {
    const words = 'The government officially recognises four religions: Islam, Hinduism, Buddhism, and Confucianism';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: ['officially'],
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: {
              example: {
                groupType: 'and',
                members: [
                  'Islam',
                  'Hinduism',
                  'Buddhism',
                  'Confucianism',
                ],
              },
              general: 'religions',
              groupType: 'example',
            },
            value: 4,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'government',
            ],
          },
        ],
        verb: 'recognises',
      },
    ]]);
  });

  it('does not create a date for "by" followed by a number with an item', () => {
    const words = 'Catalan literature was composed by 777 poets';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'Catalan',
              'literature',
            ],
          },
        ],
        subject: [
          {
            groupType: 'quantity',
            item: 'poets',
            value: 777,
          },
        ],
        verb: 'compose',
      },
    ]]);
  });

  it('converts "or more"', () => {
    const words = 'They have five or more dogs';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'dogs',
            min: 5,
          },
        ],
        subject: [
          'They',
        ],
        verb: 'have',
      },
    ]]);
  });

  it('converts AND of items with numbers', () => {
    const words = 'They have five dogs and four cats';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'and',
            members: [
              {
                groupType: 'quantity',
                item: 'dogs',
                value: 5,
              },
              {
                groupType: 'quantity',
                item: 'cats',
                value: 4,
              },
            ],
          },
        ],
        subject: [
          'They',
        ],
        verb: 'have',
      },
    ]]);
  });

  it('converts AND with numbers & adjectives', () => {
    const words = 'Bob has about 20 black dogs and above 10 white cats';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'and',
            members: [
              {
                groupType: 'quantity',
                isExact: false,
                item: {
                  groupType: 'article',
                  words: [
                    'black',
                    'dogs',
                  ],
                },
                value: 20,
              },
              {
                groupType: 'quantity',
                item: {
                  groupType: 'article',
                  words: [
                    'white',
                    'cats',
                  ],
                },
                min: 10,
              },
            ],
          },
        ],
        subject: [
          'Bob',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts a single number followed by AND with adjectives', () => {
    const words = 'Bob has about 20 black dogs and white cats';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            isExact: false,
            item: {
              groupType: 'and',
              members: [
                {
                  groupType: 'article',
                  words: [
                    'black',
                    'dogs',
                  ],
                },
                {
                  groupType: 'article',
                  words: [
                    'white',
                    'cats',
                  ],
                },
              ],
            },
            value: 20,
          },
        ],
        subject: [
          'Bob',
        ],
        verb: 'has',
      },
    ]]);
  });

  it.skip('converts with AND, and without visible plural', () => {
    const words = 'French casualties were 123 dead and 567 injured';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
    ]]);
  });

  it('converts "almost"', () => {
    const words = 'Almost 200 dogs are hungry';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'hungry',
        ],
        subject: [
          {
            groupType: 'quantity',
            item: 'dogs',
            max: 200,
          },
        ],
        verb: 'are',
      },
    ]]);
  });

  it('converts "while"', () => {
    const words = 'Alan has several dogs, while Bob has dozens of cats';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'dogs',
            max: 99,
            min: 3,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ],
    [
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'cats',
            min: 10,
          },
        ],
        subject: [
          'Bob',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts "up to", "a thousand", a quantity with OR, "vast majority"', () => {
    const words = 'Up to a thousand languages or dialects are spoken in the vast majority of African countries';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'share',
                item: {
                  groupType: 'article',
                  words: [
                    'African',
                    'countries',
                  ],
                },
                min: 0.6,
              },
            ],
            subject: [
              'spoken',
            ],
            verb: 'in',
          },
        ],
        subject: [
          {
            groupType: 'quantity',
            item: {
              groupType: 'or',
              members: [
                'languages',
                'dialects',
              ],
            },
            max: 1000,
          },
        ],
        verb: 'are',
      },
    ]]);
  });
});
