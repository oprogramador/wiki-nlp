const flow = require('../../flow');
const splitText = require('../../splitText');
const expect = require('../expect');

describe('articles, dates, verbs (e2e)', () => {
  it('handles a negation', () => {
    const words = 'They have no strong connection with any institution';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        isNegated: true,
        object: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'article',
                words: [
                  'any',
                  'institution',
                ],
              },
            ],
            subject: [
              {
                groupType: 'article',
                words: [
                  'strong',
                  'connection',
                ],
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

  it('converts a phrase with past simple tense, and an article object', () => {
    const words = 'Bob received a cat';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'a',
              'cat',
            ],
          },
        ],
        subject: [
          'Bob',
        ],
        verb: 'received',
      },
    ]]);
  });

  it('converts a phrase with past simple tense, and quantity', () => {
    const words = 'Bob received 5 cats';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'cats',
            value: 5,
          },
        ],
        subject: [
          'Bob',
        ],
        verb: 'received',
      },
    ]]);
  });

  it('converts a phrase with past simple tense, and a currency object', () => {
    const words = 'Bob received €12,345';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            currency: 'EUR',
            groupType: 'currency',
            value: 12345,
          },
        ],
        subject: [
          'Bob',
        ],
        verb: 'received',
      },
    ]]);
  });

  it('converts a phrase with a decade', () => {
    const words = 'In the 1990s, Bob received about €2 million';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            currency: 'EUR',
            groupType: 'currency',
            isExact: false,
            value: 2e6,
          },
        ],
        subject: [
          'Bob',
        ],
        verb: 'received',
        when: {
          groupType: 'date',
          maxYear: 1999,
          minYear: 1990,
        },
      },
    ]]);
  });

  it('converts a phrase with a decade, and early', () => {
    const words = 'In the early 1990s, Bob received about €2 million';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            currency: 'EUR',
            groupType: 'currency',
            isExact: false,
            value: 2e6,
          },
        ],
        subject: [
          'Bob',
        ],
        verb: 'received',
        when: {
          groupType: 'date',
          maxYear: 1994,
          minYear: 1990,
        },
      },
    ]]);
  });

  it('converts a phrase with a past date, and a currency object', () => {
    const words = 'In 2020, Bob received €123,456';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            currency: 'EUR',
            groupType: 'currency',
            value: 123456,
          },
        ],
        subject: [
          'Bob',
        ],
        verb: 'received',
        when: {
          groupType: 'date',
          year: 2020,
        },
      },
    ]]);
  });

  it('converts a phrase with a past date, subject wiht a pronoun, and a currency object', () => {
    const words = 'In 2021, its budget exceeded €123 billion';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            currency: 'EUR',
            groupType: 'currency',
            value: 123e9,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'its',
              'budget',
            ],
          },
        ],
        verb: 'exceeded',
        when: {
          groupType: 'date',
          year: 2021,
        },
      },
    ]]);
  });

  it('converts a phrase with a past date, subject wiht an article, and a currency object', () => {
    const words = 'In 2022, the budget exceeded €874 million';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            currency: 'EUR',
            groupType: 'currency',
            value: 874e6,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'budget',
            ],
          },
        ],
        verb: 'exceeded',
        when: {
          groupType: 'date',
          year: 2022,
        },
      },
    ]]);
  });

  it('converts a phrase without a date', () => {
    const words = 'The budget exceeded €123 billion';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            currency: 'EUR',
            groupType: 'currency',
            value: 123e9,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'The',
              'budget',
            ],
          },
        ],
        verb: 'exceeded',
      },
    ]]);
  });

  it('converts a phrase with a regular verb in the past', () => {
    const words = 'the Lisbon Treaty created legal effect';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'legal',
              'effect',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Lisbon',
              'Treaty',
            ],
          },
        ],
        verb: 'created',
      },
    ]]);
  });

  it('converts a phrase with an irregular verb in the past', () => {
    const words = 'the Lisbon Treaty made legal effect';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'legal',
              'effect',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Lisbon',
              'Treaty',
            ],
          },
        ],
        verb: 'made',
      },
    ]]);
  });

  it('converts a phrase with a verb followed by a preposition', () => {
    const words = 'the plane went to San Francisco';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'to',
          {
            groupType: 'article',
            words: [
              'San',
              'Francisco',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'plane',
            ],
          },
        ],
        verb: 'went',
      },
    ]]);
  });

  it('converts an article with a dash', () => {
    const words = 'At least 1 per cent of non-EU citizens were living in the EU';

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
                  'EU',
                ],
              },
            ],
            subject: [
              'living',
            ],
            verb: 'in',
          },
        ],
        subject: [
          {
            groupType: 'share',
            item: {
              groupType: 'article',
              words: [
                'non-EU',
                'citizens',
              ],
            },
            min: 0.01,
          },
        ],
        verb: 'were',
      },
    ]]);
  });

  it('does not convert locality when followed by a verb', () => {
    const words = 'With the Bologna Process, the EU is great';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'great',
        ],
        subject: [
          'With',
          {
            groupType: 'article',
            words: [
              'the',
              'Bologna',
              'Process',
            ],
          },
          ',',
          {
            groupType: 'article',
            words: [
              'the',
              'EU',
            ],
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('does not convert locality when enumerating', () => {
    const words = 'I was living in Spain (Madrid, Barcelona, Valencia, Sevilla et al.)';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              {
                basic: 'Spain',
                extra: [
                  {
                    groupType: 'and',
                    members: [
                      'Madrid',
                      'Barcelona',
                      'Valencia',
                      'Sevilla',
                      'others',
                    ],
                  },
                ],
                groupType: 'extra',
              },
            ],
            subject: [
              'living',
            ],
            verb: 'in',
          },
        ],
        subject: [
          'I',
        ],
        verb: 'was',
      },
    ]]);
  });

  it('converts a phrase with both date, and locality', () => {
    const words = 'The agency, founded in 2010 in Lisbon, Portugal, is great';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'great',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'The',
              'agency',
            ],
          },
          ',',
          'founded',
        ],
        verb: 'is',
        when: {
          groupType: 'date',
          year: 2010,
        },
        where: {
          general: 'Portugal',
          groupType: 'locality',
          precise: 'Lisbon',
        },
      },
    ]]);
  });

  it('converts a phrase with a preposition', () => {
    const words = 'The Treaty gave effect to the Charter';

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
                  'Charter',
                ],
              },
            ],
            subject: [
              {
                groupType: 'article',
                words: [
                  'effect',
                ],
              },
            ],
            verb: 'to',
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'The',
              'Treaty',
            ],
          },
        ],
        verb: 'gave',
      },
    ]]);
  });

  it.skip('converts a phrase with a verb after comma', () => {
    const words = 'the EU is reluctant, gives authoritarian.';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
    ]]);
  });

  it('converts a phrase with a locality', () => {
    const words = 'They were living in Paris, France';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'living',
        ],
        subject: [
          'They',
        ],
        verb: 'were',
        where: {
          general: 'France',
          groupType: 'locality',
          precise: 'Paris',
        },
      },
    ]]);
  });

  it('converts a phrase with a multi-word locality', () => {
    const words = 'They were living in Rio de Janeiro, Brazil';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'living',
        ],
        subject: [
          'They',
        ],
        verb: 'were',
        where: {
          general: 'Brazil',
          groupType: 'locality',
          precise: {
            groupType: 'article',
            words: [
              'Rio',
              'de',
              'Janeiro',
            ],
          },
        },
      },
    ]]);
  });

  it('converts a phrase with a multi-word general locality', () => {
    const words = 'They were living in Prague, Czech Republic';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'living',
        ],
        subject: [
          'They',
        ],
        verb: 'were',
        where: {
          general: {
            groupType: 'article',
            words: [
              'Czech',
              'Republic',
            ],
          },
          groupType: 'locality',
          precise: 'Prague',
        },
      },
    ]]);
  });

  it.skip('converts a phrase with two localities', () => {
    const words = 'They were living in Paris, France, and Madrid, Spain';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'and',
                members: [
                  {
                    general: 'France',
                    groupType: 'locality',
                    precise: 'Paris',
                  },
                  {
                    general: 'Spain',
                    groupType: 'locality',
                    precise: 'Madrid',
                  },
                ],
              },
            ],
            subject: [
              'living',
            ],
            verb: 'in',
          },
        ],
        subject: [
          'They',
        ],
        verb: 'were',
      },
    ]]);
  });

  it.skip('converts a phrase with two localities, with no coma before and', () => {
    const words = 'They were living in São Paulo, Brazil and San Francisco, United States';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'and',
                members: [
                  {
                    general: 'Brazil',
                    groupType: 'locality',
                    precise: {
                      groupType: 'article',
                      words: [
                        'São',
                        'Paulo',
                      ],
                    },
                  },
                  {
                    general: {
                      groupType: 'article',
                      words: [
                        'United',
                        'States',
                      ],
                    },
                    groupType: 'locality',
                    precise: {
                      groupType: 'article',
                      words: [
                        'San',
                        'Francisco',
                      ],
                    },
                  },
                ],
              },
            ],
            subject: [
              'living',
            ],
            verb: 'in',
          },
        ],
        subject: [
          'They',
        ],
        verb: 'were',
      },
    ]]);
  });

  it('does not convert localities for AND as an object', () => {
    const words = 'They were living in France, Spain, and Portugal';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'and',
                members: [
                  'France',
                  'Spain',
                  'Portugal',
                ],
              },
            ],
            subject: [
              'living',
            ],
            verb: 'in',
          },
        ],
        subject: [
          'They',
        ],
        verb: 'were',
      },
    ]]);
  });

  it('does not convert localities for AND as a subject', () => {
    const words = 'Belgium, Luxembourg, the Netherlands, and United States are rich';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'rich',
        ],
        subject: [
          {
            groupType: 'and',
            members: [
              'Belgium',
              'Luxembourg',
              {
                groupType: 'article',
                words: [
                  'the',
                  'Netherlands',
                ],
              },
              {
                groupType: 'article',
                words: [
                  'United',
                  'States',
                ],
              },
            ],
          },
        ],
        verb: 'are',
      },
    ]]);
  });

  it('converts a day range', () => {
    const words = 'The period is 1–5 June 2000';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'date',
            maxDay: 5,
            minDay: 1,
            month: 6,
            year: 2000,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'The',
              'period',
            ],
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('converts a date range', () => {
    const words = 'Ursula von der Leyen was elected for 2019–2024';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'date',
                maxYear: 2024,
                minYear: 2019,
              },
            ],
            subject: [
              'elected',
            ],
            verb: 'for',
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
        verb: 'was',
      },
    ]]);
  });

  it('converts a date range, with "the period"', () => {
    const words = 'Ursula von der Leyen was elected for the period 2019–2024';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'date',
                maxYear: 2024,
                minYear: 2019,
              },
            ],
            subject: [
              'elected',
            ],
            verb: 'for',
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
        verb: 'was',
      },
    ]]);
  });

  it('converts for brackets followed by commas', () => {
    // eslint-disable-next-line max-len
    const words = 'I have worked in the European Central Bank (ECB), the European Court of Auditors (ECA), and European Personnel Selection Office (EPSO).';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'and',
                members: [
                  {
                    abbreviation: 'ECB',
                    groupType: 'article',
                    words: [
                      'the',
                      'European',
                      'Central',
                      'Bank',
                    ],
                  },
                  {
                    abbreviation: 'ECA',
                    groupType: 'article',
                    words: [
                      'the',
                      'European',
                      'Court',
                      'of',
                      'Auditors',
                    ],
                  },
                  {
                    abbreviation: 'EPSO',
                    groupType: 'article',
                    words: [
                      'European',
                      'Personnel',
                      'Selection',
                      'Office',
                    ],
                  },
                ],
              },
            ],
            subject: [
              'worked',
            ],
            verb: 'in',
          },
        ],
        subject: [
          'I',
        ],
        verb: 'have',
      },
    ]]);
  });

  it('converts a phrase with an introduction', () => {
    const words = 'With a population of over 4 million, Milan is the largest metropolitan area';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'largest',
              'metropolitan',
              'area',
            ],
          },
        ],
        subject: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'quantity',
                min: 4e6,
              },
              ',',
              'Milan',
            ],
            subject: [
              'With',
              {
                groupType: 'article',
                words: [
                  'a',
                  'population',
                ],
              },
            ],
            verb: 'of',
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('converts brackets', () => {
    const words = 'Luxembourgish (spoken in Luxembourg) is cool';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'cool',
        ],
        subject: [
          {
            basic: 'Luxembourgish',
            extra: [
              'spoken',
              'in',
              'Luxembourg',
            ],
            groupType: 'extra',
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('converts many brackets', () => {
    const words = 'The lowest rates are in Estonia (10 per cent) and the Czech Republic (13 per cent)';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'in',
          {
            groupType: 'and',
            members: [
              {
                basic: 'Estonia',
                extra: [
                  {
                    groupType: 'share',
                    value: 0.1,
                  },
                ],
                groupType: 'extra',
              },
              {
                basic: {
                  groupType: 'article',
                  words: [
                    'the',
                    'Czech',
                    'Republic',
                  ],
                },
                extra: [
                  {
                    groupType: 'share',
                    value: 0.13,
                  },
                ],
                groupType: 'extra',
              },
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'The',
              'lowest',
              'rates',
            ],
          },
        ],
        verb: 'are',
      },
    ]]);
  });

  it('converts a locality inside bracket', () => {
    const words = 'I was in a nice place (Severozapaden, Bulgaria)';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'in',
          {
            basic: {
              groupType: 'article',
              words: [
                'a',
                'nice',
                'place',
              ],
            },
            extra: [
              {
                general: 'Bulgaria',
                groupType: 'locality',
                precise: 'Severozapaden',
                preposition: {},
              },
            ],
            groupType: 'extra',
          },
        ],
        subject: [
          'I',
        ],
        verb: 'was',
      },
    ]]);
  });

  it('converts a subject with a preposition, followed by a verb in present simple', () => {
    const words = 'The champion of Europe eats a banana';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'a',
              'banana',
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
                  'Europe',
                ],
              },
            ],
            subject: [
              {
                groupType: 'article',
                words: [
                  'The',
                  'champion',
                ],
              },
            ],
            verb: 'of',
          },
        ],
        verb: 'eats',
      },
    ]]);
  });

  it('finds an adverb', () => {
    const words = 'Norway formally notified the European Council';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverb: 'formally',
        groupType: 'verb',
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
          {
            groupType: 'article',
            words: [
              'Norway',
            ],
          },
        ],
        verb: 'notified',
      },
    ]]);
  });

  it.skip('finds a date at the beginning, with AND', () => {
    const words = 'In 1930, Belgium and France signed the Treaty';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
    ]]);
  });

  it.skip('finds a date at the beginning, with AND, without a comma', () => {
    const words = 'In 1930 Belgium and France signed the Treaty';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
    ]]);
  });

  it.skip('finds a date with a two-words subject, without a comma', () => {
    const words = 'In 1930 these countries signed the Treaty'';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
    ]]);
  });

  it.skip('converts with a number in the subject', () => {
    const words = '123 countries signed the Treaty';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
    ]]);
  });

  it('finds a date with a pronoun subject, without a comma', () => {
    const words = 'In 1930 they signed the Treaty';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
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
          'they',
        ],
        verb: 'signed',
        when: {
          groupType: 'date',
          year: 1930,
        },
      },
    ]]);
  });

  it('finds a date at the beginning, without a comma', () => {
    const words = 'In 1930 Belgium signed the Treaty';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
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
          'Belgium',
        ],
        verb: 'signed',
        when: {
          groupType: 'date',
          year: 1930,
        },
      },
    ]]);
  });

  it.skip('converts with "which"', () => {
    const words = 'In 1930, Belgium and France signed the Treaty, which created the alliance';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
    ]]);
  });
});
