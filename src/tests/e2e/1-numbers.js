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
            groupType: 'preposition',
            object: [
              {
                groupType: 'article',
                words: [
                  'the',
                  'world',
                  'population',
                ],
              },
            ],
            subject: [
              {
                groupType: 'share',
                value: 0.07,
              },
            ],
            verb: 'of',
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

  it('converts with "since" at the beginning', () => {
    const words = 'Since 2019, Ursula von der Leyen has been the president of the European Commission.';

    const result = flow(splitText(words));
    const { maxYear } = result[0][0].when;

    expect(maxYear).to.be.a('number');
    expect(maxYear).to.equal(new Date().getFullYear());
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
          maxYear,
          minYear: 2019,
        },
      },
    ]]);
  });

  it('converts with "since" at the end', () => {
    const words = 'Charles Michel has been the president of the European Council since 2019.';

    const result = flow(splitText(words));
    const { maxYear } = result[0][0].when;

    expect(maxYear).to.be.a('number');
    expect(maxYear).to.equal(new Date().getFullYear());
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
          maxYear,
          minYear: 2019,
        },
      },
    ]]);
  });
});
