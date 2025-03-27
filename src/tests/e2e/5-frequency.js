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
});
