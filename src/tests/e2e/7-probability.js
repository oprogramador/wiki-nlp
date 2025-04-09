const flow = require('../../flow');
const splitText = require('../../splitText');
const expect = require('../expect');

describe('probability', () => {
  it('converts "It is speculated that"', () => {
    const words = 'It is speculated that by 4,000 BCE, sheep were domesticated in Africa';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'domesticated',
        ],
        probability: 0.5,
        subject: [
          'sheep',
        ],
        verb: 'were',
        when: {
          groupType: 'date',
          maxYear: -4000,
        },
        where: 'Africa',
      },
    ]]);
  });

  it('converts "It is speculated that" with an adverb', () => {
    const words = 'It is speculated that by 7,000 BCE, sheep were partially domesticated in Africa';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'partially',
        ],
        groupType: 'verb',
        object: [
          'domesticated',
        ],
        probability: 0.5,
        subject: [
          'sheep',
        ],
        verb: 'were',
        when: {
          groupType: 'date',
          maxYear: -7000,
        },
        where: 'Africa',
      },
    ]]);
  });

  it('converts "are thought to have"', () => {
    const words = 'The islands are thought to have been colonized by Greeks by the 7th century BC';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'islands',
            ],
          },
        ],
        probability: 0.5,
        subject: [
          'Greeks',
        ],
        verb: 'colonize',
        when: {
          groupType: 'date',
          maxYear: -601,
        },
      },
    ]]);
  });

  it('converts "perhaps"', () => {
    const words = 'Munich is perhaps the richest city in Germany as of 2010';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'richest',
              'city',
            ],
          },
        ],
        probability: 0.5,
        subject: [
          'Munich',
        ],
        verb: 'is',
        when: {
          groupType: 'date',
          year: 2010,
        },
        where: 'Germany',
      },
    ]]);
  });

  it('converts "is believed to be"', () => {
    const words = 'The Clovis is believed to be the first universal culture in the Americas';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'the',
              'first',
              'universal',
              'culture',
            ],
          },
        ],
        probability: 0.5,
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'Clovis',
            ],
          },
        ],
        verb: 'is',
        where: {
          groupType: 'article',
          words: [
            'the',
            'Americas',
          ],
        },
      },
    ]]);
  });
});
