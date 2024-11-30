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
});
