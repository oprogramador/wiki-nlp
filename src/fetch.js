const _ = require('lodash');
const request = require('superagent');
const { convert } = require('html-to-text');
const groupPrepositions = require('./groupPrepositions');
const toLowerCase = require('./toLowerCase');

const url = 'https://en.wikipedia.org/wiki/European_Union';

const articles = [
  'a',
  'an',
  'the',
];

const groupArticles = phrase => phrase.reduce(
  (accumulator, current) => (articles.includes(toLowerCase(_.last(accumulator)))
    ? [...accumulator.slice(0, -1), [_.last(accumulator), current]]
    : [...accumulator, current]),
  [],
);

(async () => {
  const data = await request(url);
  const text = convert(data.text);
  const phrases = text.split('.');
  const words = phrases.map(phrase => phrase.split(/\s/).filter(word => word));
  const realWordsPhrases = words.filter(phrase => /[A-Z]/.test(phrase[0] && phrase[0].charAt(0)));
  const groups = realWordsPhrases.map(phrase => groupPrepositions(groupArticles(phrase)));
  console.log(JSON.stringify(groups));
})();
