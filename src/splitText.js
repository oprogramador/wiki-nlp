const splitText = (text) => {
  const phrases = text
    .split('\n')
    .map(line => line.replace(/\.$/, '. ').split('. '))
    .flat()
    .filter(phrase => phrase.length)
    .filter(phrase => !phrase.startsWith('=='));

  const words = phrases.map(phrase => phrase.split(/\s/).filter(word => word));

  return words;
};

module.exports = splitText;
