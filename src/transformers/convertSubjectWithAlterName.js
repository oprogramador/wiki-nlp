const convertSubjectWithAlterName = (phrase) => {
  if (!phrase[0]) {
    return phrase;
  }
  const { subject } = phrase[0];
  if (!subject) {
    return phrase;
  }
  if (
    subject.length >= 3
      && subject.length <= 4
      && subject[1] === ','
  ) {
    return [{
      ...phrase[0],
      subject: [
        {
          ...subject[0],
          alternativeNames: [
            subject[2],
          ],
        },
      ],
    }];
  }

  return phrase;
};

module.exports = convertSubjectWithAlterName;
