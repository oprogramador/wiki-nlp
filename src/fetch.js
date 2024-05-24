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
  const realWordsPhrases = words.filter(phrase => /[A-Z]/.test(phrase[0] && phrase[0].charAt(0)));
  const groups = realWordsPhrases.map(phrase => groupVerbs(
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
