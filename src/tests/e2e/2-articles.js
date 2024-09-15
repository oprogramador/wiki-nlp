const flow = require('../../flow');
const splitText = require('../../splitText');
const expect = require('../expect');

describe('articles & verbs (e2e)', () => {
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

  it('converts an OR as an object', () => {
    const words = 'Bob wants a cat, a dog, or a hamster';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'or',
            members: [
              {
                groupType: 'article',
                words: [
                  'a',
                  'cat',
                ],
              },
              {
                groupType: 'article',
                words: [
                  'a',
                  'dog',
                ],
              },
              {
                groupType: 'article',
                words: [
                  'a',
                  'hamster',
                ],
              },
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Bob',
            ],
          },
        ],
        verb: 'wants',
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
              'the',
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
              'the',
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
              'the',
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

  it.skip('converts a phrase with two localities, with no comma before and', () => {
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
              'the',
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
                  'the',
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
          'Norway',
        ],
        verb: 'notified',
      },
    ]]);
  });

  it('converts with a number in the subject', () => {
    const words = '123 countries signed the Treaty';

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
          {
            groupType: 'quantity',
            item: {
              groupType: 'article',
              words: [
                'countries',
              ],
            },
            value: 123,
          },
        ],
        verb: 'signed',
      },
    ]]);
  });

  it('finds locality with "at"', () => {
    const words = 'At the Paris Conference, the leaders signed an agreement';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'an',
              'agreement',
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
        verb: 'signed',
        where: {
          groupType: 'locality',
          precise: {
            groupType: 'article',
            words: [
              'the',
              'Paris',
              'Conference',
            ],
          },
        },
      },
    ]]);
  });

  it('converts with irregular past verb, and negation', () => {
    const words = 'They sent no good applications';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        isNegated: true,
        object: [
          {
            groupType: 'article',
            words: [
              'good',
              'applications',
            ],
          },
        ],
        subject: [
          'They',
        ],
        verb: 'sent',
      },
    ]]);
  });

  it('converts an object with neither article nor quantity', () => {
    const words = 'They sent applications';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'applications',
            ],
          },
        ],
        subject: [
          'They',
        ],
        verb: 'sent',
      },
    ]]);
  });

  it('converts with "but" and a subject', () => {
    const words = 'they sent many applications, but they canceled';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([
      [
        {
          groupType: 'verb',
          object: [
            {
              groupType: 'quantity',
              item: 'applications',
              min: 3,
            },
          ],
          subject: [
            'they',
          ],
          verb: 'sent',
        },
      ],
      [
        {
          groupType: 'verb',
          subject: [
            'they',
          ],
          verb: 'canceled',
        },
      ],
    ]);
  });

  it('converts with "but" without a subject', () => {
    const words = 'Turkey is not an EU member, but has signed a cooperation agreement';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([
      [
        {
          groupType: 'verb',
          isNegated: true,
          object: [
            {
              groupType: 'article',
              words: [
                'an',
                'EU',
                'member',
              ],
            },
          ],
          subject: [
            'Turkey',
          ],
          verb: 'is',
        },
      ],
      [
        {
          groupType: 'verb',
          object: [
            'signed',
            {
              groupType: 'article',
              words: [
                'a',
                'cooperation',
                'agreement',
              ],
            },
          ],
          subject: [
            'it',
          ],
          verb: 'has',
        },
      ],
    ]);
  });

  it('converts with "which"', () => {
    const words = 'In 1936, Belgium and France signed the Treaty, which created the alliance';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([
      [
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
            {
              groupType: 'and',
              members: [
                'Belgium',
                'France',
              ],
            },
          ],
          verb: 'signed',
          when: {
            groupType: 'date',
            year: 1936,
          },
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
                'alliance',
              ],
            },
          ],
          subject: [
            'it',
          ],
          verb: 'created',
        },
      ],
    ]);
  });

  it('converts a source from the end, with an adjective', () => {
    const words = 'The average European income is very high according to EFTA';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'very',
              'high',
            ],
          },
        ],
        source: 'EFTA',
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'average',
              'European',
              'income',
            ],
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('converts a source from the end', () => {
    const words = 'The average European income is €42,000 according to EFTA';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            currency: 'EUR',
            groupType: 'currency',
            value: 42000,
          },
        ],
        source: 'EFTA',
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'average',
              'European',
              'income',
            ],
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('converts a source, with no comma', () => {
    const words = 'According to the United Nations the average European income is €40,000';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            currency: 'EUR',
            groupType: 'currency',
            value: 40000,
          },
        ],
        source: {
          groupType: 'article',
          words: [
            'the',
            'United',
            'Nations',
          ],
        },
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'average',
              'European',
              'income',
            ],
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('converts a source, with a comma', () => {
    const words = 'According to the OECD, the average European income is €41,000';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            currency: 'EUR',
            groupType: 'currency',
            value: 41000,
          },
        ],
        source: {
          groupType: 'article',
          words: [
            'the',
            'OECD',
          ],
        },
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'average',
              'European',
              'income',
            ],
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('removes "both" after an irregular verb', () => {
    const words = 'He ate both an orange and a banana';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'and',
            members: [
              {
                groupType: 'article',
                words: [
                  'an',
                  'orange',
                ],
              },
              {
                groupType: 'article',
                words: [
                  'a',
                  'banana',
                ],
              },
            ],
          },
        ],
        subject: [
          'He',
        ],
        verb: 'ate',
      },
    ]]);
  });

  it('removes "both" after an auxiliary verb', () => {
    const words = 'He is both a police officer and a basketball player';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'and',
            members: [
              {
                groupType: 'article',
                words: [
                  'a',
                  'police',
                  'officer',
                ],
              },
              {
                groupType: 'article',
                words: [
                  'a',
                  'basketball',
                  'player',
                ],
              },
            ],
          },
        ],
        subject: [
          'He',
        ],
        verb: 'is',
      },
    ]]);
  });

  it('removes "both" after a regular past verb', () => {
    const words = 'In 2005, the president pardoned both a young man and an old woman';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'and',
            members: [
              {
                groupType: 'article',
                words: [
                  'a',
                  'young',
                  'man',
                ],
              },
              {
                groupType: 'article',
                words: [
                  'an',
                  'old',
                  'woman',
                ],
              },
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'president',
            ],
          },
        ],
        verb: 'pardoned',
        when: {
          groupType: 'date',
          year: 2005,
        },
      },
    ]]);
  });

  it('does not convert "both" at the beginning', () => {
    const words = 'Both cities are cool';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'cool',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Both',
              'cities',
            ],
          },
        ],
        verb: 'are',
      },
    ]]);
  });

  it('removes "both" after a preposition', () => {
    const words = 'It was agreed by both France and Germany';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'it',
        ],
        subject: [
          {
            groupType: 'and',
            members: [
              'France',
              'Germany',
            ],
          },
        ],
        verb: 'agree',
      },
    ]]);
  });

  it('converts "it" in the next phrase', () => {
    const words = 'The Court was established in 1950. It is composed of two judges per member state.';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([
      [
        {
          groupType: 'verb',
          object: [
            'established',
          ],
          subject: [
            {
              groupType: 'article',
              words: [
                'the',
                'Court',
              ],
            },
          ],
          verb: 'was',
          when: {
            groupType: 'date',
            year: 1950,
          },
        },
      ],
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
                      groupType: 'article',
                      words: [
                        'member',
                        'state',
                      ],
                    },
                  ],
                  subject: [
                    {
                      groupType: 'quantity',
                      item: 'judges',
                      value: 2,
                    },
                  ],
                  verb: 'per',
                },
              ],
              subject: [
                'composed',
              ],
              verb: 'of',
            },
          ],
          subject: [
            {
              groupType: 'article',
              words: [
                'the',
                'Court',
              ],
            },
          ],
          verb: 'is',
        },
      ],
    ]);
  });

  it('converts "they" in the next phrase', () => {
    const words = 'The judges were elected in 2000. They were the best possible candidates.';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([
      [
        {
          groupType: 'verb',
          object: [
            'elected',
          ],
          subject: [
            {
              groupType: 'article',
              words: [
                'the',
                'judges',
              ],
            },
          ],
          verb: 'were',
          when: {
            groupType: 'date',
            year: 2000,
          },
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
                'best',
                'possible',
                'candidates',
              ],
            },
          ],
          subject: [
            {
              groupType: 'article',
              words: [
                'the',
                'judges',
              ],
            },
          ],
          verb: 'were',
        },
      ],
    ]);
  });

  it('does not convert "by" after an object', () => {
    const words = 'They encourage the industry by market interventions';

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
                  'market',
                  'interventions',
                ],
              },
            ],
            subject: [
              {
                groupType: 'article',
                words: [
                  'the',
                  'industry',
                ],
              },
            ],
            verb: 'by',
          },
        ],
        subject: [
          'They',
        ],
        verb: 'encourage',
      },
    ]]);
  });

  it('converts passive voice with skipping "d"', () => {
    const words = 'The European economy is influenced by the coastline';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'European',
              'economy',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'coastline',
            ],
          },
        ],
        verb: 'influence',
      },
    ]]);
  });

  it('converts passive voice with skipping "ed"', () => {
    const words = 'In 2000, the bill was passed by the parliament';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'bill',
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
        verb: 'pass',
        when: {
          groupType: 'date',
          year: 2000,
        },
      },
    ]]);
  });

  it('converts passive voice with an irregular verb', () => {
    const words = 'The growth was shown by the manager';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'growth',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'manager',
            ],
          },
        ],
        verb: 'show',
      },
    ]]);
  });

  it('converts "respectively"', () => {
    const words = 'The Shias and Ahmadis, respectively, constitute 1.5% and 0.3% of Muslims';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      [
        {
          object: {
            groupType: 'share',
            value: 0.015,
          },
          subject: {
            groupType: 'article',
            words: [
              'the',
              'Shias',
            ],
          },
          verb: 'constitute',
        },
        {
          object: {
            groupType: 'share',
            item: 'Muslims',
            value: 0.003,
          },
          subject: 'Ahmadis',
          verb: 'constitute',
        },
      ],
    ]]);
  });

  it('converts subject+verb+object with no articles', () => {
    const words = 'Pakistan supported decolonisation';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'decolonisation',
        ],
        subject: [
          'Pakistan',
        ],
        verb: 'supported',
      },
    ]]);
  });

  it('converts subject+verb+object+preposition', () => {
    const words = 'Pakistan supported decolonisation in Africa';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              'Africa',
            ],
            subject: [
              'decolonisation',
            ],
            verb: 'in',
          },
        ],
        subject: [
          'Pakistan',
        ],
        verb: 'supported',
      },
    ]]);
  });

  it('converts subject+adverb+verb+object', () => {
    const words = 'Pakistan strongly supported decolonisation';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverb: 'strongly',
        groupType: 'verb',
        object: [
          'decolonisation',
        ],
        subject: [
          'Pakistan',
        ],
        verb: 'supported',
      },
    ]]);
  });

  it('converts subject+adverb+verb+object+preposition', () => {
    const words = 'Pakistan strongly supported decolonisation in Africa and Oceania';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverb: 'strongly',
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'and',
                members: [
                  'Africa',
                  'Oceania',
                ],
              },
            ],
            subject: [
              'decolonisation',
            ],
            verb: 'in',
          },
        ],
        subject: [
          'Pakistan',
        ],
        verb: 'supported',
      },
    ]]);
  });

  it('converts subject+verb+adverb', () => {
    const words = 'Internationalism won particularly';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverb: 'particularly',
        groupType: 'verb',
        object: [],
        subject: [
          'Internationalism',
        ],
        verb: 'won',
      },
    ]]);
  });

  it.skip('handles "respectively" with no listed items', () => {
    const words = 'Businesses, respectively, are run by the government';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
    ]]);
  });

  it.skip('handles "respectively" with "such as"', () => {
    // eslint-disable-next-line max-len
    const words = 'Businesses, such as Apple and Google, which create an operating system and search engine, respectively, have high profits';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
    ]]);
  });

  it('does not find an adverb with uppercase (in the middle)', () => {
    const words = 'Al Ahly is the most successful team in Africa according to CAF';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              'Africa',
            ],
            subject: [
              {
                groupType: 'article',
                words: [
                  'the',
                  'most',
                  'successful',
                  'team',
                ],
              },
            ],
            verb: 'in',
          },
        ],
        source: 'CAF',
        subject: [
          {
            groupType: 'article',
            words: [
              'Al',
              'Ahly',
            ],
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('finds uppercase adverb at the beginning', () => {
    const words = 'Tectonically, most of Indonesia is unstable';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverb: 'tectonically',
        groupType: 'verb',
        object: [
          'unstable',
        ],
        subject: [
          {
            groupType: 'preposition',
            object: [
              'Indonesia',
            ],
            subject: [
              'most',
            ],
            verb: 'of',
          },
        ],
        verb: 'is',
      },
    ]]);
  });
});
