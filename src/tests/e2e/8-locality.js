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
});
