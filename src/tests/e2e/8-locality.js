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
});
