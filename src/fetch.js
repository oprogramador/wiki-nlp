const request = require('superagent');
const { convert } = require('html-to-text');
const groupPrepositions = require('./groupPrepositions');
const groupArticles = require('./groupArticles');

const url = 'https://en.wikipedia.org/wiki/European_Union';

(async () => {
  const data = await request(url);
  const text = convert(data.text);
  const phrases = text.split('.');
  const words = phrases.map(phrase => phrase.split(/\s/).filter(word => word));
  const realWordsPhrases = words.filter(phrase => /[A-Z]/.test(phrase[0] && phrase[0].charAt(0)));
  const groups = realWordsPhrases.map(phrase => groupPrepositions(groupArticles(phrase)));
  console.log(JSON.stringify(groups));
})();
