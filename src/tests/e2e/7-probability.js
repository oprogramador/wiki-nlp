const flow = require('../../flow');
const splitText = require('../../splitText');
const expect = require('../expect');

describe('probability (e2e)', () => {
  it('converts "It is speculated that"', () => {
    const words = 'It is speculated that by 4,000 BCE, sheep were domesticated in Africa';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'domesticated',
        ],
        probability: 0.5,
        subject: [
          'sheep',
        ],
        verb: 'were',
        when: {
          groupType: 'date',
          maxYear: -4000,
        },
        where: 'Africa',
      },
    ]]);
  });

  it('converts "It is speculated that" with an adverb', () => {
    const words = 'It is speculated that by 7,000 BCE, sheep were partially domesticated in Africa';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'partially',
        ],
        groupType: 'verb',
        object: [
          'domesticated',
        ],
        probability: 0.5,
        subject: [
          'sheep',
        ],
        verb: 'were',
        when: {
          groupType: 'date',
          maxYear: -7000,
        },
        where: 'Africa',
      },
    ]]);
  });

  it('converts "are thought to have"', () => {
    const words = 'The islands are thought to have been colonized by Greeks by the 7th century BC';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'islands',
            ],
          },
        ],
        probability: 0.5,
        subject: [
          'Greeks',
        ],
        verb: 'colonize',
        when: {
          groupType: 'date',
          maxYear: -601,
        },
      },
    ]]);
  });

  it('converts "perhaps"', () => {
    const words = 'Munich is perhaps the richest city in Germany as of 2010';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'richest',
              'city',
            ],
          },
        ],
        probability: 0.5,
        subject: [
          'Munich',
        ],
        verb: 'is',
        when: {
          groupType: 'date',
          year: 2010,
        },
        where: 'Germany',
      },
    ]]);
  });

  it('converts "is believed to be"', () => {
    const words = 'The Clovis is believed to be the first universal culture in the Americas';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'first',
              'universal',
              'culture',
            ],
          },
        ],
        probability: 0.5,
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Clovis',
            ],
          },
        ],
        verb: 'is',
        where: {
          groupType: 'article',
          words: [
            'the',
            'Americas',
          ],
        },
      },
    ]]);
  });

  it('converts "it is believed that"', () => {
    const words = 'It is believed that the Red Pyramid was built by King Sneferu in the mid 3rd millennium BC in Egypt';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'Red',
              'Pyramid',
            ],
          },
        ],
        probability: 0.5,
        subject: [
          {
            groupType: 'article',
            words: [
              'King',
              'Sneferu',
            ],
          },
        ],
        verb: 'build',
        when: {
          groupType: 'date',
          maxYear: -2251,
          minYear: -2750,
        },
        where: 'Egypt',
      },
    ]]);
  });

  it('converts "it is likely that"', () => {
    const words = 'According to NASA, it is likely that exoplanets with oceans are very common in the Milky Way';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'very',
              'common',
            ],
          },
        ],
        probability: 0.5,
        source: 'NASA',
        subject: [
          {
            groupType: 'preposition',
            object: [
              'oceans',
            ],
            subject: [
              'exoplanets',
            ],
            verb: 'with',
          },
        ],
        verb: 'are',
        where: {
          groupType: 'article',
          words: [
            'the',
            'Milky',
            'Way',
          ],
        },
      },
    ]]);
  });

  it('converts "there could be"', () => {
    const words = 'There could be as many as 15 billion Earth-like planets in the Milky Way galaxy';

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
                'Earth-like',
                'planets',
              ],
            },
            value: 15e9,
          },
        ],
        probability: 0.5,
        subject: [
          'there',
        ],
        verb: 'are',
        where: {
          groupType: 'article',
          words: [
            'the',
            'Milky',
            'Way',
          ],
        },
      },
    ]]);
  });

  it('converts "it has been suggested that"', () => {
    const words = 'It has been suggested that the last common ancestor of all birds may have been a dinosaur';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'a',
              'dinosaur',
            ],
          },
        ],
        probability: 0.5,
        subject: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'article',
                words: [
                  'all',
                  'birds',
                ],
              },
            ],
            subject: [
              {
                groupType: 'article',
                words: [
                  'the',
                  'last',
                  'common',
                  'ancestor',
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

  it('converts "the expectation is that"', () => {
    const words = 'The expectation is that many collisions are happening in the Andromeda Galaxy';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'happening',
        ],
        probability: 0.5,
        subject: [
          {
            groupType: 'quantity',
            item: 'collisions',
            min: 3,
          },
        ],
        verb: 'are',
        where: {
          groupType: 'article',
          words: [
            'the',
            'Andromeda',
            'Galaxy',
          ],
        },
      },
    ]]);
  });

  it('converts "may have"', () => {
    const words = 'A bank customer may have as many as five accounts';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'accounts',
            value: 5,
          },
        ],
        probability: 0.5,
        subject: [
          {
            groupType: 'article',
            words: [
              'a',
              'bank',
              'customer',
            ],
          },
        ],
        verb: 'has',
      },
    ]]);
  });

  it('converts "was supposed to have"', () => {
    const words = 'Trajan was supposed to have won many battles in the northern England';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'won',
          {
            groupType: 'quantity',
            item: 'battles',
            min: 3,
          },
        ],
        probability: 0.5,
        subject: [
          'Trajan',
        ],
        verb: 'has',
        where: {
          groupType: 'article',
          words: [
            'the',
            'Northern',
            'England',
          ],
        },
      },
    ]]);
  });

  it('converts "was supposed to have been"', () => {
    // eslint-disable-next-line max-len
    const words = 'Trajan was supposed to have been the greatest commander in the northern England in the early 2nd century AD';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'greatest',
              'commander',
            ],
          },
        ],
        probability: 0.5,
        subject: [
          'Trajan',
        ],
        verb: 'is',
        when: {
          groupType: 'date',
          maxYear: 150,
          minYear: 101,
        },
        where: {
          groupType: 'article',
          words: [
            'the',
            'Northern',
            'England',
          ],
        },
      },
    ]]);
  });

  it('converts "until probably"', () => {
    const words = 'Many poor villages in Sicily were inhabited until probably the early 17th century';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'inhabited',
        ],
        probability: 0.5,
        subject: [
          {
            groupType: 'quantity',
            item: {
              groupType: 'article',
              words: [
                'poor',
                'villages',
              ],
            },
            min: 3,
          },
        ],
        verb: 'were',
        when: {
          groupType: 'date',
          maxYear: 1650,
        },
        where: 'Sicily',
      },
    ]]);
  });

  it('converts "it was long speculated that"', () => {
    const words = 'It was long speculated that the earthquake in Sicily occurred around 270 BC';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [],
        probability: 0.5,
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'earthquake',
            ],
          },
        ],
        verb: 'occurred',
        when: {
          groupType: 'date',
          isExact: false,
          year: -270,
        },
        where: 'Sicily',
      },
    ]]);
  });

  it('converts "it is believed by some"', () => {
    const words = 'It is believed by some that the water in Alps heals many diseases';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'diseases',
            min: 3,
          },
        ],
        probability: 0.5,
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'water',
            ],
          },
        ],
        verb: 'heals',
        where: 'Alps',
      },
    ]]);
  });
});
