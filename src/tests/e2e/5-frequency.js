const flow = require('../../flow');
const splitText = require('../../splitText');
const expect = require('../expect');

describe('frequency (e2e)', () => {
  it('converts "every" after an adverb', () => {
    const words = 'The election is performed regularly every 5 years';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'regularly',
        ],
        frequency: {
          groupType: 'quantity',
          item: 'years',
          value: 5,
        },
        groupType: 'verb',
        object: [
          'performed',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'election',
            ],
          },
        ],
        verb: 'is',
      },
    ]]);
  });

  it('converts "every" with no adverb', () => {
    const words = 'The leaders have been meeting every 3 weeks';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        frequency: {
          groupType: 'quantity',
          item: 'weeks',
          value: 3,
        },
        groupType: 'verb',
        object: [
          'meeting',
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
        verb: 'are',
      },
    ]]);
  });

  it('converts "every other"', () => {
    const words = 'The leaders will meet every other month';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        frequency: {
          groupType: 'quantity',
          item: 'months',
          value: 2,
        },
        groupType: 'verb',
        object: [
          'meet',
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
        verb: 'will',
      },
    ]]);
  });

  it('converts "in every [...] in [...] century"', () => {
    const words = 'Indiana participated in every federal election in the late 19th century';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        frequency: {
          groupType: 'article',
          words: [
            'federal',
            'election',
          ],
        },
        groupType: 'verb',
        object: [],
        subject: [
          'Indiana',
        ],
        verb: 'participated',
        when: {
          groupType: 'date',
          maxYear: 1900,
          minYear: 1851,
        },
      },
    ]]);
  });

  it('converts "every once in a while"', () => {
    const words = 'The museum in Belfast is open to the public every once in a while';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'occasionally',
        ],
        groupType: 'verb',
        object: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'article',
                words: [
                  'the',
                  'public',
                ],
              },
            ],
            subject: [
              'open',
            ],
            verb: 'to',
          },
        ],
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
        where: 'Belfast',
      },
    ]]);
  });

  it('converts an abbreviation with dots', () => {
    const words = 'The U.S. ambassador is appointed by the president every 2 years';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        frequency: {
          groupType: 'quantity',
          item: 'years',
          value: 2,
        },
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'U.S.',
              'ambassador',
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
        verb: 'appoint',
      },
    ]]);
  });

  it('converts "annually" & "triannually"', () => {
    const words = 'The presidents will meet annually but the secretaries will meet triannually';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        frequency: {
          groupType: 'quantity',
          item: 'years',
          value: 1,
        },
        groupType: 'verb',
        object: [
          'meet',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'presidents',
            ],
          },
        ],
        verb: 'will',
      },
    ],
    [
      {
        frequency: {
          groupType: 'quantity',
          item: 'months',
          value: 4,
        },
        groupType: 'verb',
        object: [
          'meet',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'secretaries',
            ],
          },
        ],
        verb: 'will',
      },
    ]]);
  });

  it('converts "often, but not always"', () => {
    const words = 'Banknotes are often, but not always, used by Mexicans';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'usually',
        ],
        groupType: 'verb',
        object: [
          'banknotes',
        ],
        subject: [
          'Mexicans',
        ],
        verb: 'use',
      },
    ]]);
  });

  it.skip('converts "every" at the beginning', () => {
    const words = 'Every 4 years, they will meet';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
    ]]);
  });

  it('converts "annually" with no auxiliary verb', () => {
    const words = 'In Australia, free-ranging cats catch hundreds of millions of birds annually';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        frequency: {
          groupType: 'quantity',
          item: 'years',
          value: 1,
        },
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'birds',
            min: 1e8,
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'free-ranging',
              'cats',
            ],
          },
        ],
        verb: 'catch',
        where: 'Australia',
      },
    ]]);
  });
});
