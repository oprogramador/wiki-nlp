const request = require('superagent');
const { convert } = require('html-to-text');

const url = 'https://en.wikipedia.org/wiki/European_Union';

(async () => {
  const data = await request(url);
  const text = convert(data.text);
  const phrases = text.split('.');
  const words = phrases.map(phrase => phrase.split(' '));
  console.log(JSON.stringify(words));
})();
