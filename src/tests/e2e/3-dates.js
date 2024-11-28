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

  it('converts subject+adverb+verb+object + preposition (with AND) + decade', () => {
    const words = 'Pakistan strongly supported decolonisation in Africa and Oceania in the 1950s';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: ['strongly'],
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
        when: {
          groupType: 'date',
          maxYear: 1959,
          minYear: 1950,
        },
      },
    ]]);
  });

  it.skip('converts decade + subject+adverb+verb+object + preposition (with AND)', () => {
    const words = 'In the 1950s, Pakistan strongly supported decolonisation in Africa and Oceania';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: ['strongly'],
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
        when: {
          groupType: 'date',
          maxYear: 1959,
          minYear: 1950,
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
        object: [
          'in',
          'Egypt',
        ],
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

  it.skip('converts "in the [...]–[...] centuries" with passive, in the middle', () => {
    const words = 'The village was owned in the 16th–18th centuries by the Williams';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
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
              'been',
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
        verb: 'have',
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

  it.skip('converts "a long time ago" with passive', () => {
    const words = 'Indian literature was created a long time ago by amazing writers';

    const result = flow(splitText(words), { now: new Date('2026-07-01') });

    expect(result).to.deep.equal([[
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
});
