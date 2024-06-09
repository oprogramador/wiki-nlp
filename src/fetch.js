const wiki = require('wikijs').default;
const flow = require('./flow');
const splitText = require('./splitText');

(async () => {
  const data = await wiki().page('European Union');
  const text = await data.rawContent();
  const words = splitText(text);
  const groups = flow(words);
  console.log(JSON.stringify(groups));
})();
