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
                max: 40000,
                min: 30000,
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

  it('converts with "beginning on" at the beginning, followed by day, month, year', () => {
    const words = 'Beginning on 23 March 2024, the position is held by myself';

    const result = flow(splitText(words), { now: new Date('2024-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'position',
            ],
          },
        ],
        subject: [
          'myself',
        ],
        verb: 'hold',
        when: {
          groupType: 'date',
          maxDay: 1,
          maxMonth: 7,
          maxYear: 2024,
          minDay: 23,
          minMonth: 3,
          minYear: 2024,
        },
      },
    ]]);
  });

  it('converts with "since" at the beginning, followed by day, month, year', () => {
    const words = 'Since 30 May 2024, the position is held by yourself';

    const result = flow(splitText(words), { now: new Date('2025-08-31') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'position',
            ],
          },
        ],
        subject: [
          'yourself',
        ],
        verb: 'hold',
        when: {
          groupType: 'date',
          maxDay: 31,
          maxMonth: 8,
          maxYear: 2025,
          minDay: 30,
          minMonth: 5,
          minYear: 2024,
        },
      },
    ]]);
  });

  it('converts with "since" at the beginning', () => {
    const words = 'Since 2019, Ursula von der Leyen has been the president of the European Commission.';

    const result = flow(splitText(words), { now: new Date('2025-08-31') });

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
                  'European',
                  'Commission',
                ],
              },
            ],
            subject: [
              'been',
              {
                groupType: 'article',
                words: [
                  'the',
                  'president',
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
              'Ursula',
              'von',
              'der',
              'Leyen',
            ],
          },
        ],
        verb: 'has',
        when: {
          groupType: 'date',
          maxYear: 2025,
          minYear: 2019,
        },
      },
    ]]);
  });

  it('converts with "since" at the end', () => {
    const words = 'Charles Michel has been the president of the European Council since 2019.';

    const result = flow(splitText(words), { now: new Date('2024-08-31') });

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
                  'European',
                  'Council',
                ],
              },
            ],
            subject: [
              'been',
              {
                groupType: 'article',
                words: [
                  'the',
                  'president',
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
              'Charles',
              'Michel',
            ],
          },
        ],
        verb: 'has',
        when: {
          groupType: 'date',
          maxYear: 2024,
          minYear: 2019,
        },
      },
    ]]);
  });

  it('converts with max year', () => {
    const words = 'it is to be completed by 2100';

    const result = flow(splitText(words), { now: new Date('2025-07-21') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'to',
          'be',
          'completed',
        ],
        subject: [
          'it',
        ],
        verb: 'is',
        when: {
          groupType: 'date',
          maxYear: 2100,
          minYear: 2025,
        },
      },
    ]]);
  });

  it('converts with max date', () => {
    const words = 'it is to be completed by 13 January 2100';

    const result = flow(splitText(words), { now: new Date('2024-07-21') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'to',
          'be',
          'completed',
        ],
        subject: [
          'it',
        ],
        verb: 'is',
        when: {
          groupType: 'date',
          maxDay: 13,
          maxMonth: 1,
          maxYear: 2100,
          minDay: 21,
          minMonth: 7,
          minYear: 2024,
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

  it('finds a date at the end, without an object', () => {
    const words = 'Panama joined in 1971';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [],
        subject: [
          'Panama',
        ],
        verb: 'joined',
        when: {
          groupType: 'date',
          year: 1971,
        },
      },
    ]]);
  });

  it('finds a date at the beginning, without an object', () => {
    const words = 'In 1975, Nicaragua joined';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [],
        subject: [
          'Nicaragua',
        ],
        verb: 'joined',
        when: {
          groupType: 'date',
          year: 1975,
        },
      },
    ]]);
  });

  it('finds an exact date', () => {
    const words = 'On 3 May 2020, he purchased 16 grams of gold';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'unit',
            item: 'gold',
            unit: 'kg',
            value: 0.016,
          },
        ],
        subject: [
          'he',
        ],
        verb: 'purchased',
        when: {
          day: 3,
          groupType: 'date',
          month: 5,
          year: 2020,
        },
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

  it('converts month & year without a day', () => {
    const words = 'The parliament passed the budget in September 2020';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'budget',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'parliament',
            ],
          },
        ],
        verb: 'passed',
        when: {
          groupType: 'date',
          month: 9,
          year: 2020,
        },
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
            item: {
              groupType: 'article',
              words: [
                'countries',
              ],
            },
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
});
