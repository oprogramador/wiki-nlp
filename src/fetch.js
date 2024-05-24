const wiki = require('wikijs').default;
const groupPrepositions = require('./groupPrepositions');
const groupArticles = require('./groupArticles');
const groupVerbs = require('./groupVerbs');
const removeMeaningless = require('./removeMeaningless');

(async () => {
  const data = await wiki().page('European Union');
  const text = await data.rawContent();
  const phrases = text.split('.');
  const words = phrases.map(phrase => phrase.split(/\s/).filter(word => word));
  const groups = words.map(phrase => groupVerbs(
    groupPrepositions(
      groupArticles(
        removeMeaningless(
          phrase,
        ),
      ),
    ),
  ));
  console.log(JSON.stringify(groups));
})();
