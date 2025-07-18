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

  it('converts OR as an object', () => {
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
          'Bob',
        ],
        verb: 'wants',
      },
    ]]);
  });

  it('does not remove "neither" when without "nor"', () => {
    const words = 'In 2008, neither party won a net gain';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'a',
              'net',
              'gain',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'neither',
              'party',
            ],
          },
        ],
        verb: 'won',
        when: {
          groupType: 'date',
          year: 2008,
        },
      },
    ]]);
  });

  it('converts NOR as a subject', () => {
    const words = 'Neither his cat nor the dog was smart';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'smart',
        ],
        subject: [
          {
            groupType: 'nor',
            members: [
              {
                groupType: 'article',
                words: [
                  'his',
                  'cat',
                ],
              },
              {
                groupType: 'article',
                words: [
                  'the',
                  'dog',
                ],
              },
            ],
          },
        ],
        verb: 'was',
      },
    ]]);
  });

  it.skip('converts NOR as a subject, after a year', () => {
    const words = 'In 2000, neither his cat nor the dog was smart';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
    ]]);
  });

  it('converts NOR as an object', () => {
    const words = 'Bob wants neither a cat nor a dog';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'nor',
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
            ],
          },
        ],
        subject: [
          'Bob',
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
          'living',
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
        where: {
          groupType: 'article',
          words: [
            'the',
            'EU',
          ],
        },
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
              'effect',
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
          'living',
        ],
        subject: [
          'They',
        ],
        verb: 'were',
        where: {
          groupType: 'and',
          members: [
            'France',
            'Spain',
            'Portugal',
          ],
        },
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
              'Europe',
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
        adverbs: ['formally'],
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
            item: 'countries',
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
          'applications',
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
          object: [],
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
            'Turkey',
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
            {
              groupType: 'article',
              words: [
                'the',
                'Treaty',
              ],
            },
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
          'Both',
          'cities',
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
      {
        object: [{
          groupType: 'share',
          value: 0.015,
        }],
        subject: [{
          groupType: 'article',
          words: [
            'the',
            'Shias',
          ],
        }],
        verb: 'constitute',
      },
      {
        object: [{
          groupType: 'share',
          item: 'Muslims',
          value: 0.003,
        }],
        subject: ['Ahmadis'],
        verb: 'constitute',
      },
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
          'decolonisation',
        ],
        subject: [
          'Pakistan',
        ],
        verb: 'supported',
        where: 'Africa',
      },
    ]]);
  });

  it('converts subject+adverb+verb+object', () => {
    const words = 'Pakistan strongly supported decolonisation';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: ['strongly'],
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
        adverbs: ['strongly'],
        groupType: 'verb',
        object: [
          'decolonisation',
        ],
        subject: [
          'Pakistan',
        ],
        verb: 'supported',
        where: {
          groupType: 'and',
          members: [
            'Africa',
            'Oceania',
          ],
        },
      },
    ]]);
  });

  it('converts subject+verb+adverb', () => {
    const words = 'Internationalism won particularly';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: ['particularly'],
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
            groupType: 'article',
            words: [
              'the',
              'most',
              'successful',
              'team',
            ],
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
        where: 'Africa',
      },
    ]]);
  });

  it('finds uppercase adverb at the beginning', () => {
    const words = 'Tectonically, most of Indonesia is unstable';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: ['tectonically'],
        groupType: 'verb',
        object: [
          'unstable',
        ],
        subject: [
          {
            groupType: 'share',
            item: 'Indonesia',
            min: 0.5,
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('handles "the number of"', () => {
    const words = 'There is a rise in the number of African champions';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
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
                      'African',
                      'champions',
                    ],
                  },
                ],
                subject: [
                  {
                    groupType: 'article',
                    words: [
                      'the',
                      'amount',
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
                  'a',
                  'rise',
                ],
              },
            ],
            verb: 'in',
          },
        ],
        subject: [
          'There',
        ],
        verb: 'is',
      },
    ]]);
  });

  it('converts "such as"', () => {
    const words = 'Some popular dishes such as pizza, burgers, french fries, and kebabs are fattening';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'fattening',
        ],
        subject: [
          {
            example: {
              groupType: 'and',
              members: [
                'pizza',
                'burgers',
                {
                  groupType: 'article',
                  words: [
                    'french',
                    'fries',
                  ],
                },
                'kebabs',
              ],
            },
            general: {
              groupType: 'article',
              words: [
                'Some',
                'popular',
                'dishes',
              ],
            },
            groupType: 'example',
          },
        ],
        verb: 'are',
      },
    ]]);
  });

  it('handles "at" followed by an article, space and comma', () => {
    const words = 'Bob is at the square , here';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'here',
        ],
        subject: [
          'Bob',
        ],
        verb: 'is',
        where: {
          groupType: 'locality',
          precise: {
            groupType: 'article',
            words: [
              'the',
              'square',
            ],
          },
        },
      },
    ]]);
  });

  it('handles an adverb with passive', () => {
    const words = 'In 1950s, the public transport was commonly used by the lower classes';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: ['commonly'],
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'public',
              'transport',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'lower',
              'classes',
            ],
          },
        ],
        verb: 'use',
        when: {
          groupType: 'date',
          maxYear: 1959,
          minYear: 1950,
        },
      },
    ]]);
  });

  it('handles an adverb with passive, irregular verb', () => {
    const words = 'The public transport is mostly paid by the local taxpayers';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: ['mostly'],
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'public',
              'transport',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'local',
              'taxpayers',
            ],
          },
        ],
        verb: 'pay',
      },
    ]]);
  });

  it('finds a simple place at the beginning', () => {
    const words = 'In Oslo, the public transport is mostly paid by the local taxpayers';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'mostly',
        ],
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'public',
              'transport',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'local',
              'taxpayers',
            ],
          },
        ],
        verb: 'pay',
        where: 'Oslo',
      },
    ]]);
  });

  it('handles an adverb after an article', () => {
    const words = 'They were a strongly diversified group';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'a',
              'strongly',
              'diversified',
              'group',
            ],
          },
        ],
        subject: [
          'They',
        ],
        verb: 'were',
      },
    ]]);
  });

  it('handles a verb adverb, and an adverb after an article', () => {
    const words = 'They met quickly a strongly diversified group';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: ['quickly'],
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'a',
              'strongly',
              'diversified',
              'group',
            ],
          },
        ],
        subject: [
          'They',
        ],
        verb: 'met',
      },
    ]]);
  });

  it('finds an adverb after a pronoun', () => {
    const words = 'She usually had a dream';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: ['usually'],
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'a',
              'dream',
            ],
          },
        ],
        subject: [
          'She',
        ],
        verb: 'had',
      },
    ]]);
  });

  it('finds an adverb before a number', () => {
    const words = 'The amount is usually twelve';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: ['usually'],
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            value: 12,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'amount',
            ],
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('finds an adverb before a unit', () => {
    const words = 'Their weight is usually eleven kilograms';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: ['usually'],
        groupType: 'verb',
        object: [
          {
            groupType: 'unit',
            unit: 'kg',
            value: 11,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Their',
              'weight',
            ],
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('finds an adverb before an article', () => {
    const words = 'Their pet is usually a dog';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: ['usually'],
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'a',
              'dog',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Their',
              'pet',
            ],
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it.skip('handles "long" as an adverb', () => {
    const words = 'That was long an essential issue';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: ['perennially'],
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'an',
              'essential',
              'issue',
            ],
          },
        ],
        subject: [
          'That',
        ],
        verb: 'was',
      },
    ]]);
  });

  it('handles multiple adverbs', () => {
    const words = 'Taxonomically, the Indian leopard was usually classified as a distinct specie';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'taxonomically',
          'usually',
        ],
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'article',
                words: [
                  'a',
                  'distinct',
                  'specie',
                ],
              },
            ],
            subject: [
              'classified',
            ],
            verb: 'as',
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Indian',
              'leopard',
            ],
          },
        ],
        verb: 'was',
      },
    ]]);
  });

  it('converts "U.S. dollars"', () => {
    const words = 'Their total budget is billions of U.S. dollars';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            currency: 'USD',
            groupType: 'currency',
            min: 1e9,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Their',
              'total',
              'budget',
            ],
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('converts "U.S. dollars" followed by a year', () => {
    const words = 'Their total budget was billions of U.S. dollars in 2015';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            currency: 'USD',
            groupType: 'currency',
            min: 1e9,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Their',
              'total',
              'budget',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          year: 2015,
        },
      },
    ]]);
  });

  it('converts "including"', () => {
    const words = 'Many countries, including Switzerland, Austria, Czechia and Slovakia, are landlocked';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'landlocked',
        ],
        subject: [
          {
            groupType: 'quantity',
            including: {
              groupType: 'and',
              members: [
                'Switzerland',
                'Austria',
                'Czechia',
                'Slovakia',
              ],
            },
            item: 'countries',
            min: 3,
          },
        ],
        verb: 'are',
      },
    ]]);
  });

  it('converts "including:"', () => {
    const words = 'Many countries, including: Hungary, Slovakia, and Czechia, are landlocked';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'landlocked',
        ],
        subject: [
          {
            groupType: 'quantity',
            including: {
              groupType: 'and',
              members: [
                'Hungary',
                'Slovakia',
                'Czechia',
              ],
            },
            item: 'countries',
            min: 3,
          },
        ],
        verb: 'are',
      },
    ]]);
  });

  it('converts "excluding"', () => {
    const words = 'Many countries, excluding France, Spain, and Portugal, are landlocked';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'landlocked',
        ],
        subject: [
          {
            excluding: {
              groupType: 'and',
              members: [
                'France',
                'Spain',
                'Portugal',
              ],
            },
            groupType: 'quantity',
            item: 'countries',
            min: 3,
          },
        ],
        verb: 'are',
      },
    ]]);
  });

  it('converts "excluding:"', () => {
    const words = 'Numerous countries, excluding: Belgium & Netherlands, are landlocked';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'landlocked',
        ],
        subject: [
          {
            excluding: {
              groupType: 'and',
              members: [
                'Belgium',
                'Netherlands',
              ],
            },
            groupType: 'quantity',
            item: 'countries',
            min: 3,
          },
        ],
        verb: 'are',
      },
    ]]);
  });

  it('converts "including" with an item', () => {
    const words = 'The university currently has about 40,000 students, including over 14,000 international students';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'currently',
        ],
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            including: {
              groupType: 'quantity',
              item: {
                groupType: 'article',
                words: [
                  'international',
                  'students',
                ],
              },
              min: 14e3,
            },
            isExact: false,
            item: 'students',
            value: 4e4,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'university',
            ],
          },
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts "including" without a comma', () => {
    const words = 'The university currently has about 40,000 students including over 21,000 girls';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'currently',
        ],
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            including: {
              groupType: 'quantity',
              item: 'girls',
              min: 21e3,
            },
            isExact: false,
            item: 'students',
            value: 4e4,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'university',
            ],
          },
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts "respectively" at the beginning, with lowercase', () => {
    const words = 'respectively, Garcias adopted a dog and a cat';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        object: [{
          groupType: 'article',
          words: [
            'a',
            'dog',
          ],
        }],
        subject: ['Garcias'],
        verb: 'adopted',
      },
      {
        object: [{
          groupType: 'article',
          words: [
            'a',
            'cat',
          ],
        }],
        subject: ['Garcias'],
        verb: 'adopted',
      },
    ]]);
  });

  it('removes "on the other hand" in the middle', () => {
    const words = 'Dave, on the other hand, has many cats';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'cats',
            min: 3,
          },
        ],
        subject: [
          'Dave',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('removes "on the other hand" in the middle, with no comma', () => {
    const words = 'Dave on the other hand has several cats';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'cats',
            max: 99,
            min: 3,
          },
        ],
        subject: [
          'Dave',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('removes "on the other hand" at the begin', () => {
    const words = 'On the other hand, Dave has about five cats';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            isExact: false,
            item: 'cats',
            value: 5,
          },
        ],
        subject: [
          'Dave',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('removes "on the other hand" at the end', () => {
    const words = 'Dave has dozens of cats, on the other hand';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
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
          'Dave',
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts "and is"', () => {
    const words = 'The Reserve Bank of Zimbabwe was founded in 1964 and is headquartered in Harare';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([
      [
        {
          groupType: 'verb',
          object: [
            'founded',
          ],
          subject: [
            {
              groupType: 'article',
              words: [
                'the',
                'Reserve',
                'Bank',
                'of',
                'Zimbabwe',
              ],
            },
          ],
          verb: 'was',
          when: {
            groupType: 'date',
            year: 1964,
          },
        },
      ],
      [
        {
          groupType: 'verb',
          object: [
            'headquartered',
          ],
          subject: [
            {
              groupType: 'article',
              words: [
                'the',
                'Reserve',
                'Bank',
                'of',
                'Zimbabwe',
              ],
            },
          ],
          verb: 'is',
          where: 'Harare',
        },
      ],
    ]);
  });

  it('converts "do not" followed by an adverb', () => {
    const words = 'The workers do not necessarily pay high taxes in Scotland';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'necessarily',
        ],
        groupType: 'verb',
        isNegated: true,
        object: [
          {
            groupType: 'article',
            words: [
              'high',
              'taxes',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'workers',
            ],
          },
        ],
        verb: 'pay',
        where: 'Scotland',
      },
    ]]);
  });

  it('converts "because of"', () => {
    const words = 'The history of Fiji is mostly vague because of poor written sources';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'mostly',
        ],
        cause: {
          groupType: 'article',
          words: [
            'poor',
            'written',
            'sources',
          ],
        },
        groupType: 'verb',
        object: [
          'vague',
        ],
        subject: [
          {
            groupType: 'preposition',
            object: [
              'Fiji',
            ],
            subject: [
              {
                groupType: 'article',
                words: [
                  'the',
                  'history',
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

  it('converts "as well as" but removes "as well"', () => {
    // eslint-disable-next-line max-len
    const words = 'Srividya occasionally was a playback singer as well as carnatic singer in South India but she was a pretty dancer as well';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'occasionally',
        ],
        groupType: 'verb',
        object: [
          {
            groupType: 'and',
            members: [
              {
                groupType: 'article',
                words: [
                  'a',
                  'playback',
                  'singer',
                ],
              },
              {
                groupType: 'article',
                words: [
                  'carnatic',
                  'singer',
                ],
              },
            ],
          },
        ],
        subject: [
          'Srividya',
        ],
        verb: 'was',
        where: {
          groupType: 'article',
          words: [
            'South',
            'India',
          ],
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
              'a',
              'pretty',
              'dancer',
            ],
          },
        ],
        subject: [
          'Srividya',
        ],
        verb: 'was',
      },
    ]]);
  });

  it.skip('finds a location with uppercase-lowercase', () => {
    const words = 'Slaves were valuable in the Sumerian city-states';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
    ]]);
  });

  it('converts "according to holy"', () => {
    const words = 'According to holy tradition, Chaerephon was a follower of Socrates';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              'Socrates',
            ],
            subject: [
              {
                groupType: 'article',
                words: [
                  'a',
                  'follower',
                ],
              },
            ],
            verb: 'of',
          },
        ],
        source: {
          groupType: 'article',
          words: [
            'holy',
            'tradition',
          ],
        },
        subject: [
          'Chaerephon',
        ],
        verb: 'was',
      },
    ]]);
  });

  it('removes "either directly or indirectly"', () => {
    const words = 'Love songs are influenced, either directly or indirectly, by many African languages';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'Love',
              'songs',
            ],
          },
        ],
        subject: [
          {
            groupType: 'quantity',
            item: {
              groupType: 'article',
              words: [
                'African',
                'languages',
              ],
            },
            min: 3,
          },
        ],
        verb: 'influence',
      },
    ]]);
  });

  it('converts "often used"', () => {
    const words = 'Chopsticks are often used in Japan';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'frequently',
        ],
        groupType: 'verb',
        object: [
          'used',
        ],
        subject: [
          'Chopsticks',
        ],
        verb: 'are',
        where: 'Japan',
      },
    ]]);
  });
});
