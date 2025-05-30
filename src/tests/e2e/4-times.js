const flow = require('../../flow');
const splitText = require('../../splitText');
const expect = require('../expect');

describe('times (e2e)', () => {
  it('converts "once"', () => {
    const words = 'Their constitution was amended once';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'amended',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Their',
              'constitution',
            ],
          },
        ],
        times: {
          groupType: 'quantity',
          value: 1,
        },
        verb: 'was',
      },
    ]]);
  });

  it('converts "twice"', () => {
    const words = 'Their constitution was amended twice';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'amended',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Their',
              'constitution',
            ],
          },
        ],
        times: {
          groupType: 'quantity',
          value: 2,
        },
        verb: 'was',
      },
    ]]);
  });

  it('converts "twice a year"', () => {
    const words = 'The meeting is held twice a year in Paris';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        frequency: {
          groupType: 'quantity',
          item: 'months',
          value: 6,
        },
        groupType: 'verb',
        object: [
          'held',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'meeting',
            ],
          },
        ],
        verb: 'is',
        where: 'Paris',
      },
    ]]);
  });

  it('converts "thrice"', () => {
    const words = 'Their constitution was amended thrice';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'amended',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Their',
              'constitution',
            ],
          },
        ],
        times: {
          groupType: 'quantity',
          value: 3,
        },
        verb: 'was',
      },
    ]]);
  });

  it('converts "times" after a number', () => {
    const words = 'Their constitution was amended 4 times';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'amended',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Their',
              'constitution',
            ],
          },
        ],
        times: {
          groupType: 'quantity',
          value: 4,
        },
        verb: 'was',
      },
    ]]);
  });

  it('converts "many times"', () => {
    const words = 'Their constitution was amended many times';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'amended',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Their',
              'constitution',
            ],
          },
        ],
        times: {
          groupType: 'quantity',
          min: 3,
        },
        verb: 'was',
      },
    ]]);
  });

  it('converts "about [...] times"', () => {
    const words = 'Their constitution was amended about 20 times';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'amended',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Their',
              'constitution',
            ],
          },
        ],
        times: {
          groupType: 'quantity',
          isExact: false,
          value: 20,
        },
        verb: 'was',
      },
    ]]);
  });

  it('converts "at least [...] times"', () => {
    const words = 'Their constitution was amended at least twelve times';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'amended',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Their',
              'constitution',
            ],
          },
        ],
        times: {
          groupType: 'quantity',
          min: 12,
        },
        verb: 'was',
      },
    ]]);
  });

  it('converts "nearly [...] times"', () => {
    const words = 'Their constitution was amended nearly 40 times';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'amended',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Their',
              'constitution',
            ],
          },
        ],
        times: {
          groupType: 'quantity',
          max: 40,
        },
        verb: 'was',
      },
    ]]);
  });

  it('converts "times" after a range', () => {
    const words = 'Their constitution was amended 25–30 times';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'amended',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Their',
              'constitution',
            ],
          },
        ],
        times: {
          groupType: 'quantity',
          max: 30,
          min: 25,
        },
        verb: 'was',
      },
    ]]);
  });

  it('converts "dozens of times"', () => {
    const words = 'Their constitution was amended dozens of times';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'amended',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Their',
              'constitution',
            ],
          },
        ],
        times: {
          groupType: 'quantity',
          min: 10,
        },
        verb: 'was',
      },
    ]]);
  });

  it('converts "a total of [...] times"', () => {
    const words = 'The World Cup has been won by Brazil a total of five times';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'World',
              'Cup',
            ],
          },
        ],
        subject: [
          'Brazil',
        ],
        times: {
          groupType: 'quantity',
          value: 5,
        },
        verb: 'win',
      },
    ]]);
  });

  it('converts "as many times as possible"', () => {
    const words = 'Rabbits can jump as many times as possible in Australia';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'jump',
        ],
        subject: [
          'Rabbits',
        ],
        times: {
          groupType: 'quantity',
          min: 3,
        },
        verb: 'can',
        where: 'Australia',
      },
    ]]);
  });

  it('converts "several times a day"', () => {
    const words = 'The melody is played by an artist several times a day';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        frequency: {
          groupType: 'quantity',
          item: 'hours',
          max: 8,
          min: 2,
        },
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'melody',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'an',
              'artist',
            ],
          },
        ],
        verb: 'play',
      },
    ]]);
  });
});
