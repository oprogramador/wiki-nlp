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

  it.skip('converts with euro and about', () => {
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

  it.skip('converts with euro and above', () => {
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

  it.skip('converts with euro, about, and billion', () => {
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

  it.skip('converts with euro, about, and bn', () => {
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

  it.skip('converts with euro, and bn', () => {
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

  it.skip('converts with euro, above, and trillion', () => {
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

  it.skip('converts with an adjective', () => {
    const words = 'Alan has about 10 red apples';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            isExact: false,
            item: {
              groupType: 'article',
              words: [
                'red',
                'apples',
              ],
            },
            value: 10,
          },
        ],
        subject: [
          'Alan',
        ],
        verb: 'has',
      },
    ]]);
  });
});
