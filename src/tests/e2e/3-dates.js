const flow = require('../../flow');
const splitText = require('../../splitText');
const expect = require('../expect');

describe('dates', () => {
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
              'the',
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

  it('finds a date at the beginning, with AND', () => {
    const words = 'In 1930, Belgium and France signed the Treaty';

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
          year: 1930,
        },
      },
    ]]);
  });

  it('finds a date at the beginning, with AND, and "since"', () => {
    const words = 'Since 1931, Belgium, the Netherlands and France have been in an alliance';

    const result = flow(splitText(words), { now: new Date('2025-07-01') });

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
                  'an',
                  'alliance',
                ],
              },
            ],
            subject: [
              'been',
            ],
            verb: 'in',
          },
        ],
        subject: [
          {
            groupType: 'and',
            members: [
              'Belgium',
              {
                groupType: 'article',
                words: [
                  'the',
                  'Netherlands',
                ],
              },
              'France',
            ],
          },
        ],
        verb: 'have',
        when: {
          groupType: 'date',
          maxYear: 2025,
          minYear: 1931,
        },
      },
    ]]);
  });

  it('finds a date at the beginning, with AND, without a comma', () => {
    const words = 'In 1932 Belgium and France signed the Treaty';

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
          year: 1932,
        },
      },
    ]]);
  });

  it('finds a date with a two-words subject, without a comma', () => {
    const words = 'In 1933 these countries signed the Treaty';

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
            groupType: 'article',
            words: [
              'these',
              'countries',
            ],
          },
        ],
        verb: 'signed',
        when: {
          groupType: 'date',
          year: 1933,
        },
      },
    ]]);
  });

  it('finds a date with a pronoun subject, without a comma', () => {
    const words = 'In 1934 they signed the Treaty';

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
          year: 1934,
        },
      },
    ]]);
  });

  it('finds a date at the beginning, without a comma', () => {
    const words = 'In 1935 Belgium signed the Treaty';

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
          year: 1935,
        },
      },
    ]]);
  });

  it('finds date & locality', () => {
    const words = 'In 2010 at the Madrid Conference, plans became a reality';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'a',
              'reality',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'plans',
            ],
          },
        ],
        verb: 'became',
        when: {
          groupType: 'date',
          year: 2010,
        },
        where: {
          groupType: 'locality',
          precise: {
            groupType: 'article',
            words: [
              'the',
              'Madrid',
              'Conference',
            ],
          },
        },
      },
    ]]);
  });

  it('converts a day range after "on"', () => {
    const words = 'The third session was held on 10–20 May 2015 in Pärnu, Estonia';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'held',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'third',
              'session',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxDay: 20,
          minDay: 10,
          month: 5,
          year: 2015,
        },
        where: {
          general: 'Estonia',
          groupType: 'locality',
          precise: 'Pärnu',
        },
      },
    ]]);
  });

  it('converts a decade with "during"', () => {
    const words = 'Production peaked during the 1950s';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [],
        subject: [
          'Production',
        ],
        verb: 'peaked',
        when: {
          groupType: 'date',
          maxYear: 1959,
          minYear: 1950,
        },
      },
    ]]);
  });

  it('converts a century', () => {
    const words = 'In the 19th century, Indian literature was created by great writers';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'Indian',
              'literature',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'great',
              'writers',
            ],
          },
        ],
        verb: 'create',
        when: {
          groupType: 'date',
          maxYear: 1900,
          minYear: 1801,
        },
      },
    ]]);
  });

  it('converts a century with "early"', () => {
    const words = 'In the early 20th century, the economic growth was high';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'high',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'economic',
              'growth',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: 1950,
          minYear: 1901,
        },
      },
    ]]);
  });

  it('converts a century with "late"', () => {
    const words = 'In the late 3rd century, there was a plague';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'a',
              'plague',
            ],
          },
        ],
        subject: [
          'there',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: 300,
          minYear: 251,
        },
      },
    ]]);
  });

  it('converts a century with a number word', () => {
    const words = 'Rome was destroyed in the fifth century';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'destroyed',
        ],
        subject: [
          'Rome',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: 500,
          minYear: 401,
        },
      },
    ]]);
  });

  it('converts a century with a number word + "late"', () => {
    const words = 'Rome was strong in the late second century';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'strong',
        ],
        subject: [
          'Rome',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: 200,
          minYear: 151,
        },
      },
    ]]);
  });

  it('converts a century with a number word + "early"', () => {
    const words = 'In the early twentieth century, there were many dictatorships';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'dictatorships',
            min: 3,
          },
        ],
        subject: [
          'there',
        ],
        verb: 'were',
        when: {
          groupType: 'date',
          maxYear: 1950,
          minYear: 1901,
        },
      },
    ]]);
  });
});

