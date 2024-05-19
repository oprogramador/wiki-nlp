const _ = require('lodash');
const fs = require('fs');
const request = require('superagent');
const { convert } = require('html-to-text');

const url = 'https://en.wikipedia.org/wiki/European_Union';

const articles = [
  'a',
  'an',
  'the',
];

const prepositions = fs
  .readFileSync(`${__dirname}/resources/prepositions.txt`)
  .toString()
  .split('\n')
  .filter(x => x);

const toLowerCase = (item) => {
  if (!item || !item.toLowerCase) {
    return item;
  }

  return item.toLowerCase();
};

const groupArticles = phrase => phrase.reduce(
  (accumulator, current) => (articles.includes(toLowerCase(_.last(accumulator)))
    ? [...accumulator.slice(0, -1), [_.last(accumulator), current]]
    : [...accumulator, current]),
  [],
);

const groupPrepositions = phrase => phrase.reduce(
  (accumulator, current) => (prepositions.includes(toLowerCase(current))
    ? [accumulator, current, []]
    : [...accumulator.slice(0, -1), [...(_.last(accumulator) || []), current]]),
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
