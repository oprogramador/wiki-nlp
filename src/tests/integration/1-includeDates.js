const _ = require('lodash');
const convertPunctuation = require('../../convertPunctuation');
const convertNumbers = require('../../convertNumbers');
const groupArticles = require('../../groupArticles');
const groupNumbers = require('../../groupNumbers');
const groupVerbs = require('../../groupVerbs');
const includeDates = require('../../includeDates');
const splitText = require('../../splitText');
const expect = require('../expect');

describe.skip('convertPunctuation & convertNumbers & groupArticles & groupVerbs & includeDates', () => {
  it('converts with year at the beginning', () => {
    const text = 'In 2001, Kofi Annan was awarded the Nobel Peace Prize.';
    const words = splitText(text);

    const result = words.map(phrase => _.flow(
      convertPunctuation,
      groupNumbers,
      convertNumbers,
      groupArticles,
      groupVerbs,
      includeDates,
    )(phrase));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'awarded',
          {
            groupType: 'article',
            words: [
              'the',
              'Nobel',
              'Peace',
              'Prize',
            ],
          },
        ],
        subject: [
          ',',
          {
            groupType: 'article',
            words: [
              'Kofi',
              'Annan',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          year: 2001,
        },
      },
    ]]);
  });

  it('converts with year at the end', () => {
    const text = 'The treaty was signed in 1958.';
    const words = splitText(text);

    const result = words.map(phrase => _.flow(
      convertPunctuation,
      convertNumbers,
      groupArticles,
      groupVerbs,
      includeDates,
    )(phrase));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'signed',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'The',
              'treaty',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          year: 1958,
        },
      },
    ]]);
  });

  it('converts with year at the end, with an extra word', () => {
    const text = 'The treaty was quickly signed in 1958.';
    const words = splitText(text);

    const result = words.map(phrase => _.flow(
      convertPunctuation,
      convertNumbers,
      groupArticles,
      groupVerbs,
      includeDates,
    )(phrase));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'quickly',
          'signed',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'The',
              'treaty',
            ],
          },
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          year: 1958,
        },
      },
    ]]);
  });

  it('converts without a year', () => {
    const text = 'The treaty was signed.';
    const words = splitText(text);

    const result = words.map(phrase => _.flow(
      convertPunctuation,
      convertNumbers,
      groupArticles,
      groupVerbs,
      includeDates,
    )(phrase));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'signed',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'The',
              'treaty',
            ],
          },
        ],
        verb: 'was',
      },
    ]]);
  });
});
