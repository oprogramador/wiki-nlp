const convertObjectWithAlterName = (phrase) => {
  if (!phrase[0]) {
    return phrase;
  }
  const { object } = phrase[0];
  if (!object) {
    return phrase;
  }
  if (object.length === 3 && object[1] === ',') {
    return [{
      ...phrase[0],
      object: [
        {
          ...object[0],
          alternativeNames: [
            object[2],
          ],
        },
      ],
    }];
  }

  return phrase;
};

module.exports = convertObjectWithAlterName;
