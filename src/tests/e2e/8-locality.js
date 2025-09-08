const flow = require('../../flow');
const splitText = require('../../splitText');
const expect = require('../expect');

describe('locality (e2e)', () => {
  it('converts "in the Kantō region of Honshū in Japan"', () => {
    const words = 'Edo & Tone are deep rivers in the Kantō region of Honshū in Japan';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'deep',
              'rivers',
            ],
          },
        ],
        subject: [
          {
            groupType: 'and',
            members: [
              'Edo',
              'Tone',
            ],
          },
        ],
        verb: 'are',
        where: 'Kantō',
      },
    ]]);
  });

  it('converts "is known to occur" & "in the northern part of"', () => {
    const words = 'Snow leopard is known to occur in the northern part of India, Nepal and Bhutan';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [],
        subject: [
          {
            groupType: 'article',
            words: [
              'Snow',
              'leopard',
            ],
          },
        ],
        verb: 'occurs',
        where: {
          groupType: 'and',
          members: [
            {
              groupType: 'article',
              words: [
                'Northern',
                'India',
              ],
            },
            'Nepal',
            'Bhutan',
          ],
        },
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

  it('converts a simple locality before a date', () => {
    const words = 'Homosexuality has been legal in Kurdistan beginning in 1858';

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

  it('converts "southern" & "northern" from lowercase', () => {
    // eslint-disable-next-line max-len
    const words = 'Many Turkish immigrants were living in southern Germany in 2010 but they settled in northern Germany the next year';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([
      [
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

  it('omits "countries such as"', () => {
    // eslint-disable-next-line max-len
    const words = 'Sericulture was an important cottage industry in countries such as Brazil, France, Japan, Korea, and Thailand in the 20th century';

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
              'cottage',
              'industry',
            ],
          },
        ],
        subject: [
          'Sericulture',
        ],
        verb: 'was',
        when: {
          groupType: 'date',
          maxYear: 2000,
          minYear: 1901,
        },
        where: {
          groupType: 'and',
          members: [
            'Brazil',
            'France',
            'Japan',
            'Korea',
            'Thailand',
          ],
        },
      },
    ]]);
  });

  it('converts "in the Ursa Major constellation"', () => {
    const words = 'In the 2010s, Indians discovered 20 new stars in the Ursa Major constellation';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: {
              groupType: 'article',
              words: [
                'new',
                'stars',
              ],
            },
            value: 20,
          },
        ],
        subject: [
          'Indians',
        ],
        verb: 'discovered',
        when: {
          groupType: 'date',
          maxYear: 2019,
          minYear: 2010,
        },
        where: {
          groupType: 'article',
          words: [
            'the',
            'Ursa',
            'Major',
            'Constellation',
          ],
        },
      },
    ]]);
  });

  it('converts "northwest"', () => {
    const words = 'They met twice in northwest Tanzania in 2010s';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [],
        subject: [
          'They',
        ],
        times: {
          groupType: 'quantity',
          value: 2,
        },
        verb: 'met',
        when: {
          groupType: 'date',
          maxYear: 2019,
          minYear: 2010,
        },
        where: {
          groupType: 'article',
          words: [
            'Northwest',
            'Tanzania',
          ],
        },
      },
    ]]);
  });

  it('converts "located in the south of the state of"', () => {
    const words = 'San Diego is an American municipality located in the south of the state of California';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'an',
              'American',
              'municipality',
            ],
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'San',
              'Diego',
            ],
          },
        ],
        verb: 'is',
        where: {
          groupType: 'article',
          words: [
            'the',
            'Southern',
            'California',
          ],
        },
      },
    ]]);
  });

  it('converts "in East Asian waters"', () => {
    const words = 'Most of the submarines are in East Asian waters as of 2020';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [],
        subject: [
          {
            groupType: 'share',
            item: {
              groupType: 'article',
              words: [
                'the',
                'submarines',
              ],
            },
            min: 0.5,
          },
        ],
        verb: 'are',
        when: {
          groupType: 'date',
          year: 2020,
        },
        where: {
          groupType: 'article',
          words: [
            'East',
            'Asian',
            'Waters',
          ],
        },
      },
    ]]);
  });

  it('converts a double locality"', () => {
    const words = 'The first railways proposals in Punjab were made in Multan in 1852';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'made',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'the',
              'first',
              'railways',
              'proposals',
            ],
          },
        ],
        verb: 'were',
        when: {
          groupType: 'date',
          year: 1852,
        },
        where: {
          general: 'Punjab',
          precise: 'Multan',
        },
      },
    ]]);
  });

  it('converts "In the United States each state" (without a comma)', () => {
    const words = 'In the United States each state is responsible for the education laws';

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
                  'education',
                  'laws',
                ],
              },
            ],
            subject: [
              'responsible',
            ],
            verb: 'for',
          },
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'each',
              'state',
            ],
          },
        ],
        verb: 'is',
        where: {
          groupType: 'article',
          words: [
            'the',
            'United',
            'States',
          ],
        },
      },
    ]]);
  });

  it('converts "on the Asian mainland" & "southern half of"', () => {
    // eslint-disable-next-line max-len
    const words = 'In the final year of World War II, Japanese forces were still present on the Asian mainland and southern half of Sakhalin Island';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'present',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'Japanese',
              'forces',
            ],
          },
        ],
        verb: 'were',
        when: {
          groupType: 'date',
          year: 1945,
        },
        where: {
          groupType: 'and',
          members: [
            {
              groupType: 'article',
              words: [
                'the',
                'Asian',
                'Mainland',
              ],
            },
            {
              groupType: 'article',
              words: [
                'Southern',
                'Sakhalin',
                'Island',
              ],
            },
          ],
        },
      },
    ]]);
  });

  it('converts "on the Japanese islands of"', () => {
    // eslint-disable-next-line max-len
    const words = 'As of 2020, feral cat colonies appear mostly on the Japanese islands of Kyushu, Okinawa, Amami & Tsushima';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'mostly',
        ],
        groupType: 'verb',
        object: [],
        subject: [
          {
            groupType: 'article',
            words: [
              'feral',
              'cat',
              'colonies',
            ],
          },
        ],
        verb: 'appear',
        when: {
          groupType: 'date',
          year: 2020,
        },
        where: {
          groupType: 'and',
          members: [
            'Kyushu',
            'Okinawa',
            'Amami',
            'Tsushima',
          ],
        },
      },
    ]]);
  });

  it('converts "in the Atlantic and Indian oceans"', () => {
    const words = 'These fish live in the Atlantic and Indian oceans as of 2000';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [],
        subject: [
          {
            groupType: 'article',
            words: [
              'These',
              'fish',
            ],
          },
        ],
        verb: 'live',
        when: {
          groupType: 'date',
          year: 2000,
        },
        where: {
          groupType: 'and',
          members: [
            {
              groupType: 'article',
              words: [
                'Atlantic',
                'Ocean',
              ],
            },
            {
              groupType: 'article',
              words: [
                'Indian',
                'Ocean',
              ],
            },
          ],
        },
      },
    ]]);
  });

  it('converts "it is known that" & "on the islands of"', () => {
    // eslint-disable-next-line max-len
    const words = 'It is known that there were hundreds of frog species on the islands of Java and Sumatra in the early 1990s';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: {
              groupType: 'article',
              words: [
                'frog',
                'species',
              ],
            },
            min: 100,
          },
        ],
        subject: [
          'there',
        ],
        verb: 'were',
        when: {
          groupType: 'date',
          maxYear: 1994,
          minYear: 1990,
        },
        where: {
          groupType: 'and',
          members: [
            'Java',
            'Sumatra',
          ],
        },
      },
    ]]);
  });

  it('converts "in Eurasia" & "on every continent except Antarctica"', () => {
    // eslint-disable-next-line max-len
    const words = 'By 2010, they have settled in Eurasia but by 2020, they have settled on every continent except Antarctica';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          'settled',
        ],
        subject: [
          'they',
        ],
        verb: 'have',
        when: {
          groupType: 'date',
          maxYear: 2010,
        },
        where: {
          groupType: 'and',
          members: [
            'Asia',
            'Europe',
          ],
        },
      },
    ],
    [
      {
        groupType: 'verb',
        object: [
          'settled',
        ],
        subject: [
          'they',
        ],
        verb: 'have',
        when: {
          groupType: 'date',
          maxYear: 2020,
        },
        where: {
          groupType: 'and',
          members: [
            'Africa',
            'America',
            'Asia',
            'Australia',
            'Europe',
          ],
        },
      },
    ]]);
  });

  it('converts "in the south of"', () => {
    // eslint-disable-next-line max-len
    const words = 'In the south of Mumbai, there are precious buildings which were constructed quickly in the late 19th century';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'precious',
              'buildings',
            ],
          },
        ],
        subject: [
          'there',
        ],
        verb: 'are',
        where: {
          groupType: 'article',
          words: [
            'Southern',
            'Mumbai',
          ],
        },
      },
    ],
    [
      {
        adverbs: [
          'quickly',
        ],
        groupType: 'verb',
        object: [
          'constructed',
        ],
        subject: [
          {
            groupType: 'article',
            words: [
              'precious',
              'buildings',
            ],
          },
        ],
        verb: 'were',
        when: {
          groupType: 'date',
          maxYear: 1900,
          minYear: 1851,
        },
      },
    ]]);
  });

  it('converts "has had" & "in mainland Southeast Asia"', () => {
    // eslint-disable-next-line max-len
    const words = 'Since the early 1st millennium AD, Buddhism has had many followers in mainland Southeast Asia and East Asia';

    const result = flow(splitText(words), { now: new Date('2020-07-01') });

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'quantity',
            item: 'followers',
            min: 3,
          },
        ],
        subject: [
          'Buddhism',
        ],
        verb: 'has',
        when: {
          groupType: 'date',
          maxYear: 2020,
          minYear: 1,
        },
        where: {
          groupType: 'and',
          members: [
            {
              groupType: 'article',
              words: [
                'Mainland',
                'Southeast',
                'Asia',
              ],
            },
            {
              groupType: 'article',
              words: [
                'East',
                'Asia',
              ],
            },
          ],
        },
      },
    ]]);
  });

  it('converts "monopoly" & "in the mainland United States"', () => {
    // eslint-disable-next-line max-len
    const words = 'By the early 1900s, many economy experts have noticed Standard Oil\'s monopoly in the mainland United States';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        groupType: 'verb',
        object: [
          {
            groupType: 'article',
            words: [
              'noticed',
              'Standard',
              'Oil\'s',
              'monopoly',
            ],
          },
        ],
        subject: [
          {
            groupType: 'quantity',
            item: {
              groupType: 'article',
              words: [
                'economy',
                'experts',
              ],
            },
            min: 3,
          },
        ],
        verb: 'have',
        when: {
          groupType: 'date',
          maxYear: 1904,
        },
        where: {
          groupType: 'article',
          words: [
            'the',
            'Mainland',
            'United',
            'States',
          ],
        },
      },
    ]]);
  });

  it('converts "in the United States of America"', () => {
    // eslint-disable-next-line max-len
    const words = 'The Snowshoe is a short-haired bicolour colourpoint variety of domestic cat which appeared in the United States of America in the 1960s';

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
                  'domestic',
                  'cat',
                ],
              },
            ],
            subject: [
              {
                groupType: 'article',
                words: [
                  'a',
                  'short-haired',
                  'bicolour',
                  'colourpoint',
                  'variety',
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
              'Snowshoe',
            ],
          },
        ],
        verb: 'is',
      },
    ],
    [
      {
        groupType: 'verb',
        object: [],
        subject: [
          {
            groupType: 'preposition',
            object: [
              {
                groupType: 'article',
                words: [
                  'domestic',
                  'cat',
                ],
              },
            ],
            subject: [
              {
                groupType: 'article',
                words: [
                  'a',
                  'short-haired',
                  'bicolour',
                  'colourpoint',
                  'variety',
                ],
              },
            ],
            verb: 'of',
          },
        ],
        verb: 'appeared',
        when: {
          groupType: 'date',
          maxYear: 1969,
          minYear: 1960,
        },
        where: {
          groupType: 'article',
          words: [
            'the',
            'United',
            'States',
          ],
        },
      },
    ]]);
  });

  it('converts "in modern-day"', () => {
    // eslint-disable-next-line max-len
    const words = 'Podaraki was frequently danced by peasants in modern-day Turkey as well as the northern Thrace during the 11th century';

    const result = flow(splitText(words));

    expect(result).to.deep.equal([[
      {
        adverbs: [
          'frequently',
        ],
        groupType: 'verb',
        object: [
          'podaraki',
        ],
        subject: [
          'peasants',
        ],
        verb: 'dance',
        when: {
          groupType: 'date',
          maxYear: 1100,
          minYear: 1001,
        },
        where: {
          groupType: 'and',
          members: [
            'Turkey',
            {
              groupType: 'article',
              words: [
                'the',
                'Northern',
                'Thrace',
              ],
            },
          ],
        },
      },
    ]]);
  });
});
