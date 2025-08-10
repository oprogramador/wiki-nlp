const flow = require('../../flow');
const splitText = require('../../splitText');
const expect = require('../expect');

describe('probability', () => {
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
});
