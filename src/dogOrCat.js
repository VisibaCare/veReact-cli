function dogOrCat() {
  // randomize true or false.
  const random = !!Math.floor(Math.random() * 2);

  // true is apparently a cat, is this good?
  if (random) {
    return '🐱';
  }

  // why is the dog not yellow? Who knows. (maybe it is for you)
  return '🐶';
}

module.exports = dogOrCat;