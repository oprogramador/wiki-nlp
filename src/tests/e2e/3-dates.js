const flow = require('../../flow');
const splitText = require('../../splitText');
const expect = require('../expect');

describe('dates (e2e)', () => {
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

  describe('two decades', () => {
    const expected = [[
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
          maxYear: 1989,
          minYear: 1970,
        },
      },
    ]];

    it('converts a phrase with two decades, at the beginning, with double "the"', () => {
      const words = 'In the 1970s and the 1980s, Bob received about €2 million';

      const result = flow(splitText(words));

      expect(result).to.deep.equal(expected);
    });

    it('converts a phrase with two decades, at the beginning, with single "the"', () => {
      const words = 'In the 1970s and 1980s, Bob received about €2 million';

      const result = flow(splitText(words));

      expect(result).to.deep.equal(expected);
    });

    it('converts a phrase with two decades, at the beginning, without "the"', () => {
      const words = 'In 1970s and 1980s, Bob received about €2 million';

      const result = flow(splitText(words));

      expect(result).to.deep.equal(expected);
    });

    it('converts a phrase with two decades, at the end, with double "the"', () => {
      const words = 'Bob received about €2 million in the 1970s and the 1980s';

      const result = flow(splitText(words));

      expect(result).to.deep.equal(expected);
    });

    it('converts a phrase with two decades, at the end, with single "the"', () => {
      const words = 'Bob received about €2 million in the 1970s and 1980s';

      const result = flow(splitText(words));

      expect(result).to.deep.equal(expected);
    });

    it('converts a phrase with two decades, at the end, without "the"', () => {
      const words = 'Bob received about €2 million in 1970s and 1980s';

      const result = flow(splitText(words));

      expect(result).to.deep.equal(expected);
    });
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

  it('converts a phrase with a decade, and late', () => {
    const words = 'In the late 1920s, Alan received €3 million';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            currency: 'EUR',
            groupType: 'currency',
            value: 3e6,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'received',
        when: {
          groupType: 'date',
          maxYear: 1929,
          minYear: 1925,
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
          'in',
          {
            groupType: 'article',
            words: [
              'an',
              'alliance',
            ],
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
        verb: 'are',
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
          'plans',
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
    const words = 'Over the course of the 19th century, Indian literature was created by great writers';

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

  it('converts a millennium with "early"', () => {
    const words = 'Many churches were constructed by craftsmen in the early 2nd millennium';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'churches',
            min: 3,
          },
        ],
        subject: [
          'craftsmen',
        ],
        verb: 'construct',
        when: {
          groupType: 'date',
          maxYear: 1500,
          minYear: 1001,
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

  it('converts "the second half of the [...] century"', () => {
    const words = 'In the second half of the 19th century, there was a cholera outbreak';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'a',
              'cholera',
              'outbreak',
            ],
          },
        ],
        subject: [
          'there',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: 1900,
          minYear: 1851,
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
        verb: 'is',
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
        verb: 'is',
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

  it('converts subject+adverb+verb+object + preposition (with AND) + decade', () => {
    const words = 'Pakistan strongly supported decolonisation in Africa and Oceania in the 1950s';

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
        when: {
          groupType: 'date',
          maxYear: 1959,
          minYear: 1950,
        },
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

  it('converts decade + subject+adverb+verb+object + preposition (with AND)', () => {
    const words = 'In the 1950s, Pakistan strongly supported decolonisation in Africa and Oceania';

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
        when: {
          groupType: 'date',
          maxYear: 1959,
          minYear: 1950,
        },
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

  it('converts a century BCE', () => {
    const words = 'In the 13th century BCE, Egypt conquered the Nile basin';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'Nile',
              'basin',
            ],
          },
        ],
        subject: [
          'Egypt',
        ],
        verb: 'conquered',
        when: {
          groupType: 'date',
          maxYear: -1201,
          minYear: -1300,
        },
      },
    ]]);
  });

  it('converts a millennium BCE', () => {
    const words = 'In the third millennium BCE, Egypt was a rich land';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'a',
              'rich',
              'land',
            ],
          },
        ],
        subject: [
          'Egypt',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: -2001,
          minYear: -3000,
        },
      },
    ]]);
  });

  it('converts a year BCE', () => {
    const words = 'By about 7000 BCE, a Neolithic culture started in Egypt';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [],
        subject: [
          {
            groupType: 'article',
            words: [
              'a',
              'Neolithic',
              'culture',
            ],
          },
        ],
        verb: 'started',
        when: {
          groupType: 'date',
          isExact: false,
          maxYear: -7000,
        },
        where: 'Egypt',
      },
    ]]);
  });

  it('converts "recent years"', () => {
    const words = 'In recent years, the Nigerian economy has expanded';

    const result = flow(splitText(words), { now: new Date('2022-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'expanded',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Nigerian',
              'economy',
            ],
          },
        ],
        verb: 'has',
        when: {
          groupType: 'date',
          maxYear: 2022,
          minYear: 2007,
        },
      },
    ]]);
  });

  it('converts "recent decades"', () => {
    const words = 'In recent decades, the Ghanaian economy has expanded';

    const result = flow(splitText(words), { now: new Date('2022-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'expanded',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Ghanaian',
              'economy',
            ],
          },
        ],
        verb: 'has',
        when: {
          groupType: 'date',
          maxYear: 2022,
          minYear: 1982,
        },
      },
    ]]);
  });

  it('converts "between [...] and" at the end', () => {
    const words = 'Tunisia experienced many famines between 1620 and 1652';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'famines',
            min: 3,
          },
        ],
        subject: [
          'Tunisia',
        ],
        verb: 'experienced',
        when: {
          groupType: 'date',
          maxYear: 1652,
          minYear: 1620,
        },
      },
    ]]);
  });

  it('converts "between [...] and" at the end, after "sometime"', () => {
    const words = 'Tunisia started the modern period sometime between 1920 and 1970';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'modern',
              'period',
            ],
          },
        ],
        subject: [
          'Tunisia',
        ],
        verb: 'started',
        when: {
          groupType: 'date',
          maxYear: 1970,
          minYear: 1920,
        },
      },
    ]]);
  });

  it('converts "between [...] and"', () => {
    const words = 'Between 1620 and 1652, Tunisia experienced seven famines';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'famines',
            value: 7,
          },
        ],
        subject: [
          'Tunisia',
        ],
        verb: 'experienced',
        when: {
          groupType: 'date',
          maxYear: 1652,
          minYear: 1620,
        },
      },
    ]]);
  });

  it('converts "between [...] and [...] BCE"', () => {
    const words = 'Between 350 and 210 BCE, Persia experienced seven floods';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'floods',
            value: 7,
          },
        ],
        subject: [
          'Persia',
        ],
        verb: 'experienced',
        when: {
          groupType: 'date',
          maxYear: -210,
          minYear: -350,
        },
      },
    ]]);
  });

  it('converts "between [...] and [...] centuries"', () => {
    const words = 'Between the sixth and tenth centuries CE, India was rich';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'rich',
        ],
        subject: [
          'India',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: 1000,
          minYear: 501,
        },
      },
    ]]);
  });

  it('converts "between the [...] and the [...] centuries"', () => {
    const words = 'Between the 15th and the 18th centuries, the slave trade took an estimated 4–8 million slaves';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            isExact: false,
            item: 'slaves',
            max: 8e6,
            min: 4e6,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'slave',
              'trade',
            ],
          },
        ],
        verb: 'took',
        when: {
          groupType: 'date',
          maxYear: 1800,
          minYear: 1401,
        },
      },
    ]]);
  });

  it('converts "between [...] and [...] centuries", at the end, with mixed ordinals', () => {
    const words = 'Italy was poor between the 3rd and 9th centuries';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'poor',
        ],
        subject: [
          'Italy',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: 900,
          minYear: 201,
        },
      },
    ]]);
  });

  it('converts "between [...] and [...] centuries", at the end', () => {
    const words = 'Italy was rich between the thirteenth and sixteenth centuries';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'rich',
        ],
        subject: [
          'Italy',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: 1600,
          minYear: 1201,
        },
      },
    ]]);
  });

  it('converts "between [...] and [...] centuries BCE"', () => {
    const words = 'Between the sixth and fourth centuries BCE, Greece was rich';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'rich',
        ],
        subject: [
          'Greece',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: -301,
          minYear: -600,
        },
      },
    ]]);
  });

  it('converts "between [...] and [...] centuries BCE", at the end', () => {
    const words = 'Cyrene and Cyprus were occupied by Greece between the fifth and third centuries BCE';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'and',
            members: [
              'Cyrene',
              'Cyprus',
            ],
          },
        ],
        subject: [
          'Greece',
        ],
        verb: 'occupy',
        when: {
          groupType: 'date',
          maxYear: -201,
          minYear: -500,
        },
      },
    ]]);
  });

  it('converts "21st century"', () => {
    const words = 'In the 21st century, the Germans and the French are friends';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'friends',
        ],
        subject: [
          {
            groupType: 'and',
            members: [
              {
                groupType: 'article',
                words: [
                  'the',
                  'Germans',
                ],
              },
              {
                groupType: 'article',
                words: [
                  'the',
                  'French',
                ],
              },
            ],
          },
        ],
        verb: 'are',
        when: {
          groupType: 'date',
          maxYear: 2100,
          minYear: 2001,
        },
      },
    ]]);
  });

  it('converts "between the 19th and 21st centuries"', () => {
    const words = 'Between the 19th and 21st centuries, the world was developed';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'developed',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'world',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: 2100,
          minYear: 1801,
        },
      },
    ]]);
  });

  it('converts "in the late [...] and early [...] centuries"', () => {
    const words = 'In the late 19th and early 20th centuries, there were many protests';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'protests',
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
          minYear: 1851,
        },
      },
    ]]);
  });

  it('converts "in the [...]–[...] centuries"', () => {
    const words = 'In the 20th–21st centuries, the population was large';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'large',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'population',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: 2100,
          minYear: 1901,
        },
      },
    ]]);
  });

  it('converts "in the [...]-[...] centuries" (a hypen)', () => {
    const words = 'In the 7th-14th centuries, the population was low';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'low',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'population',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: 1400,
          minYear: 601,
        },
      },
    ]]);
  });

  it('converts "in the [...]–[...] centuries" at the end', () => {
    const words = 'The schools were poor in the 11th–15th centuries';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'poor',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'schools',
            ],
          },
        ],
        verb: 'were',
        when: {
          groupType: 'date',
          maxYear: 1500,
          minYear: 1001,
        },
      },
    ]]);
  });

  it('converts "in the [...]–[...] centuries" with passive, in the middle', () => {
    const words = 'The village was owned in the 16th–18th centuries by the Williams';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'village',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Williams',
            ],
          },
        ],
        verb: 'own',
        when: {
          groupType: 'date',
          maxYear: 1800,
          minYear: 1501,
        },
      },
    ]]);
  });

  it('converts "in the [...]–[...] centuries" with passive, at the end', () => {
    const words = 'The village was owned by the Browns family in the 15th–18th centuries';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'village',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Browns',
              'family',
            ],
          },
        ],
        verb: 'own',
        when: {
          groupType: 'date',
          maxYear: 1800,
          minYear: 1401,
        },
      },
    ]]);
  });

  it('converts "in the [...]–[...] centuries" with passive, at the beginning', () => {
    const words = 'In the 12th–18th centuries, the village was owned by the Millers';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'village',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Millers',
            ],
          },
        ],
        verb: 'own',
        when: {
          groupType: 'date',
          maxYear: 1800,
          minYear: 1101,
        },
      },
    ]]);
  });

  it('converts "in the [...] & [...] centuries", in the middle', () => {
    const words = 'Numerous sailing boats in the 19th & 20th centuries have been named Victoria';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'named',
              'Victoria',
            ],
          },
        ],
        subject: [
          {
            groupType: 'quantity',
            item: {
              groupType: 'article',
              words: [
                'sailing',
                'boats',
              ],
            },
            min: 3,
          },
        ],
        verb: 'are',
        when: {
          groupType: 'date',
          maxYear: 2000,
          minYear: 1801,
        },
      },
    ]]);
  });

  it('handles decade with a noun', () => {
    const words = '1960s singers were the best';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'best',
            ],
          },
        ],
        subject: [
          '1960s',
          'singers',
        ],
        verb: 'were',
      },
    ]]);
  });

  it('finds a location with a dot', () => {
    const words = 'In 2010, Obama met the audience in Washington, D.C.';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'audience',
            ],
          },
        ],
        subject: [
          'Obama',
        ],
        verb: 'met',
        when: {
          groupType: 'date',
          year: 2010,
        },
        where: {
          general: 'D.C',
          groupType: 'locality',
          precise: 'Washington',
        },
      },
    ]]);
  });

  it('converts "ago"', () => {
    const words = 'They started the business 100 years ago';

    const result = flow(splitText(words), { now: new Date('2025-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'business',
            ],
          },
        ],
        subject: [
          'They',
        ],
        verb: 'started',
        when: {
          groupType: 'date',
          year: 1925,
        },
      },
    ]]);
  });

  it('converts "ago" with "about"', () => {
    const words = 'They started the business about 200 years ago';

    const result = flow(splitText(words), { now: new Date('2024-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'business',
            ],
          },
        ],
        subject: [
          'They',
        ],
        verb: 'started',
        when: {
          groupType: 'date',
          isExact: false,
          year: 1824,
        },
      },
    ]]);
  });

  it('converts "ago" with "almost"', () => {
    const words = 'They started the business almost 100 years ago';

    const result = flow(splitText(words), { now: new Date('2024-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'business',
            ],
          },
        ],
        subject: [
          'They',
        ],
        verb: 'started',
        when: {
          groupType: 'date',
          minYear: 1924,
        },
      },
    ]]);
  });

  it('converts "ago" with "over"', () => {
    const words = 'They started the business over 100 years ago';

    const result = flow(splitText(words), { now: new Date('2024-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'business',
            ],
          },
        ],
        subject: [
          'They',
        ],
        verb: 'started',
        when: {
          groupType: 'date',
          maxYear: 1924,
        },
      },
    ]]);
  });

  it('handles "years ago" at the beginning', () => {
    const words = '200 years ago, the GDP was low';

    const result = flow(splitText(words), { now: new Date('2025-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'low',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'GDP',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          year: 1825,
        },
      },
    ]]);
  });

  it('converts "quite a long time ago"', () => {
    const words = 'An enormous asteroid hit the Moon quite a long time ago';

    const result = flow(splitText(words), { now: new Date('2020-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'Moon',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'an',
              'enormous',
              'asteroid',
            ],
          },
        ],
        verb: 'hit',
        when: {
          groupType: 'date',
          maxYear: 1820,
        },
      },
    ]]);
  });

  it('converts "a long time ago"', () => {
    const words = 'A massive asteroid hit the Moon a long time ago';

    const result = flow(splitText(words), { now: new Date('2020-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'Moon',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'a',
              'massive',
              'asteroid',
            ],
          },
        ],
        verb: 'hit',
        when: {
          groupType: 'date',
          maxYear: 1920,
        },
      },
    ]]);
  });

  it('converts "not a long time ago"', () => {
    const words = 'A little asteroid hit the Moon not a long time ago';

    const result = flow(splitText(words), { now: new Date('2020-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'Moon',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'a',
              'little',
              'asteroid',
            ],
          },
        ],
        verb: 'hit',
        when: {
          groupType: 'date',
          minYear: 1920,
        },
      },
    ]]);
  });

  it('converts "a long time ago" with passive', () => {
    const words = 'Indian literature was created a long time ago by amazing writers';

    const result = flow(splitText(words), { now: new Date('2026-07-01') });

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
              'amazing',
              'writers',
            ],
          },
        ],
        verb: 'create',
        when: {
          groupType: 'date',
          maxYear: 1926,
        },
      },
    ]]);
  });

  it('converts "as recently as"', () => {
    const words = 'They started the business as recently as 20 years ago';

    const result = flow(splitText(words), { now: new Date('2026-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'business',
            ],
          },
        ],
        subject: [
          'They',
        ],
        verb: 'started',
        when: {
          groupType: 'date',
          year: 2006,
        },
      },
    ]]);
  });

  it('converts "now"', () => {
    const words = 'It contains now essential information on several hundred issues';

    const result = flow(splitText(words), { now: new Date('2022-05-30') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'quantity',
                item: 'issues',
                max: 1000,
                min: 101,
              },
            ],
            subject: [
              {
                groupType: 'article',
                words: [
                  'essential',
                  'information',
                ],
              },
            ],
            verb: 'on',
          },
        ],
        subject: [
          'It',
        ],
        verb: 'contains',
        when: {
          day: 30,
          groupType: 'date',
          month: 5,
          year: 2022,
        },
      },
    ]]);
  });

  it('converts "some [...] years later"', () => {
    const words = 'It was designed in 1920 by Bob Brown. Some seventeen years later Texas started the production';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'it',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Bob',
              'Brown',
            ],
          },
        ],
        verb: 'design',
        when: {
          groupType: 'date',
          year: 1920,
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
              'production',
            ],
          },
        ],
        subject: [
          'Texas',
        ],
        verb: 'started',
        when: {
          groupType: 'date',
          year: 1937,
        },
      },
    ]]);
  });

  it('converts "years later"', () => {
    const words = 'The system was designed in 1920 by Bob Brown. Seven years later Texas started the production';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'system',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Bob',
              'Brown',
            ],
          },
        ],
        verb: 'design',
        when: {
          groupType: 'date',
          year: 1920,
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
              'production',
            ],
          },
        ],
        subject: [
          'Texas',
        ],
        verb: 'started',
        when: {
          groupType: 'date',
          year: 1927,
        },
      },
    ]]);
  });

  it('converts "years earlier" after a day', () => {
    // eslint-disable-next-line max-len
    const words = 'The event was arranged on 31 October 1970 in Paris, France. Five years earlier, it was in Barcelona, Spain';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'arranged',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'event',
            ],
          },
        ],
        verb: 'was',
        when: {
          day: 31,
          groupType: 'date',
          month: 10,
          year: 1970,
        },
        where: {
          general: 'France',
          groupType: 'locality',
          precise: 'Paris',
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
              'event',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          year: 1965,
        },
        where: {
          general: 'Spain',
          groupType: 'locality',
          precise: 'Barcelona',
        },
      },
    ]]);
  });

  it('converts "years earlier"', () => {
    const words = 'The system was refined in 1920 by Bob Brown. Seven years earlier Texas started the production';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'system',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Bob',
              'Brown',
            ],
          },
        ],
        verb: 'refine',
        when: {
          groupType: 'date',
          year: 1920,
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
              'production',
            ],
          },
        ],
        subject: [
          'Texas',
        ],
        verb: 'started',
        when: {
          groupType: 'date',
          year: 1913,
        },
      },
    ]]);
  });

  it('converts "years later" after a semicolon', () => {
    const words = 'The two systems were designed in 1920 by Bob Brown; five years later Texas started the production';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'systems',
            value: 2,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Bob',
              'Brown',
            ],
          },
        ],
        verb: 'design',
        when: {
          groupType: 'date',
          year: 1920,
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
              'production',
            ],
          },
        ],
        subject: [
          'Texas',
        ],
        verb: 'started',
        when: {
          groupType: 'date',
          year: 1925,
        },
      },
    ]]);
  });

  it('converts two semicolons', () => {
    const words = 'They were poor; five years later they worked efficiently; now they are rich';

    const result = flow(splitText(words), { now: new Date('2025-05-31') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'poor',
        ],
        subject: [
          'They',
        ],
        verb: 'were',
      },
    ],
    [
      {
        adverbs: [
          'efficiently',
        ],
        groupType: 'verb',
        object: [],
        subject: [
          {
            groupType: 'quantity',
            item: {
              groupType: 'article',
              words: [
                'years',
                'later',
              ],
            },
            value: 5,
          },
          'they',
        ],
        verb: 'worked',
      },
    ],
    [
      {
        groupType: 'verb',
        object: [
          'rich',
        ],
        subject: [
          {
            groupType: 'quantity',
            item: {
              groupType: 'article',
              words: [
                'years',
                'later',
              ],
            },
            value: 5,
          },
          'they',
        ],
        verb: 'are',
        when: {
          day: 31,
          groupType: 'date',
          month: 5,
          year: 2025,
        },
      },
    ]]);
  });

  it.skip('converts "years later" after a phrase in the middle', () => {
    const words = 'He joined the Third Crusade in 1190, and settled in Jerusalem. Nine years later, he married Anna';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
    ]]);
  });

  it('converts "years later" after "but"', () => {
    const words = 'A new factory was completed in 1950 but closed some 30 years later';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'completed',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'a',
              'new',
              'factory',
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
        object: [],
        subject: [
          {
            groupType: 'article',
            words: [
              'a',
              'new',
              'factory',
            ],
          },
        ],
        verb: 'closed',
        when: {
          groupType: 'date',
          year: 1980,
        },
      },
    ]]);
  });

  it('converts "at the same time" with a comma', () => {
    const words = 'The system was designed in 1920 by Bob Brown. At the same time, Texas started the production';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'system',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Bob',
              'Brown',
            ],
          },
        ],
        verb: 'design',
        when: {
          groupType: 'date',
          year: 1920,
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
              'production',
            ],
          },
        ],
        subject: [
          'Texas',
        ],
        verb: 'started',
        when: {
          groupType: 'date',
          year: 1920,
        },
      },
    ]]);
  });

  it('converts "at the same time" without a comma', () => {
    const words = 'The competition started in 1975; at the same time Diana Davis was sleeping';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'competition',
            ],
          },
        ],
        verb: 'started',
        when: {
          groupType: 'date',
          year: 1975,
        },
      },
    ],
    [
      {
        groupType: 'verb',
        object: [
          'sleeping',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Diana',
              'Davis',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          year: 1975,
        },
      },
    ]]);
  });

  it('converts "at the same time" with a decade', () => {
    const words = 'Life expectancy declined in the 1920s. At the same time, poverty was rising';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [],
        subject: [
          {
            groupType: 'article',
            words: [
              'Life',
              'expectancy',
            ],
          },
        ],
        verb: 'declined',
        when: {
          groupType: 'date',
          maxYear: 1929,
          minYear: 1920,
        },
      },
    ],
    [
      {
        groupType: 'verb',
        object: [
          'rising',
        ],
        subject: [
          'poverty',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: 1929,
          minYear: 1920,
        },
      },
    ]]);
  });

  it('converts "at the same time" with a day', () => {
    const words = 'Their wedding was on 31 March 1920. At the same time, there was a volcano eruption';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [],
        subject: [
          {
            groupType: 'article',
            words: [
              'Their',
              'wedding',
            ],
          },
        ],
        verb: 'was',
        when: {
          day: 31,
          groupType: 'date',
          month: 3,
          year: 1920,
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
              'volcano',
              'eruption',
            ],
          },
        ],
        subject: [
          'there',
        ],
        verb: 'was',
        when: {
          day: 31,
          groupType: 'date',
          month: 3,
          year: 1920,
        },
      },
    ]]);
  });

  it('converts "that year" after month+year', () => {
    const words = 'In March 2010, Indonesian people were voting. Also that year, they experienced a tsunami';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'voting',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Indonesian',
              'people',
            ],
          },
        ],
        verb: 'were',
        when: {
          groupType: 'date',
          month: 3,
          year: 2010,
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
              'tsunami',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Indonesian',
              'people',
            ],
          },
        ],
        verb: 'experienced',
        when: {
          groupType: 'date',
          year: 2010,
        },
      },
    ]]);
  });

  it('converts "that year" after a year only, with a comma', () => {
    const words = 'In 2003, Bob became a doctor. Also that year, Bob run a marathon';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([
      [
        {
          groupType: 'verb',
          object: [
            {
              groupType: 'article',
              words: [
                'a',
                'doctor',
              ],
            },
          ],
          subject: [
            'Bob',
          ],
          verb: 'became',
          when: {
            groupType: 'date',
            year: 2003,
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
                'marathon',
              ],
            },
          ],
          subject: [
            'Bob',
          ],
          verb: 'run',
          when: {
            groupType: 'date',
            year: 2003,
          },
        },
      ],
    ]);
  });

  it('converts "that year" after a year only, without a comma', () => {
    const words = 'In 2013, Bob became a doctor. Also that year Bob run a marathon';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([
      [
        {
          groupType: 'verb',
          object: [
            {
              groupType: 'article',
              words: [
                'a',
                'doctor',
              ],
            },
          ],
          subject: [
            'Bob',
          ],
          verb: 'became',
          when: {
            groupType: 'date',
            year: 2013,
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
                'marathon',
              ],
            },
          ],
          subject: [
            'Bob',
          ],
          verb: 'run',
          when: {
            groupType: 'date',
            year: 2013,
          },
        },
      ],
    ]);
  });

  it('converts "that year" after a semicolon', () => {
    const words = 'In 2019, Bob was frequently walking; that year he lost 10 kilograms';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([
      [
        {
          adverbs: [
            'frequently',
          ],
          groupType: 'verb',
          object: [
            'walking',
          ],
          subject: [
            'Bob',
          ],
          verb: 'was',
          when: {
            groupType: 'date',
            year: 2019,
          },
        },
      ],
      [
        {
          groupType: 'verb',
          object: [
            {
              groupType: 'unit',
              unit: 'kg',
              value: 10,
            },
          ],
          subject: [
            'Bob',
          ],
          verb: 'lost',
          when: {
            groupType: 'date',
            year: 2019,
          },
        },
      ],
    ]);
  });

  it('converts "later that year", with month+year', () => {
    const words = 'In March 2005, he graduated; later that year he started a job';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([
      [
        {
          groupType: 'verb',
          object: [],
          subject: [
            'he',
          ],
          verb: 'graduated',
          when: {
            groupType: 'date',
            month: 3,
            year: 2005,
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
                'job',
              ],
            },
          ],
          subject: [
            'he',
          ],
          verb: 'started',
          when: {
            groupType: 'date',
            minMonth: 3,
            year: 2005,
          },
        },
      ],
    ]);
  });

  it('converts "later that year", with a day', () => {
    const words = 'On 31 March 2006, he graduated; later that year he started a job';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([
      [
        {
          groupType: 'verb',
          object: [],
          subject: [
            'he',
          ],
          verb: 'graduated',
          when: {
            day: 31,
            groupType: 'date',
            month: 3,
            year: 2006,
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
                'job',
              ],
            },
          ],
          subject: [
            'he',
          ],
          verb: 'started',
          when: {
            groupType: 'date',
            minDay: 31,
            minMonth: 3,
            year: 2006,
          },
        },
      ],
    ]);
  });

  it('converts "later that year" at the end', () => {
    const words = 'In May 2003, he graduated; he started a job later that year';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([
      [
        {
          groupType: 'verb',
          object: [],
          subject: [
            'he',
          ],
          verb: 'graduated',
          when: {
            groupType: 'date',
            month: 5,
            year: 2003,
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
                'job',
              ],
            },
          ],
          subject: [
            'he',
          ],
          verb: 'started',
          when: {
            groupType: 'date',
            minMonth: 5,
            year: 2003,
          },
        },
      ],
    ]);
  });

  it('converts a simple locality before a date', () => {
    const words = 'Homosexuality has been legal in Kurdistan since 1858';

    const result = flow(splitText(words), { now: new Date('2025-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'legal',
        ],
        subject: [
          'Homosexuality',
        ],
        verb: 'is',
        when: {
          groupType: 'date',
          maxYear: 2025,
          minYear: 1858,
        },
        where: 'Kurdistan',
      },
    ]]);
  });

  it('converts "had been"', () => {
    // eslint-disable-next-line max-len
    const words = 'Thousands of opponents of the regime had been deported by the dictator in the late 1930s and the early 1940s';

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
                  'regime',
                ],
              },
            ],
            subject: [
              {
                groupType: 'quantity',
                item: 'opponents',
                min: 1000,
              },
            ],
            verb: 'of',
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'dictator',
            ],
          },
        ],
        verb: 'deport',
        when: {
          groupType: 'date',
          maxYear: 1944,
          minYear: 1935,
        },
      },
    ]]);
  });

  it('converts "did not" for a verb ending with "e"', () => {
    const words = 'The Koreans did not compose own music in the 16th century';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        isNegated: true,
        object: [
          {
            groupType: 'article',
            words: [
              'own',
              'music',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Koreans',
            ],
          },
        ],
        verb: 'composed',
        when: {
          groupType: 'date',
          maxYear: 1600,
          minYear: 1501,
        },
      },
    ]]);
  });

  it('converts "did not" for a verb not ending with "e"', () => {
    const words = 'The Koreans did not play own music in the 16th & 17th centuries';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        isNegated: true,
        object: [
          {
            groupType: 'article',
            words: [
              'own',
              'music',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Koreans',
            ],
          },
        ],
        verb: 'played',
        when: {
          groupType: 'date',
          maxYear: 1700,
          minYear: 1501,
        },
      },
    ]]);
  });

  it('converts "did not" with an irregular verb', () => {
    const words = 'The Koreans did not write own music in the late 16th century';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        isNegated: true,
        object: [
          {
            groupType: 'article',
            words: [
              'own',
              'music',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Koreans',
            ],
          },
        ],
        verb: 'wrote',
        when: {
          groupType: 'date',
          maxYear: 1600,
          minYear: 1551,
        },
      },
    ]]);
  });

  it('converts "themselves, however [...] until"', () => {
    const words = 'The Egyptians themselves, however, did not choose their parliament until 1924';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        isNegated: true,
        object: [
          {
            groupType: 'article',
            words: [
              'their',
              'parliament',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Egyptians',
            ],
          },
        ],
        verb: 'chose',
        when: {
          groupType: 'date',
          maxYear: 1924,
        },
      },
    ]]);
  });

  it('converts "herself [...] until", without a comma', () => {
    const words = 'A Tunisian woman herself did not choose her parliament until 1959';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        isNegated: true,
        object: [
          {
            groupType: 'article',
            words: [
              'her',
              'parliament',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'a',
              'Tunisian',
              'woman',
            ],
          },
        ],
        verb: 'chose',
        when: {
          groupType: 'date',
          maxYear: 1959,
        },
      },
    ]]);
  });

  it('converts "itself" with passive', () => {
    const words = 'A cat is observed by itself';

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
          'itself',
        ],
        verb: 'observe',
      },
    ]]);
  });

  it('converts "starting from"', () => {
    const words = 'Starting from the late 2000s, the Chinese economy has been large';

    const result = flow(splitText(words), { now: new Date('2026-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'large',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Chinese',
              'economy',
            ],
          },
        ],
        verb: 'is',
        when: {
          groupType: 'date',
          maxYear: 2026,
          minYear: 2005,
        },
      },
    ]]);
  });

  it('converts "starting around"', () => {
    const words = 'Starting around 2000, he has been collecting old paintings';

    const result = flow(splitText(words), { now: new Date('2026-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'collecting',
              'old',
              'paintings',
            ],
          },
        ],
        subject: [
          'he',
        ],
        verb: 'is',
        when: {
          groupType: 'date',
          isExact: false,
          maxYear: 2026,
          minYear: 2000,
        },
      },
    ]]);
  });

  it('converts "since [...] century"', () => {
    const words = 'The population has been large since the late 18th century';

    const result = flow(splitText(words), { now: new Date('2026-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'large',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'population',
            ],
          },
        ],
        verb: 'is',
        when: {
          groupType: 'date',
          maxYear: 2026,
          minYear: 1751,
        },
      },
    ]]);
  });

  it('converts "on average"', () => {
    // eslint-disable-next-line max-len
    const words = 'In the 2010s, on average, the tourist population slightly exceeded the number of permanent residents in Barcelona';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'typically',
          'slightly',
        ],
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'article',
                words: [
                  'permanent',
                  'residents',
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
              'the',
              'tourist',
              'population',
            ],
          },
        ],
        verb: 'exceeded',
        when: {
          groupType: 'date',
          maxYear: 2019,
          minYear: 2010,
        },
        where: 'Barcelona',
      },
    ]]);
  });

  it('converts "and are"', () => {
    const words = 'The Great Pyramids were built quite a long time ago and are wonderful now';

    const result = flow(splitText(words), { now: new Date('2026-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'built',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Great',
              'Pyramids',
            ],
          },
        ],
        verb: 'were',
        when: {
          groupType: 'date',
          maxYear: 1826,
        },
      },
    ],
    [
      {
        groupType: 'verb',
        object: [
          'wonderful',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Great',
              'Pyramids',
            ],
          },
        ],
        verb: 'are',
        when: {
          day: 1,
          groupType: 'date',
          month: 7,
          year: 2026,
        },
      },
    ]]);
  });

  it('converts "which are"', () => {
    const words = 'In the 3rd millennium BC, Egyptian slaves built The Great Pyramids which are higher than 300 ft';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'Great',
              'Pyramids',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Egyptian',
              'slaves',
            ],
          },
        ],
        verb: 'built',
        when: {
          groupType: 'date',
          maxYear: -2001,
          minYear: -3000,
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
                groupType: 'unit',
                unit: 'm',
                value: 91.44,
              },
            ],
            subject: [
              'higher',
            ],
            verb: 'than',
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Great',
              'Pyramids',
            ],
          },
        ],
        verb: 'are',
      },
    ]]);
  });

  it('converts "and nobody"', () => {
    const words = 'The Great Pyramids have been wonderful since the 3rd millennium BCE and nobody disputes today';

    const result = flow(splitText(words), { now: new Date('2026-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'wonderful',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Great',
              'Pyramids',
            ],
          },
        ],
        verb: 'are',
        when: {
          groupType: 'date',
          maxYear: 2026,
          minYear: -3000,
        },
      },
    ],
    [
      {
        groupType: 'verb',
        object: [],
        subject: [
          'nobody',
        ],
        verb: 'disputes',
        when: {
          day: 1,
          groupType: 'date',
          month: 7,
          year: 2026,
        },
      },
    ]]);
  });

  it('converts a plural single word subject, "a majority" & "but" with no comma', () => {
    const words = 'Negros are a majority of inhabitants in Africa but received a limited power in the 20th century';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'share',
            item: 'inhabitants',
            min: 0.5,
          },
        ],
        subject: [
          'Negros',
        ],
        verb: 'are',
        where: 'Africa',
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
              'limited',
              'power',
            ],
          },
        ],
        subject: [
          'Negros',
        ],
        verb: 'received',
        when: {
          groupType: 'date',
          maxYear: 2000,
          minYear: 1901,
        },
      },
    ]]);
  });

  it('converts "and" followed by a past irregular verb', () => {
    const words = 'Koreans visited Spain in 2000 and built several car factories in Valencia';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([
      [
        {
          groupType: 'verb',
          object: [
            'Spain',
          ],
          subject: [
            'Koreans',
          ],
          verb: 'visited',
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
              groupType: 'quantity',
              item: {
                groupType: 'article',
                words: [
                  'car',
                  'factories',
                ],
              },
              max: 99,
              min: 3,
            },
          ],
          subject: [
            'Koreans',
          ],
          verb: 'built',
          where: 'Valencia',
        },
      ],
    ]);
  });

  it('converts a past irregular verb with no article', () => {
    const words = 'Nepal took 3rd place in 2000';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'third',
              'place',
            ],
          },
        ],
        subject: [
          'Nepal',
        ],
        verb: 'took',
        when: {
          groupType: 'date',
          year: 2000,
        },
      },
    ]]);
  });

  it('converts a date, one-word uppercase subject, past irregular verb & one-word object', () => {
    const words = 'In 1860s, Russia sold Alaska';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'Alaska',
        ],
        subject: [
          'Russia',
        ],
        verb: 'sold',
        when: {
          groupType: 'date',
          maxYear: 1869,
          minYear: 1860,
        },
      },
    ]]);
  });

  it('converts "and", a past iregular verb and "years later"', () => {
    const words = 'In 1950, the business was registered, and became a public company seven years later';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([
      [
        {
          groupType: 'verb',
          object: [
            'registered',
          ],
          subject: [
            {
              groupType: 'article',
              words: [
                'the',
                'business',
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
              groupType: 'article',
              words: [
                'a',
                'public',
                'company',
              ],
            },
          ],
          subject: [
            {
              groupType: 'article',
              words: [
                'the',
                'business',
              ],
            },
          ],
          verb: 'became',
          when: {
            groupType: 'date',
            year: 1957,
          },
        },
      ],
    ]);
  });

  it('finds an adverb after a quantity', () => {
    const words = 'Many street dogs were heavily hungry in Texas in the 1950s';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'heavily',
        ],
        groupType: 'verb',
        object: [
          'hungry',
        ],
        subject: [
          {
            groupType: 'quantity',
            item: {
              groupType: 'article',
              words: [
                'street',
                'dogs',
              ],
            },
            min: 3,
          },
        ],
        verb: 'were',
        when: {
          groupType: 'date',
          maxYear: 1959,
          minYear: 1950,
        },
        where: 'Texas',
      },
    ]]);
  });

  it('splits AND with an irregular past verb followed by an object with no article', () => {
    const words = 'In 2010, the president was elected, and made federal appointments 3 years later';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
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
              'president',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          year: 2010,
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
              'federal',
              'appointments',
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
        verb: 'made',
        when: {
          groupType: 'date',
          year: 2013,
        },
      },
    ]]);
  });

  it('converts "has often been"', () => {
    const words = 'The politics has often been discussed by the community since the late 20th century';

    const result = flow(splitText(words), { now: new Date('2026-07-01') });

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'frequently',
        ],
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'politics',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'community',
            ],
          },
        ],
        verb: 'discuss',
        when: {
          groupType: 'date',
          maxYear: 2026,
          minYear: 1951,
        },
      },
    ]]);
  });

  it('converts "mid- [...] century"', () => {
    const words = 'In the mid-19th century, the fashion was an important matter in France';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'an',
              'important',
              'matter',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'fashion',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: 1875,
          minYear: 1826,
        },
        where: 'France',
      },
    ]]);
  });

  it('converts "early-to-mid"', () => {
    // eslint-disable-next-line max-len
    const words = 'In the early-to-mid 19th century, the fashion was an important matter in France but in the early to mid 1880s it was not too important';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([
      [
        {
          groupType: 'verb',
          object: [
            {
              groupType: 'article',
              words: [
                'an',
                'important',
                'matter',
              ],
            },
          ],
          subject: [
            {
              groupType: 'article',
              words: [
                'the',
                'fashion',
              ],
            },
          ],
          verb: 'was',
          when: {
            groupType: 'date',
            maxYear: 1875,
            minYear: 1801,
          },
          where: 'France',
        },
      ],
      [
        {
          groupType: 'verb',
          isNegated: true,
          object: [
            'important',
          ],
          subject: [
            {
              groupType: 'article',
              words: [
                'the',
                'fashion',
              ],
            },
          ],
          verb: 'was',
          when: {
            groupType: 'date',
            maxYear: 1887,
            minYear: 1880,
          },
        },
      ],
    ]);
  });

  it('finds a locality for two uppercase words', () => {
    const words = 'In 2000, they met in Rhode Island';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [],
        subject: [
          'they',
        ],
        verb: 'met',
        when: {
          groupType: 'date',
          year: 2000,
        },
        where: {
          groupType: 'article',
          words: [
            'Rhode',
            'Island',
          ],
        },
      },
    ]]);
  });

  it('does not find a locality for mixed-case words', () => {
    const words = 'In 2010, she obtained a degree in European law';

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
                  'European',
                  'law',
                ],
              },
            ],
            subject: [
              {
                groupType: 'article',
                words: [
                  'a',
                  'degree',
                ],
              },
            ],
            verb: 'in',
          },
        ],
        subject: [
          'she',
        ],
        verb: 'obtained',
        when: {
          groupType: 'date',
          year: 2010,
        },
      },
    ]]);
  });

  it('converts passive with AND followed by a verb', () => {
    // eslint-disable-next-line max-len
    const words = 'In addition, at least 0.3 million Europeans were caught by pirates and sold as bondslaves in North Africa in the 16th and 17th centuries';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'Europeans',
            min: 3e5,
          },
        ],
        subject: [
          'pirates',
        ],
        verb: 'catch',
      },
    ],
    [
      {
        groupType: 'verb',
        object: [
          [
            {
              groupType: 'quantity',
              item: 'Europeans',
              min: 3e5,
            },
          ],
          'as',
          'bondslaves',
        ],
        subject: [
          'pirates',
        ],
        verb: 'sold',
        when: {
          groupType: 'date',
          maxYear: 1700,
          minYear: 1501,
        },
        where: {
          groupType: 'article',
          words: [
            'North',
            'Africa',
          ],
        },
      },
    ]]);
  });

  it('finds a locality at the begin', () => {
    // eslint-disable-next-line max-len
    const words = 'In West Africa, the decline of the Atlantic trade caused an economic crisis in the early 20th century';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'an',
              'economic',
              'crisis',
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
                  'Atlantic',
                  'trade',
                ],
              },
            ],
            subject: [
              {
                groupType: 'article',
                words: [
                  'the',
                  'decline',
                ],
              },
            ],
            verb: 'of',
          },
        ],
        verb: 'caused',
        when: {
          groupType: 'date',
          maxYear: 1950,
          minYear: 1901,
        },
        where: {
          groupType: 'article',
          words: [
            'West',
            'Africa',
          ],
        },
      },
    ]]);
  });

  it('converts "estimated to have been"', () => {
    const words = 'The nebula is estimated to have been formed some 11,000 years ago in Virgo';

    const result = flow(splitText(words), { now: new Date('2000-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'formed',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'nebula',
            ],
          },
        ],
        verb: 'is',
        when: {
          groupType: 'date',
          isExact: false,
          year: -9000,
        },
        where: 'Virgo',
      },
    ]]);
  });

  it('converts "known to have been" & "eventually resulting in"', () => {
    // eslint-disable-next-line max-len
    const words = 'The tower is known to have been used by many archers in the 14th century, eventually resulting in a successful defense';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'tower',
            ],
          },
        ],
        result: {
          groupType: 'article',
          words: [
            'a',
            'successful',
            'defense',
          ],
        },
        subject: [
          {
            groupType: 'quantity',
            item: 'archers',
            min: 3,
          },
        ],
        verb: 'use',
        when: {
          groupType: 'date',
          maxYear: 1400,
          minYear: 1301,
        },
      },
    ]]);
  });

  it('converts "over the last couple of decades"', () => {
    const words = 'Ugandan population has rapidly increased over the last couple of decades';

    const result = flow(splitText(words), { now: new Date('2026-07-01') });

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'rapidly',
        ],
        groupType: 'verb',
        object: [
          'increased',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Ugandan',
              'population',
            ],
          },
        ],
        verb: 'has',
        when: {
          groupType: 'date',
          maxYear: 2026,
          minYear: 1996,
        },
      },
    ]]);
  });

  it('converts "over the last [...] years"', () => {
    const words = 'Irish population has slowly increased over the last twenty years';

    const result = flow(splitText(words), { now: new Date('2026-07-01') });

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'slowly',
        ],
        groupType: 'verb',
        object: [
          'increased',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Irish',
              'population',
            ],
          },
        ],
        verb: 'has',
        when: {
          groupType: 'date',
          maxYear: 2026,
          minYear: 2006,
        },
      },
    ]]);
  });

  it('converts "due to"', () => {
    const words = 'The office was closed in May 2018, due to a natural disaster';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        cause: {
          groupType: 'article',
          words: [
            'a',
            'natural',
            'disaster',
          ],
        },
        groupType: 'verb',
        object: [
          'closed',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'office',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          month: 5,
          year: 2018,
        },
      },
    ]]);
  });

  it('converts a quantity with AND of adjectives & a place with "the"', () => {
    // eslint-disable-next-line max-len
    const words = 'Many rare and endangered fish species have been living in the Indian Ocean over the last several millennia';

    const result = flow(splitText(words), { now: new Date('2000-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'living',
        ],
        subject: [
          {
            groupType: 'quantity',
            item: {
              groupType: 'and',
              members: [
                'rare',
                {
                  groupType: 'article',
                  words: [
                    'endangered',
                    'fish',
                    'species',
                  ],
                },
              ],
            },
            min: 3,
          },
        ],
        verb: 'are',
        when: {
          groupType: 'date',
          maxYear: 2000,
          minYear: -1000,
        },
        where: {
          groupType: 'article',
          words: [
            'the',
            'Indian',
            'Ocean',
          ],
        },
      },
    ]]);
  });

  it('converts a quantity with examples', () => {
    const words = 'In the early 1940s, Africa had only four sovereign states: Egypt, Liberia, Ethiopia & South Africa';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: {
              example: {
                groupType: 'and',
                members: [
                  'Egypt',
                  'Liberia',
                  'Ethiopia',
                  {
                    groupType: 'article',
                    words: [
                      'South',
                      'Africa',
                    ],
                  },
                ],
              },
              general: {
                groupType: 'article',
                words: [
                  'sovereign',
                  'states',
                ],
              },
              groupType: 'example',
            },
            value: 4,
          },
        ],
        subject: [
          'Africa',
        ],
        verb: 'had',
        when: {
          groupType: 'date',
          maxYear: 1944,
          minYear: 1940,
        },
      },
    ]]);
  });

  it('converts "mid to late"', () => {
    // eslint-disable-next-line max-len
    const words = 'The payment system was designed in the mid to late 20th century in the city of London but was applied in the mid-to-late 2000s';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'designed',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'payment',
              'system',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: 2000,
          minYear: 1926,
        },
        where: 'London',
      },
    ],
    [
      {
        groupType: 'verb',
        object: [
          'applied',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'payment',
              'system',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: 2009,
          minYear: 2003,
        },
      },
    ]]);
  });

  it('converts "early [...] century BCE"', () => {
    const words = 'In the early 1st century BCE, Egypt was rich';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'rich',
        ],
        subject: [
          'Egypt',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: -51,
          minYear: -100,
        },
      },
    ]]);
  });

  it('converts "late [...] millennium BCE"', () => {
    const words = 'Egypt was rich in the late 3rd millennium B.C.E.';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'rich',
        ],
        subject: [
          'Egypt',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: -2001,
          minYear: -2500,
        },
      },
    ]]);
  });

  it('converts "early [...] millennium BCE"', () => {
    const words = 'Egypt was rich in the early 2nd millennium BCE';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'rich',
        ],
        subject: [
          'Egypt',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: -1501,
          minYear: -2000,
        },
      },
    ]]);
  });

  it('converts "10th-6th centuries BCE"', () => {
    const words = 'In the 10th-6th centuries BCE, Egypt was rich';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'rich',
        ],
        subject: [
          'Egypt',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: -501,
          minYear: -1000,
        },
      },
    ]]);
  });

  it('converts "estimated at", "when", "in reality", "so many"', () => {
    // eslint-disable-next-line max-len
    const words = 'The Grande Armée was estimated at around 400,000 men in the 1800s when in reality, they conquered so many states';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([
      [
        {
          groupType: 'verb',
          object: [
            {
              groupType: 'quantity',
              isExact: false,
              item: 'men',
              value: 4e5,
            },
          ],
          subject: [
            {
              groupType: 'article',
              words: [
                'the',
                'Grande',
                'Armée',
              ],
            },
          ],
          verb: 'was',
          when: {
            groupType: 'date',
            maxYear: 1809,
            minYear: 1800,
          },
        },
      ],
      [
        {
          groupType: 'verb',
          object: [
            {
              groupType: 'quantity',
              item: 'states',
              min: 3,
            },
          ],
          subject: [
            {
              groupType: 'article',
              words: [
                'the',
                'Grande',
                'Armée',
              ],
            },
          ],
          verb: 'conquered',
          when: {
            groupType: 'date',
            maxYear: 1809,
            minYear: 1800,
          },
        },
      ],
    ]);
  });

  it('converts "mid-[...] century BC" & "when at the same time"', () => {
    // eslint-disable-next-line max-len
    const words = 'The Roman army was invading many lands in the mid-2nd century BC when at the same time they were defending their capital';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'invading',
          {
            groupType: 'quantity',
            item: 'lands',
            min: 3,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Roman',
              'army',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: -126,
          minYear: -175,
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
              'defending',
              'their',
              'capital',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Roman',
              'army',
            ],
          },
        ],
        verb: 'were',
        when: {
          groupType: 'date',
          maxYear: -126,
          minYear: -175,
        },
      },
    ]]);
  });

  it('converts "early to mid [...] BC" && "mid to late [...] BC"', () => {
    // eslint-disable-next-line max-len
    const words = 'The Roman Republic was relatively small in the mid to late 2nd century BC but it was large in the early to mid 1st century BC';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([
      [
        {
          adverbs: [
            'relatively',
          ],
          groupType: 'verb',
          object: [
            'small',
          ],
          subject: [
            {
              groupType: 'article',
              words: [
                'the',
                'Roman',
                'Republic',
              ],
            },
          ],
          verb: 'was',
          when: {
            groupType: 'date',
            maxYear: -101,
            minYear: -175,
          },
        },
      ],
      [
        {
          groupType: 'verb',
          object: [
            'large',
          ],
          subject: [
            {
              groupType: 'article',
              words: [
                'the',
                'Roman',
                'Republic',
              ],
            },
          ],
          verb: 'was',
          when: {
            groupType: 'date',
            maxYear: -26,
            minYear: -100,
          },
        },
      ],
    ]);
  });

  it('converts "strictly speaking", "by the early", "in fact"', () => {
    // eslint-disable-next-line max-len
    const words = 'Strictly speaking, by the early 18th century, France was, in fact, a major colonial power in America';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'a',
              'major',
              'colonial',
              'power',
            ],
          },
        ],
        subject: [
          'France',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: 1750,
        },
        where: 'America',
      },
    ]]);
  });

  it('converts a year with BCE', () => {
    const words = 'In 321 BCE, the Roman Senate passed the law about the peasants';

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
                  'peasants',
                ],
              },
            ],
            subject: [
              {
                groupType: 'article',
                words: [
                  'the',
                  'law',
                ],
              },
            ],
            verb: 'about',
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Roman',
              'Senate',
            ],
          },
        ],
        verb: 'passed',
        when: {
          groupType: 'date',
          year: -321,
        },
      },
    ]]);
  });

  it('converts "much of" & "and then the next year"', () => {
    // eslint-disable-next-line max-len
    const words = 'Much of the theatre in Syracuse was devastated by a fire in 355 BC, and then the next year the damage was fixed by Greeks';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([
      [
        {
          groupType: 'verb',
          object: [
            {
              groupType: 'share',
              item: {
                groupType: 'article',
                words: [
                  'the',
                  'theatre',
                ],
              },
              min: 0.2,
            },
          ],
          subject: [
            {
              groupType: 'article',
              words: [
                'a',
                'fire',
              ],
            },
          ],
          verb: 'devastate',
          when: {
            groupType: 'date',
            year: -355,
          },
          where: 'Syracuse',
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
                'damage',
              ],
            },
          ],
          subject: [
            'Greeks',
          ],
          verb: 'fix',
          when: {
            groupType: 'date',
            year: -354,
          },
        },
      ],
    ]);
  });

  it('converts month with year BCE', () => {
    const words = 'The kings met in May 209 BCE in Alexandria';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'kings',
            ],
          },
        ],
        verb: 'met',
        when: {
          groupType: 'date',
          month: 5,
          year: -209,
        },
        where: 'Alexandria',
      },
    ]]);
  });

  it('converts "a third", "a quarter of a million", "AD"', () => {
    // eslint-disable-next-line max-len
    const words = 'A third of the army with their best ally have conquered as much as a quarter of a million square kilometers by 95 AD';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'conquered',
          {
            groupType: 'unit',
            unit: 'm2',
            value: 25e10,
          },
        ],
        subject: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'article',
                words: [
                  'their',
                  'best',
                  'ally',
                ],
              },
            ],
            subject: [
              {
                groupType: 'share',
                item: {
                  groupType: 'article',
                  words: [
                    'the',
                    'army',
                  ],
                },
                value: 0.3333333333333333,
              },
            ],
            verb: 'with',
          },
        ],
        verb: 'have',
        when: {
          groupType: 'date',
          maxYear: 95,
        },
      },
    ]]);
  });

  it('converts "a few" & "date back"', () => {
    const words = 'A few churches in Spain date back to the early 4th century CE';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [],
        subject: [
          {
            groupType: 'quantity',
            item: 'churches',
            max: 99,
            min: 3,
          },
        ],
        verb: 'started',
        when: {
          groupType: 'date',
          maxYear: 350,
          minYear: 301,
        },
        where: 'Spain',
      },
    ]]);
  });

  it('finds a subject after a simple locality and converts ", when"', () => {
    // eslint-disable-next-line max-len
    const words = 'In Europe, Germany declared a war in 1914, when Austria-Hungary also declared a war';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([
      [
        {
          groupType: 'verb',
          object: [
            {
              groupType: 'article',
              words: [
                'a',
                'war',
              ],
            },
          ],
          subject: [
            'Germany',
          ],
          verb: 'declared',
          when: {
            groupType: 'date',
            year: 1914,
          },
          where: 'Europe',
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
                'war',
              ],
            },
          ],
          subject: [
            'Austria-Hungary',
          ],
          verb: 'declared',
          when: {
            groupType: 'date',
            year: 1914,
          },
        },
      ],
    ]);
  });

  it('finds a subject with AND after a simple locality', () => {
    // eslint-disable-next-line max-len
    const words = 'In Europe, the Soviet Union, Germany and Italy were becoming more threatening in the early 20th century';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'becoming',
              'more',
              'threatening',
            ],
          },
        ],
        subject: [
          {
            groupType: 'and',
            members: [
              {
                groupType: 'article',
                words: [
                  'the',
                  'Soviet',
                  'Union',
                ],
              },
              'Germany',
              'Italy',
            ],
          },
        ],
        verb: 'were',
        when: {
          groupType: 'date',
          maxYear: 1950,
          minYear: 1901,
        },
        where: 'Europe',
      },
    ]]);
  });

  it('converts day, month with no year, verb with no object', () => {
    const words = 'On 31 May, the leaders met';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'leaders',
            ],
          },
        ],
        verb: 'met',
        when: {
          day: 31,
          groupType: 'date',
          month: 5,
        },
      },
    ]]);
  });

  it('converts verb with no object, ", and" & a verb', () => {
    const words = 'On 31 May, the leaders met, and made a decent agreement';

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
                'leaders',
              ],
            },
          ],
          verb: 'met',
          when: {
            day: 31,
            groupType: 'date',
            month: 5,
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
                'decent',
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
          verb: 'made',
        },
      ],
    ]);
  });

  it('converts AND subject with a past regular verb', () => {
    const words = 'In 1930, nationalists and communists started a war in East Asia';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'a',
              'war',
            ],
          },
        ],
        subject: [
          {
            groupType: 'and',
            members: [
              'nationalists',
              'communists',
            ],
          },
        ],
        verb: 'started',
        when: {
          groupType: 'date',
          year: 1930,
        },
        where: {
          groupType: 'article',
          words: [
            'East',
            'Asia',
          ],
        },
      },
    ]]);
  });

  it('converts locality, AND subject with a past regular verb, and a date', () => {
    const words = 'In Asia, nationalists and communists started a war in the 1930s';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'a',
              'war',
            ],
          },
        ],
        subject: [
          {
            groupType: 'and',
            members: [
              'nationalists',
              'communists',
            ],
          },
        ],
        verb: 'started',
        when: {
          groupType: 'date',
          maxYear: 1939,
          minYear: 1930,
        },
        where: 'Asia',
      },
    ]]);
  });

  it('does not convert "between [...] and" with no numbers', () => {
    const words = 'In July 1870, a conflict started between Prussia & the French Empire';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'between',
          {
            groupType: 'and',
            members: [
              'Prussia',
              {
                groupType: 'article',
                words: [
                  'the',
                  'French',
                  'Empire',
                ],
              },
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'a',
              'conflict',
            ],
          },
        ],
        verb: 'started',
        when: {
          groupType: 'date',
          month: 7,
          year: 1870,
        },
      },
    ]]);
  });

  it('converts "southern" & "northern" from lowercase', () => {
    // eslint-disable-next-line max-len
    const words = 'Many Turkish immigrants were living in southern Germany in 2010 but they settled in northern Germany the next year';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'living',
        ],
        subject: [
          {
            groupType: 'quantity',
            item: {
              groupType: 'article',
              words: [
                'Turkish',
                'immigrants',
              ],
            },
            min: 3,
          },
        ],
        verb: 'were',
        when: {
          groupType: 'date',
          year: 2010,
        },
        where: {
          groupType: 'article',
          words: [
            'Southern',
            'Germany',
          ],
        },
      },
    ],
    [
      {
        groupType: 'verb',
        object: [],
        subject: [
          {
            groupType: 'quantity',
            item: {
              groupType: 'article',
              words: [
                'Turkish',
                'immigrants',
              ],
            },
            min: 3,
          },
        ],
        verb: 'settled',
        when: {
          groupType: 'date',
          year: 2011,
        },
        where: {
          groupType: 'article',
          words: [
            'Northern',
            'Germany',
          ],
        },
      },
    ],
    ]);
  });

  it('converts "two-thirds" & "a quarter"', () => {
    const words = 'The United States produced two-thirds of all munitions and a quarter of all gas in the 1940s';

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
                    'all',
                    'munitions',
                  ],
                },
                value: 0.6666666666666666,
              },
              {
                groupType: 'share',
                item: {
                  groupType: 'article',
                  words: [
                    'all',
                    'gas',
                  ],
                },
                value: 0.25,
              },
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'United',
              'States',
            ],
          },
        ],
        verb: 'produced',
        when: {
          groupType: 'date',
          maxYear: 1949,
          minYear: 1940,
        },
      },
    ]]);
  });

  it('converts "commonly known as" & "on the night of"', () => {
    // eslint-disable-next-line max-len
    const words = 'The German Democratic Republic (commonly known as East Germany) was created by Soviets on the night of 6–7 October 1949';

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
                  'East',
                  'Germany',
                ],
              },
            ],
            groupType: 'article',
            words: [
              'the',
              'German',
              'Democratic',
              'Republic',
            ],
          },
        ],
        subject: [
          'Soviets',
        ],
        verb: 'create',
        when: {
          groupType: 'date',
          maxDay: 7,
          minDay: 6,
          month: 10,
          year: 1949,
        },
      },
    ]]);
  });

  it('converts "by the start of" with a century', () => {
    const words = 'By the start of the 12th century, the castle in Edinburgh was built';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'built',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'castle',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: 1101,
        },
        where: 'Edinburgh',
      },
    ]]);
  });

  it('converts "by the start of" with a year', () => {
    const words = 'The company had been created by great funders by the start of 2010';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'company',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'great',
              'funders',
            ],
          },
        ],
        verb: 'create',
        when: {
          groupType: 'date',
          maxYear: 2010,
        },
      },
    ]]);
  });

  it('converts "by the start of" with a month followed by AND', () => {
    const words = 'By the start of May 1904, UK and France signed the Entente Cordiale';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'Entente',
              'Cordiale',
            ],
          },
        ],
        subject: [
          {
            groupType: 'and',
            members: [
              'UK',
              'France',
            ],
          },
        ],
        verb: 'signed',
        when: {
          groupType: 'date',
          maxMonth: 5,
          maxYear: 1904,
        },
      },
    ]]);
  });

  it('converts "commencing on" at the end', () => {
    const words = 'She did her service in the South Atlantic commencing on 1920';

    const result = flow(splitText(words), { now: new Date('2026-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'her',
              'service',
            ],
          },
        ],
        subject: [
          'She',
        ],
        verb: 'did',
        when: {
          groupType: 'date',
          maxYear: 2026,
          minYear: 1920,
        },
        where: {
          groupType: 'article',
          words: [
            'the',
            'South',
            'Atlantic',
          ],
        },
      },
    ]]);
  });

  it('converts "early" & "late" with a year', () => {
    const words = 'Nationalist forces launched an offensive in late 1930, and then they stopped in early 1931';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'an',
              'offensive',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Nationalist',
              'forces',
            ],
          },
        ],
        verb: 'launched',
        when: {
          groupType: 'date',
          maxMonth: 12,
          minMonth: 7,
          year: 1930,
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
              'Nationalist',
              'forces',
            ],
          },
        ],
        verb: 'stopped',
        when: {
          groupType: 'date',
          maxMonth: 6,
          minMonth: 1,
          year: 1931,
        },
      },
    ]]);
  });

  it('converts dates with "approximately" in any order', () => {
    // eslint-disable-next-line max-len
    const words = 'Lithuania was first settled approximately in 13000 BC but Latvia was first settled in approximately 12000 BC';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'first',
          'settled',
        ],
        subject: [
          'Lithuania',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          isExact: false,
          year: -13000,
        },
      },
    ],
    [
      {
        groupType: 'verb',
        object: [
          'first',
          'settled',
        ],
        subject: [
          'Latvia',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          isExact: false,
          year: -12000,
        },
      },
    ]]);
  });

  it('converts "over the course of many centuries"', () => {
    const words = 'The pyramids in Egypt were built over the course of many centuries';

    const result = flow(splitText(words), { now: new Date('2026-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'built',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'pyramids',
            ],
          },
        ],
        verb: 'were',
        when: {
          groupType: 'date',
          maxYear: 1726,
        },
        where: 'Egypt',
      },
    ]]);
  });

  it('finds a date with "around", and no preposition before', () => {
    const words = 'The Romans won quickly around 123 BC';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'quickly',
        ],
        groupType: 'verb',
        object: [],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Romans',
            ],
          },
        ],
        verb: 'won',
        when: {
          groupType: 'date',
          isExact: false,
          year: -123,
        },
      },
    ]]);
  });

  it('finds an object, a date with "around" but no preposition', () => {
    const words = 'The Romans won a battle around 123 BC';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'a',
              'battle',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Romans',
            ],
          },
        ],
        verb: 'won',
        when: {
          groupType: 'date',
          isExact: false,
          year: -123,
        },
      },
    ]]);
  });

  it('does not break for "and from"', () => {
    const words = 'The state appeared and from 1870';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'article',
        words: [
          'the',
          'state',
        ],
      },
      {
        groupType: 'and',
        members: [
          'appeared',
          {
            groupType: 'article',
          },
        ],
      },
      {
        currentPlace: 'from',
        from: {
          groupType: 'quantity',
          value: 1870,
        },
        groupType: 'change',
      },
    ]]);
  });

  it('skips "Mya" in a bracket', () => {
    const words = 'Liaoceratops lived some 125 million years ago (Mya)';

    const result = flow(splitText(words), { now: new Date('2000-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [],
        subject: [
          'Liaoceratops',
        ],
        verb: 'lived',
        when: {
          groupType: 'date',
          isExact: false,
          year: -124998000,
        },
      },
    ]]);
  });

  it('converts "more recently" & "appears to have been"', () => {
    const words = 'More recently, the museum in Boston appears to have been renewed nicely';

    const result = flow(splitText(words), { now: new Date('2026-07-01') });

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'nicely',
        ],
        groupType: 'verb',
        object: [
          'renewed',
        ],
        probability: 0.5,
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'museum',
            ],
          },
        ],
        verb: 'is',
        when: {
          groupType: 'date',
          maxYear: 2026,
          minYear: 2021,
        },
        where: 'Boston',
      },
    ]]);
  });

  it('converts AND with uppercase, no prepositions', () => {
    const words = 'They met Adam & Bob';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'and',
            members: [
              'Adam',
              'Bob',
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

  it('converts "c."', () => {
    const words = 'The new settlers built a town c. 7000 BC in India';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'a',
              'town',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'new',
              'settlers',
            ],
          },
        ],
        verb: 'built',
        when: {
          groupType: 'date',
          isExact: false,
          year: -7000,
        },
        where: 'India',
      },
    ]]);
  });

  it('converts "B.C.E." followed by a locality', () => {
    const words = 'Persians built a town around 700 B.C.E. in Pakistan';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'a',
              'town',
            ],
          },
        ],
        subject: [
          'Persians',
        ],
        verb: 'built',
        when: {
          groupType: 'date',
          isExact: false,
          year: -700,
        },
        where: 'Pakistan',
      },
    ]]);
  });

  it('converts "even as early as"', () => {
    const words = 'Even as early as the 1960s West Germany was the 3rd-largest economy';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            adjective: 'largest',
            groupType: 'ordinal',
            item: [
              'economy',
            ],
            ordinal: 3,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'West',
              'Germany',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: 1969,
          minYear: 1960,
        },
      },
    ]]);
  });

  it('converts "early in the [...] century"', () => {
    const words = 'Early in the 19th century, the street was the home of many Polish immigrants';

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
                item: {
                  groupType: 'article',
                  words: [
                    'Polish',
                    'immigrants',
                  ],
                },
                min: 3,
              },
            ],
            subject: [
              {
                groupType: 'article',
                words: [
                  'the',
                  'home',
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
              'the',
              'street',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: 1850,
          minYear: 1801,
        },
      },
    ]]);
  });

  it('converts "over the years"', () => {
    const words = 'Several Māori movements have been created in Auckland over the years';

    const result = flow(splitText(words), { now: new Date('2026-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'created',
        ],
        subject: [
          {
            groupType: 'quantity',
            item: {
              groupType: 'article',
              words: [
                'Māori',
                'movements',
              ],
            },
            max: 99,
            min: 3,
          },
        ],
        verb: 'are',
        when: {
          groupType: 'date',
          maxYear: 2023,
        },
        where: 'Auckland',
      },
    ]]);
  });

  it('converts "as high as" & "as low as"', () => {
    // eslint-disable-next-line max-len
    const words = 'In 1920, the number of Koreans in New Zealand was as high as 50,000 but 50 years later it was as low as 10,000';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            value: 5e4,
          },
        ],
        subject: [
          {
            groupType: 'preposition',
            object: [
              'Koreans',
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
        verb: 'was',
        when: {
          groupType: 'date',
          year: 1920,
        },
        where: {
          groupType: 'article',
          words: [
            'New',
            'Zealand',
          ],
        },
      },
    ],
    [
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            value: 1e4,
          },
        ],
        subject: [
          {
            groupType: 'preposition',
            object: [
              'Koreans',
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
        verb: 'was',
        when: {
          groupType: 'date',
          year: 1970,
        },
      },
    ]]);
  });

  it('converts "until about" with a decade', () => {
    const words = 'Until about the 1970s below 100 people climbed the mountain';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'mountain',
            ],
          },
        ],
        subject: [
          {
            groupType: 'quantity',
            item: 'people',
            max: 100,
          },
        ],
        verb: 'climbed',
        when: {
          groupType: 'date',
          maxYear: 1979,
        },
      },
    ]]);
  });

  it('converts "until about" with a year', () => {
    const words = 'Until about 1970 below 100 people climbed the mountain';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'mountain',
            ],
          },
        ],
        subject: [
          {
            groupType: 'quantity',
            item: 'people',
            max: 100,
          },
        ],
        verb: 'climbed',
        when: {
          groupType: 'date',
          isExact: false,
          maxYear: 1970,
        },
      },
    ]]);
  });
});
