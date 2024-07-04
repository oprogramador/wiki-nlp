const includeDates = require('../../includeDates');
const expect = require('../expect');

describe('includeDates', () => {
  it('includes a year from the beginning', () => {
    const phrase = [{
      object: ['big'],
      subject: [
        'In',
        {
          groupType: 'quantity',
          value: 2020,
        },
        ',',
        {
          groupType: 'article',
          words: ['the', 'EU'],
        },
      ],
      verb: 'was',
    }];

    const result = includeDates(phrase);

    expect(result).to.deep.equal([
      {
        object: [
          'big',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'EU',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          year: 2020,
        },
      },
    ]);
  });
});
