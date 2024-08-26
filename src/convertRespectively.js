const convertRespectively = (phrase) => {
  const { object, subject, verb } = phrase[0];

  if (!(subject || []).includes('respectively')) {
    return phrase;
  }

  return [object[0].members.map((objectItem, i) => ({
    object: objectItem,
    subject: subject[0].members[i],
    verb,
  }))];
};

module.exports = convertRespectively;
